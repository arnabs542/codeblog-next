---
title: Overview
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
#### Challenges in cloud development
##### 1. Availability
Availability is the proportion of time that the system is functional and working, usually measured as a **percentage of uptime**. It can be affected by system errors, infrastructure problems, malicious attacks, and system load. Cloud applications typically provide users with a **service level agreement (SLA)**, so applications must be designed to maximize availability.

##### 2. Data management
Data management is the key element of cloud applications, and influences most of the quality attributes. Data is typically hosted in different locations and across multiple servers for reasons such as **performance**, **scalability** or **availability**, and this can present a range of challenges.

For example, data consistency must be maintained, and data will typically need to be synchronized across different locations.

##### 3. Design and Implementation
Good design encompasses factors such as **consistency** and **coherence** in component design and deployment, **maintainability** to simplify administration and development, and **reusability** to allow components and subsystems to be used in other applications and in other scenarios. Decisions made during the design and implementation phase have a huge impact on the quality and the total cost of ownership of cloud hosted applications and services.

##### 4. Messaging
The distributed nature of cloud applications requires a messaging infrastructure that connects the components and services, ideally in a **loosely coupled** manner in order to **maximize scalability**. **Asynchronous messaging** is widely used, and provides many benefits, but also brings challenges such as the ordering of messages, poison message management, idempotency, and more.

##### 5. Management and Monitoring
Cloud applications run in a remote datacenter where you do not have full control of the infrastructure or, in some cases, the operating system. This can make management and monitoring more difficult than an on-premises deployment. Applications must expose runtime information that administrators and operators can use to manage and monitor the system, as well as supporting changing business requirements and customization without requiring the application to be stopped or redeployed.

##### 6. Performance and Scalability
Performance is an indication of the responsiveness of a system to execute any action within a given time interval, while scalability is ability of a system either to handle increases in load without impact on performance or for the available resources to be readily increased. Cloud applications typically encounter variable workloads and peaks in activity. Predicting these, especially in a multitenant scenario, is almost impossible. Instead, applications should be able to scale out within limits to meet peaks in demand, and scale in when demand decreases. Scalability concerns not just compute instances, but other elements such as data storage, messaging infrastructure, and more.

##### 7. Resiliency
Resiliency is the ability of a system to gracefully handle and recover from failures. The nature of cloud hosting, where applications are often multitenant, use shared platform services, compete for resources and bandwidth, communicate over the Internet, and run on commodity hardware means there is an increased likelihood that both transient and more permanent faults will arise. Detecting failures, and recovering quickly and efficiently, is necessary to maintain resiliency.

##### 8. Security
Security provides confidentiality, integrity, and availability assurances against malicious attacks on information systems (and safety assurances for attacks on operational technology systems). Losing these assurances can negatively impact your business operations and revenue, as well as your organization’s reputation in the marketplace. Maintaining security requires following well-established practices (security hygiene) and being vigilant to detect and rapidly remediate vulnerabilities and active attacks.

---
#### Catalog of patterns

