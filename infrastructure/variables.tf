variable "aws_region" {
  description = "AWS region to deploy resources in"
  type        = string
  default     = "us-east-1" # Defaults to US East (N. Virginia)
}

variable "app_name" {
  description = "Name of the application"
  type        = string
  default     = "portfolio-production"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "instance_type" {
  description = "EC2 instance size"
  type        = string
  default     = "t2.micro" # AWS Free Tier eligible
}

variable "key_name" {
  description = "Name of the SSH key pair to attach to EC2"
  type        = string
  default     = "portfolio-deploy-key"
}
