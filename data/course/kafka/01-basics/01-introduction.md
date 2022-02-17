---
title: 'Introduction'
type: 'topic'
section: 'Basics'
course: 'Kafka'
tags:
- kafka
---
#### What is the problem?
- Usually we have multiple source systems and multiple target systems and they all have to exchange data with each other. 
- As system grows, it becomes really complicated. If we have 4 sources and 6 target systems, we need to write 24 integrations.
- Each integration comes with difficulties around.
    - Protocol: how data is transported (TCP, HTTP, REST, FTP, JDBC)
    - Data format: fow data is parsed (Binary, CSV, JSON, Avro)
    - Data Schema: how data is shaped and may change
- Each source system will have an increased load from the connections

#### Why Apache Kafka?
- It allows to decouple data streams and systems.
- Source system will have their data end up in Apache Kafka.
- While target systems will source their data straight from Apache Kafka.
- This decoupling is good about Apache Kafka.
- It is distributed, resilient architecture, fault tolerant.
- Horizontal scalability:
    - can scale to **100s of brokers**
    - can scale to **millions of messages per second**
- High performance: latency of less than 10ms (real time).

##### Use case
1. Messaging System
2. Activity Tracking
3. Gather metrics from many different locations
4. Application logs gathering
5. Stream processing (with Kafka Streams API or Spark for example)
6. De-coupling of system dependencies.
7. Integration with Spark, Flink, Storm, Hadoop, and many other Big Data technologies.

##### Examples
- **Netflix** uses Kafka to apply recommendations in real-time while you are watching TV shows.
- **Uber** uses Kafka to gather user, taxi and trip data in real-time to compute and forecast demand, and compute surge pricing in real-time.
- **Linkedin** uses Kafka to prevent spam, collect user interactions to make better connection recommendations in real-time.



---
#### RabbitMQ vs Kafka

|RabbitMQ/AMQP based system|Kafka|
|-|-|
|AMQP based (Advanced Messaging Queueing Protocol)|Kafka is distributed event streaming platform. Became popular choice for Event driven Microservice architecture|
|Performance: 30-40K/sec|Performance: 2 Millions/sec|
|Payload size: No constraint|Payload size: Default limit 1 MB (configurable)|
|Message retention: Acknowledgement based|Message retention: Policy based (eg, 2 days, etc)|
|Exchange Type: Direct, Fan out, Topic, header based|Publish subscribe based|
|Where: Enterprise systems, Finance|Where: Monitoring, logs, operational data, stock|
