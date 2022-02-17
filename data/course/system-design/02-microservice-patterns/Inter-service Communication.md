---
title: Inter-service Communication
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
Communication between microservices must be efficient and robust. With lots of small services interacting to complete a single transaction, this can be a challenge.

## Challenges
#### Resiliency
There are two design patterns that can help make service-to-service network calls more resilient:
1. **Retry**: A network call may fail because of a transient fault that goes away by itself. Rather than fail outright, the caller should typically retry the operation a certain number of times, or until a configured time-out period elapses. However, if an operation is not idempotent, retries can cause unintended side effects. The original call might succeed, but the caller never gets a response. If the caller retries, the operation may be invoked twice. Generally, it's not safe to retry POST or PATCH methods, because these are not guaranteed to be idempotent.
2. **Circuit Breaker**: Too many failed requests can cause a bottleneck, as pending requests accumulate in the queue. These blocked requests might hold critical system resources such as memory, threads, database connections, and so on, which can cause cascading failures. The Circuit Breaker pattern can prevent a service from repeatedly trying an operation that is likely to fail.

#### Load balancing
When service "A" calls service "B", the request must reach a running instance of service "B". In Kubernetes, the Service resource type provides a stable IP address for a group of pods. Network traffic to the service's IP address gets forwarded to a pod by means of iptable rules. By default, a random pod is chosen. A service mesh (see below) can provide more intelligent load balancing algorithms based on observed latency or other metrics.

#### Distributed tracing
A single transaction may span multiple services. That can make it hard to monitor the overall performance and health of the system. Even if every service generates logs and metrics, without some way to tie them together, they are of limited use. The article Logging and monitoring talks more about distributed tracing, but we mention it here as a challenge.

#### Service versioning
When a team deploys a new version of a service, they must avoid breaking any other services or external clients that depend on it. In addition, you might want to run multiple versions of a service side-by-side, and route requests to a particular version. See API Versioning for more discussion of this issue.

#### TLS encryption and mutual TLS authentication
For security reasons, you may want to encrypt traffic between services with TLS, and use mutual TLS authentication to authenticate callers.

---
## Synchronous versus asynchronous messaging
There are two basic messaging patterns that microservices can use to communicate with other microservices.
1. **Synchronous communication**. In this pattern, a service calls an API that another service exposes, using a protocol such as HTTP or gRPC. This option is a synchronous messaging pattern because the caller waits for a response from the receiver.
2. **Asynchronous message passing**. In this pattern, a service sends message without waiting for a response, and one or more services process the message asynchronously.

#### Advantages of Asynchronous messaging
- Reduced coupling. The message sender does not need to know about the consumer.
- Multiple subscribers. Using a pub/sub model, multiple consumers can subscribe to receive events.
- Failure isolation. If the consumer fails, the sender can still send messages. The messages will be picked up when the consumer recovers. This ability is especially useful in a microservices architecture, because each service has its own lifecycle. A service could become unavailable or be replaced with a newer version at any given time. Asynchronous messaging can handle intermittent downtime. Synchronous APIs, on the other hand, require the downstream service to be available or the operation fails.
- Responsiveness. An upstream service can reply faster if it does not wait on downstream services. This is especially useful in a microservices architecture. If there is a chain of service dependencies (service A calls B, which calls C, and so on), waiting on synchronous calls can add unacceptable amounts of latency.
- Load leveling. A queue can act as a buffer to level the workload, so that receivers can process messages at their own rate.
- Workflows. Queues can be used to manage a workflow, by check-pointing the message after each step in the workflow.

#### Challenges to using asynchronous messaging
- Coupling with the messaging infrastructure. Using a particular messaging infrastructure may cause tight coupling with that infrastructure. It will be difficult to switch to another messaging infrastructure later.
- Latency. End-to-end latency for an operation may become high if the message queues fill up.
- Cost. At high throughputs, the monetary cost of the messaging infrastructure could be significant.
- Complexity. Handling asynchronous messaging is not a trivial task. For example, you must handle duplicated messages, either by de-duplicating or by making operations idempotent. It's also hard to implement request-response semantics using asynchronous messaging. To send a response, you need another queue, plus a way to correlate request and response messages.
- Throughput. If messages require queue semantics, the queue can become a bottleneck in the system. Each message requires at least one queue operation and one dequeue operation. Moreover, queue semantics generally require some kind of locking inside the messaging infrastructure. If the queue is a managed service, there may be additional latency, because the queue is external to the cluster's virtual network. You can mitigate these issues by batching messages, but that complicates the code. If the messages don't require queue semantics, you might be able to use an event stream instead of a queue. For more information, see Event-driven architectural style.

#### Choosing the messaging patterns



---