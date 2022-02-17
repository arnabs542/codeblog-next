---
title: 'Introduction to Rabbitmq'
type: 'topic'
section: 'Basics'
course: 'Rabbitmq'
tags:
- python
---
#### What is Rabbitmq?
- It is the most widely used message broker.
- It is open source, lightweight, and easy to deploy.
- It supports different messaging protocols.
- It can be deployed to clusters to provide high availability and scalability, necessary in enterprise solutions.

##### Main Features
1. Rabbitmq allows for a variable level of reliability, generally configuring for increased reliability will reduce the performance so this can be managed as required.
2. Complex routing capabilities.
3. Different configurations to group together brokers for different puropse eg., Clusters, Federation, Shovel models.
4. Highly available message queues.
5. Support for multiple protocols.
6. Clients available in a large number of languages including Java, C#, Go, Erlang, JavaScript, etc.

---
#### Basic Concepts
##### Connection
- A conenction is basically a TCP connection between and application and the rabbitmq broker, that performs underlying networking tasks including initial authentication, IP resolution, and networking.

##### Channel
- An application can open multiple "lightweight connections" on a single connection. This "lightweight connection" is called a channel.
- Each connection can maintain a set of underlying channels.





---

