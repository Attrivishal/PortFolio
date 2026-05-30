# Production Checklist

Use this before calling the portfolio production-ready.

## Required GitHub Secrets

Backend deploy:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `ECR_REPOSITORY_NAME`
- `EC2_PUBLIC_IP`
- `EC2_SSH_KEY`
- `MONGODB_URI`
- `FRONTEND_URL`
- `ADMIN_API_KEY`

Optional email notifications:

- `EMAIL_USER`
- `EMAIL_PASS`
- `EMAIL_TO`

Frontend deploy:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `VITE_API_URL`

## Release Gates

Before deploy, GitHub Actions should pass:

- backend dependency install
- backend API smoke tests
- backend Docker build
- backend Trivy image scan
- frontend dependency install
- frontend production build

## Runtime Checks

- `GET /api/health` returns `200` only when MongoDB is connected.
- `GET /api/contact/messages` requires the `x-admin-api-key` header.
- Docker containers have health checks enabled.
- Nginx has basic security headers and an internal `/health` endpoint.

## Security Rules

- Never commit `.env`, `.tfstate`, `.tfvars`, or `.terraform/`.
- Rotate `ADMIN_API_KEY` if it is ever shared.
- Keep MongoDB Atlas network access restricted to known deployment sources when possible.
- Review npm audit output before every release.
