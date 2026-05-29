output "ec2_public_ip" {
  description = "The public IP address of the backend EC2 server"
  value       = aws_instance.backend.public_ip
}

output "alb_dns_name" {
  description = "The public DNS endpoint of the Application Load Balancer"
  value       = aws_lb.backend_alb.dns_name
}

output "cloudfront_domain_name" {
  description = "The secure global URL of the frontend CloudFront distribution"
  value       = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
}

output "s3_bucket_name" {
  description = "The name of the private S3 bucket hosting your static React files"
  value       = aws_s3_bucket.frontend.id
}
