---
title: Circuit Breaker Pattern for Microservices
type: blog
date: 2020-06-13
authors: ['Ashish']
image: ../cover.jpg
tags:
- node
---
#### Problem
How to prevent a network or service failure from cascading to other services?

#### Circuit Breaker
- Circuit breaker is a design pattern used to detect failures and encapsulates the logic of preventing a failure from constantly recurring, during maintenance, temporary external system failure or unexpected system difficulties.
- Assume that an application connects to a database 100 times per second and the database fails. The application designer does not want to have the same error reoccur constantly. They also want to handle the error quickly and gracefully without waiting for TCP connection timeout.

<img src="https://martinfowler.com/bliki/images/circuitBreaker/state.png"></img>

###### How to handle
1. **Cached Reponse:** Circuit breaker will remember which service failed how many time. It supports cached response.
2. **Fallback:** Fallback to some other service
3. **Recover:** 







---