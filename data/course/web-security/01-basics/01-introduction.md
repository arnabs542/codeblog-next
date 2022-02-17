---
title: Introduction
type: topic
section: Basics
course: Web Security
tags:
- web security
---
#### What are SSL certificates
- SSL: Secure Sockets Layer. It is a cryptographic protocol used for communication.
- It uses HTTPS for secure communication. HTTPS is secure version of HTTP (the most common protocol to communicate on the web).
- Secure Communication means Data privacy and Data integrity i.e., someone can't see the data being sent and also cannot modify it.
- It certifies the ownership of a public key, which is used to encrypt data send between a browser and a remote server.

#### TSL certificates
- TSL: Transport Sockets Layer
- Far more common and superior than SSL. But people still use SSL name.
- Many names:
    1. SSL certificate
    2. SSL/TSL certificate
    3. Digital certificate
    4. Public key certificate
    5. Identity certificate

> Certificates are not dependent on the protocol. Certificate just certifies the public key.

#### Certificate Contents
- Organization
- URL
- State, Country
- Valid date range
- Issuer
- Type of encryption

File: `.crt`, `.cer`

<img src="https://www.clickssl.net/wp-content/uploads/2020/08/domain-crt.png"></img>

#### Purpose
- Encrypted secure communication between browser and web server.
- Identity
- Trustworthiness


