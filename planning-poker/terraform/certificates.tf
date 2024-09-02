resource "aws_acm_certificate" "cert" {
  domain_name       = local.fqdn
  provider          = aws.virginia
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "cert_backend" {
  domain_name       = "api.${local.fqdn}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}