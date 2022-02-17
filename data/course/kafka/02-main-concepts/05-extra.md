---
title: 'Extra'
type: 'topic'
section: 'Main Concepts'
course: 'Kafka'
tags:
- kafka
---
#### Kafka Broker Discovery
- Every Kafka broker is also called a "bootstrap server".
- It means we only need to connect to one broker, and we will be connected to the entire cluster.
- Each broker knows about all brokers, topics and partitions (metadata).

---
#### Zookeeper
- It manages brokers (keeps a list of them).
- It helps in performing leader election for partitions.
- It sends notifications to Kafka in case of changes (new topic, broker dies, broker comes up, delete topics, etc..).
- Kafka cannot work without Zookeeper.
- Zookeeper by design operates with an odd number of servers (3, 5, 7).
- Zookeeper has a leader (handles writes) the rest of the servers are followers (handle reads).

Note:
- Zookeeper does not store consumer offsets with Kafka > v0.10

---
#### Kafka Guarantees
- Messages are appended to a topic partition in the order they are sent.
- Consumers read messages in the order stored in a topic-partition.
- With a replication factor of N, producers and consumers can tolerate upto N-1 brokers being down.
- This is why a replication factor of 3 is a good idea:
    - Allows for one broker to be taken down for maintenance.
    - Allows for another broker to be taken down unexpectedly.
- As long as the number of partitions remains constant for a topic (no new partitions), the same key will always go to the same partition.


<img src="https://kafka.apache.org/10/images/streams-architecture-overview.jpg"></img>

---