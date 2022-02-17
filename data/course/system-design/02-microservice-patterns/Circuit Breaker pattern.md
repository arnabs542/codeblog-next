---
title: Circuit Breaker pattern
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
#### Circuit Breaker pattern
Handle faults that might take a variable amount of time to recover from, when connecting to a remote service or resource. This can improve the stability and resiliency of an application.

#### Problem
In a distributed environment, how to prevent a network or service failure from cascading to other services?

#### Solution
Circuit breaker is a design pattern used in software development. It is used to detect failures and encapsulates the logic of preventing a failure from constantly recurring, during maintenance, temporary external system failure or unexpected system difficulties.

Assume that an application connects to a database 100 times per second and the database fails. The application designer does not want to have the same error reoccur constantly. They also want to handle the error quickly and gracefully without waiting for TCP connection timeout.

Generally Circuit Breaker can be used to check the availability of an external service. An external service can be a database server or a web service used by the application.

Circuit breaker detects failures and prevents the application from trying to perform the action that is doomed to fail (until it's safe to retry).

#### Implementation

<img src="https://martinfowler.com/bliki/images/circuitBreaker/state.png"></img>

###### How to handle
1. **Cached Reponse:** Circuit breaker will remember which service failed how many time. It supports cached response.
2. **Fallback:** Fallback to some other service
3. **Recover:** 





---