| Pattern | Summary | Category |
|-|-|-|
| Ambassador | Create helper services that send network requests on behalf of a consumer service or application. | Design and Implementation, Management and Monitoring |
| Anti-Corruption Layer | Implement a façade or adapter layer between a modern application and a legacy system. | Design and Implementation, Management and Monitoring |
| Asynchronous Request-Reply | Decouple backend processing from a frontend host, where backend processing needs to be asynchronous, but the frontend still needs a clear response. | Messaging |
| Backends for Frontends | Create separate backend services to be consumed by specific frontend applications or interfaces. | Design and Implementation |
| Bulkhead | Isolate elements of an application into pools so that if one fails, the others will continue to function. | Resiliency |
| Cache-Aside | Load data on demand into a cache from a data store | Data Management, Performance and Scalability |
| Choreography | Let each service decide when and how a business operation is processed, instead of depending on a central orchestrator. | Messaging, Performance and Scalability |
| Circuit Breaker | Handle faults that might take a variable amount of time to fix when connecting to a remote service or resource. | Resiliency |
| Claim Check | Split a large message into a claim check and a payload to avoid overwhelming a message bus. | Messaging |
| Compensating Transaction | Undo the work performed by a series of steps, which together define an eventually consistent operation. | Resiliency |
| Competing Consumers | Enable multiple concurrent consumers to process messages received on the same messaging channel. | Messaging |
| Compute Resource Consolidation | Consolidate multiple tasks or operations into a single computational unit | Design and Implementation |
| CQRS | Segregate operations that read data from operations that update data by using separate interfaces. | Data Management, Design and Implementation, Performance and Scalability |
| Deployment Stamps | Deploy multiple independent copies of application components, including data stores. | Availability, Performance and Scalability |
| Event Sourcing | Use an append-only store to record the full series of events that describe actions taken on data in a domain. | Data Management, Performance and Scalability |
| External Configuration Store | Move configuration information out of the application deployment package to a centralized location. | Design and Implementation, Management and Monitoring |
| Federated Identity | Delegate authentication to an external identity provider. | Security |
| Gatekeeper | Protect applications and services by using a dedicated host instance that acts as a broker between clients and the application or service, validates and sanitizes requests, and passes requests and data between them. | Security |
| Gateway Aggregation | Use a gateway to aggregate multiple individual requests into a single request. | Design and Implementation, Management and Monitoring |
| Gateway Offloading | Offload shared or specialized service functionality to a gateway proxy. | Design and Implementation, Management and Monitoring |
| Gateway Routing | Route requests to multiple services using a single endpoint. | Design and Implementation, Management and Monitoring |
| Geodes | Deploy backend services into a set of geographical nodes, each of which can service any client request in any region. | Availability, Performance and Scalability |
| Health Endpoint Monitoring | Implement functional checks in an application that external tools can access through exposed endpoints at regular intervals. | Availability, Management and Monitoring, Resiliency |
| Index Table | Create indexes over the fields in data stores that are frequently referenced by queries. | Data Management, Performance and Scalability |
| Leader Election | Coordinate the actions performed by a collection of collaborating task instances in a distributed application by electing one instance as the leader that assumes responsibility for managing the other instances. | Design and Implementation, Resiliency |
| Materialized View | Generate prepopulated views over the data in one or more data stores when the data isn't ideally formatted for required query operations. | Data Management, Performance and Scalability |
| Pipes and Filters | Break down a task that performs complex processing into a series of separate elements that can be reused. | Design and Implementation, Messaging |
| Priority Queue | Prioritize requests sent to services so that requests with a higher priority are received and processed more quickly than those with a lower priority. | Messaging, Performance and Scalability |
| Publisher/Subscriber | Enable an application to announce events to multiple interested consumers asynchronously, without coupling the senders to the receivers. | Messaging |
| Queue-Based Load Leveling | Use a queue that acts as a buffer between a task and a service that it invokes in order to smooth intermittent heavy loads. | Availability, Messaging, Resiliency, Performance and Scalability
| Retry | Enable an application to handle anticipated, temporary failures when it tries to connect to a service or network resource by transparently retrying an operation that's previously failed. | Resiliency |
| Scheduler Agent Supervisor | Coordinate a set of actions across a distributed set of services and other remote resources. | Messaging, Resiliency |
| Sequential Convoy | Process a set of related messages in a defined order, without blocking processing of other groups of messages. | Messaging |
| Sharding | Divide a data store into a set of horizontal partitions or shards. | Data Management, Performance and Scalability |
| Sidecar | Deploy components of an application into a separate process or container to provide isolation and encapsulation. | Design and Implementation, Management and Monitoring |
| Static Content Hosting | Deploy static content to a cloud-based storage service that can deliver them directly to the client. | Design and Implementation, Data Management, Performance and Scalability |
| Strangler | Incrementally migrate a legacy system by gradually replacing specific pieces of functionality with new applications and services. | Design and Implementation, Management and Monitoring |
| Throttling | Control the consumption of resources used by an instance of an application, an individual tenant, or an entire service. | Availability, Performance and Scalability |
| Valet Key | Use a token or key that provides clients with restricted direct access to a specific resource or service. | Data Management, Security |

---