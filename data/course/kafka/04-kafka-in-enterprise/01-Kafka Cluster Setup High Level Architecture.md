---
title: Kafka Cluster Setup High Level Architecture
type: topic
section: Kafka in Enterprise
course: Kafka
tags:
- kafka
---
#### Kafka Cluster Setup High Level Architecture
- You want multiple brokers in different data centers (racks) to distribute load. You also want a cluster of at least 3 zookeepers.
- A cluster in AWS:
    - us-east-1a: Zookeeper 1 (Kafka broker 1, Kafka broker 4,..)
    - us-east-1b: Zookeeper 2 (Kafka broker 2, Kafka broker 5,..)
    - us-east-1c: Zookeeper 3 (Kafka broker 3, Kafka broker 6,..)
- It is not easy to setup Kafka
- You should isolate each Zookeeper & Broker on separate servers.
- Monitoring needs to be implemented
- Operations have to be mastered
- You need a really good Kafka Admin

Note:
- Alternative: many different "Kafka as a service" offerings on the web
- No operational burdens (updates, monitoring, setup, etc.)

