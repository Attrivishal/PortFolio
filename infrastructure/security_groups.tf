# Security Group for Application Load Balancer (ALB)
resource "aws_security_group" "alb" {
  name        = "${var.app_name}-alb-sg"
  description = "Controls access to the Application Load Balancer"
  vpc_id      = aws_vpc.main.id

  # Inbound HTTP
  ingress {
    description = "Allow HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Inbound HTTPS

  ingress {
    description = "Allow HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound to backend EC2 instances
  egress {
    description     = "Allow outbound to backend instances"
    from_port       = 5001
    to_port         = 5001
    protocol        = "tcp"
    security_groups = [] # Will be associated below to prevent circular dependency
  }

  tags = {
    Name        = "${var.app_name}-alb-sg"
    Environment = var.environment
  }
}

# Security Group for Backend EC2 Instance
resource "aws_security_group" "backend" {
  name        = "${var.app_name}-backend-sg"
  description = "Controls access to the backend EC2 server"
  vpc_id      = aws_vpc.main.id

  # SSH for management
  ingress {
    description = "SSH from anywhere for deployment (restricting in production is recommended)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Traffic from ALB only
  ingress {
    description     = "Allow backend API traffic only from the ALB"
    from_port       = 5001
    to_port         = 5001
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  # Allow all outbound traffic (essential for downloading packages, pushing logs, connecting to database)
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.app_name}-backend-sg"
    Environment = var.environment
  }
}

# Complete outbound rules for ALB to communicate with the backend
resource "aws_security_group_rule" "alb_egress_to_backend" {
  type                     = "egress"
  from_port                = 5001
  to_port                  = 5001
  protocol                 = "tcp"
  security_group_id        = aws_security_group.alb.id
  source_security_group_id = aws_security_group.backend.id
}
