---
title: Handshake and Cryptography
type: topic
section: Basics
course: Web Security
tags:
- web security
---
#### Symmetric-Key Cryptography
- Encrypt data using a key
- Decrypt data using the same key
- Symmetric key = Same key

#### Asymmetric-Key Cryptography / Public Key Cryptography
- Pair of mathematically linked numbers (by multiplying prime numbers)
- Public key and Private key
- Private key should always be kept secret and secure
- Public key can be shared widely
- Data encrypted with the public key can only be decrypted using the private key

#### NSSL/TSL Handshake
- A browser sends a request to a web server
- The server sends back its SSL certificate, which includes the public key and other data about the server's identity.
- The browser confirms the SSL certificate is valid
- The browser encrypts a very long password using the public key and sends it to the server
- The server decrypts the data using its private key and retrieves the password
- The server and browser both possess the same password
- They use the shared password to encrypt all future communications with symmetric-key cryptography (because its fast)
- Passwords are temporary and not reused

