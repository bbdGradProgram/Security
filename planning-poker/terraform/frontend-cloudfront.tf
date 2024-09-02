variable "default_403_object" {
  description = "The default object to return when the given path is not found. Returning 'index.html' with status 200 allows the React router to intercept the path in an SPA."
  type        = string
  default     = "index.html"
}

variable "default_403_response_code" {
  description = "The status code to return when the given path is not found. Returning 'index.html' with status 200 allows the React router to intercept the path in an SPA."
  type        = number
  default     = 200
}

resource "aws_cloudfront_origin_access_control" "frontend" {
  name                              = "Frontend"
  description                       = "Allow cloudfront access to bucket with frontend html"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "frontend" {
  origin {
    domain_name              = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.frontend.id
    origin_id                = "primaryS3"
  }

  custom_error_response {
    /*
      S3 responds to non-existent objects as 403 and, since the OAC can access
      the whole bucket, a 403 will then always be for not found. Thanks AWS.
      Returning '/index.html' with status 200 allows the React router to
      intercept the path in a SPA (to control page navigation in code).
    */
    error_code         = 403
    response_code      = var.default_403_response_code
    response_page_path = "/${var.default_403_object}"
  }

  enabled             = true
  is_ipv6_enabled     = false
  default_root_object = "index.html"

  aliases = [local.fqdn]

  default_cache_behavior {
    # Using the CachingDisabled managed policy ID:
    cache_policy_id        = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "primaryS3"
    viewer_protocol_policy = "redirect-to-https"
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}
