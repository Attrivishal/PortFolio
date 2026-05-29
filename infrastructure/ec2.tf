# Data source to dynamically fetch the latest stable Ubuntu 22.04 LTS AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical (Ubuntu)

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Key Pair for SSH access (looks up local SSH key to make provisioning automatic)
# Note: You can create a key pair locally using `ssh-keygen -t rsa -b 4096 -f ~/.ssh/portfolio-deploy-key`
resource "aws_key_pair" "deployer" {
  key_name   = var.key_name
  public_key = fileexists("~/.ssh/portfolio-deploy-key.pub") ? file("~/.ssh/portfolio-deploy-key.pub") : (fileexists("~/.ssh/id_rsa.pub") ? file("~/.ssh/id_rsa.pub") : file("~/.ssh/id_ed25519.pub"))
}

# EC2 Instance for the backend MERN container
resource "aws_instance" "backend" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = var.instance_type
  subnet_id            = aws_subnet.public_1.id
  key_name             = aws_key_pair.deployer.key_name
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name

  vpc_security_group_ids = [
    aws_security_group.backend.id
  ]

  # User Data Script: Automatic server provisioning on first launch
  user_data = <<-EOF
              #!/bin/bash
              # Update packages and system files
              apt-get update -y
              apt-get upgrade -y

              # Install Docker prerequisites
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg lsb-release

              # Add Docker official GPG Key
              mkdir -p /etc/apt/keyrings
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

              # Setup stable repository
              echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

              # Install Docker Engine
              apt-get update -y
              apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

              # Enable and start Docker daemon
              systemctl start docker
              systemctl enable docker

              # Add ubuntu user to docker group to run docker commands without sudo
              usermod -aG docker ubuntu

              # Install the standalone docker-compose command
              curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose

              # Create directories for app deployments and monitoring log files
              mkdir -p /home/ubuntu/portfolio/backend
              mkdir -p /home/ubuntu/portfolio/monitoring
              chown -R ubuntu:ubuntu /home/ubuntu/portfolio
              EOF

  tags = {
    Name        = "${var.app_name}-backend"
    Environment = var.environment
  }
}

# Attach EC2 target to Load Balancer target group
resource "aws_lb_target_group_attachment" "backend" {
  target_group_arn = aws_lb_target_group.backend_tg.arn
  target_id        = aws_instance.backend.id
  port             = 5001
}
