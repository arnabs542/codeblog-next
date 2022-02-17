---
title: API Gateway Pattern
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
#### Problem
How do the clients of a Microservices-based application access the individual services?

#### Solution
Circuit breaker is a design pattern used in software development. It is used to detect failures and encapsulates the logic of preventing a failure from constantly recurring, during maintenance, temporary external system failure or unexpected system difficulties.

Assume that an application connects to a database 100 times per second and the database fails. The application designer does not want to have the same error reoccur constantly. They also want to handle the error quickly and gracefully without waiting for TCP connection timeout.

Generally Circuit Breaker can be used to check the availability of an external service. An external service can be a database server or a web service used by the application.

Circuit breaker detects failures and prevents the application from trying to perform the action that is doomed to fail (until it's safe to retry).

#### API Gateway Pattern
Let’s imagine that you are developing a native mobile client for a shopping application. It’s likely that you need to implement a product details page, which displays information about any given product.

When using a monolithic application architecture, a mobile client would retrieve this data by making a single REST call (`GET api.company.com/productdetails/productId`) to the application. A **load balancer** routes the request to one of N identical application instances. The application would then query various database tables and return the response to the client.

In contrast, when using the microservices architecture the data displayed on the product details page is owned by multiple microservices.
- Shopping Cart Service – Number of items in the shopping cart
- Order Service – Order history
- Catalog Service – Basic product information, such as its name, image, and price
- Review Service – Customer reviews
- Inventory Service – Low inventory warning
- Shipping Service – Shipping options, deadlines, and costs drawn separately from the shipping provider’s API
- Recommendation Service(s) – Suggested items

how the mobile client accesses these services. Let’s look at the options.
###### 1. Direct Client‑to‑Microservice Communication
In theory, a client could make requests to each of the microservices directly. Each microservice would have a public endpoint (`https://serviceName.api.company.name`). This URL would map to the microservice’s load balancer, which distributes requests across the available instances. To retrieve the product details, the mobile client would make requests to each of the services listed above.

1. Unfortunately, there are challenges and limitations with this option. One problem is the mismatch between the needs of the client and the fine‑grained APIs exposed by each of the microservices. The client in this example has to make seven separate requests. In more complex applications it might have to make many more. For example, Amazon describes how hundreds of services are involved in rendering their product page. While a client could make that many requests over a LAN, it would probably be too inefficient over the public Internet and would definitely be impractical over a mobile network. This approach also makes the client code much more complex.
2. Another problem with the client directly calling the microservices is that some might use protocols that are not web‑friendly. One service might use Thrift binary RPC while another service might use the AMQP messaging protocol. Neither protocol is particularly browser‑ or firewall‑friendly and is best used internally. An application should use protocols such as HTTP and WebSocket outside of the firewall.
3. Another drawback with this approach is that it makes it difficult to refactor the microservices. Over time we might want to change how the system is partitioned into services. For example, we might merge two services or split a service into two or more services. If, however, clients communicate directly with the services, then performing this kind of refactoring can be extremely difficult.

###### 2. Using an API Gateway
Usually a much better approach is to use what is known as an API Gateway. An API Gateway is a server that is the single entry point into the system. It is similar to the **Facade** pattern from object‑oriented design. The API Gateway encapsulates the internal system architecture and provides an API that is tailored to each client. It might have other responsibilities such as authentication, monitoring, load balancing, caching, request shaping and management, and static response handling.

<img src="https://cdn.wp.nginx.com/wp-content/uploads/2016/04/Richardson-microservices-part2-3_api-gateway.png"></img>

A great example of an API Gateway is the Netflix API Gateway. http://techblog.netflix.com/2013/02/rxjava-netflix-api.html The Netflix API Gateway handles billions of requests per day.




#### Implementing an API Gateway
- Performance and Scalability
- Using a Reactive Programming Model
- Service Invocation
- Service Discovery
- Handling Partial Failures


#### Advantages of API Gateway
- Authentication
- SSL termination
- Load balancing
- Insulation
- A major benefit of using an API Gateway is that it encapsulates the internal structure of the application. Rather than having to invoke specific services, clients simply talk to the gateway. The API Gateway provides each kind of client with a specific API. This reduces the number of round trips between the client and application. It also simplifies the client code.

#### Drawbacks of an API Gateway
- It is yet another highly available component that must be developed, deployed, and managed. There is also a risk that the API Gateway becomes a development bottleneck. Developers must update the API Gateway in order to expose each microservice’s endpoints. It is important that the process for updating the API Gateway be as lightweight as possible. Otherwise, developers will be forced to wait in line in order to update the gateway.


---