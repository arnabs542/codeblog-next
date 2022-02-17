---
title: Certificates
type: topic
section: Basics
course: Web Security
tags:
- web security
---
#### Certificate Authorities (CAs)
- Entities that issue digital certificates
- CAs certify the ownership of a public key
- Provide information, a public key, and sometimes a fee
- Get back a certificate
- Similar to notorizing an identity
- Trusted third party
- Browsers keep a list of the CAs (their own or from the OS)
- A browser trusts the CAs
- A CA has certified that a particular URL owns a public key
- A browser can trust the public key

#### Free certificates with Let's Encrypt
- https://letsencrypt.org/
- Non profit organization promoting adoption of HTTPS
- Free certificates that are easy to set up
- Valid for 90 days, auto-renewable

#### Self-signed certificates
- Certificates which have not been approved by a CA.
- Allow encryption
- No third-party trust
- Browser will display a security alert
- Useful when systems trust each other and need encryption

#### Certificate types
- Single Domain SSL Certificates. ...
- Wildcard SSL Certificates. ...
- Multi-Domain SSL Certificates (MDC) ...
- Domain Validation SSL Certificates. ...
- Organization Validation SSL Certificates. ...
- Extended Validation SSL Certificates.


