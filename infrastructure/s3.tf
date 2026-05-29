# Generate random string for globally unique S3 bucket name
resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# S3 Bucket for Frontend static hosting
resource "aws_s3_bucket" "frontend" {
  bucket        = "${var.app_name}-frontend-${random_string.bucket_suffix.result}"
  force_destroy = true # Allows clean teardown on terraform destroy

  tags = {
    Name        = "${var.app_name}-frontend-bucket"
    Environment = var.environment
  }
}

# Block all public access at the S3 bucket level (Modern Best Practice)
resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# S3 Bucket Policy allowing ONLY CloudFront OAC to read files (associated in cloudfront.tf)
resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

# IAM Policy Document restricting read-access solely to the CloudFront distribution
data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.frontend.arn}/*"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}
