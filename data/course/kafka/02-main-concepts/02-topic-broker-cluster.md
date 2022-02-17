---
title: 'Kafka Topic, Broker, Cluster'
type: 'topic'
section: 'Main Concepts'
course: 'Kafka'
tags:
- kafka
---
<img src="https://kafka.apache.org/images/streams-and-tables-p1_p4.png"></img>

#### Topic
- A **topic** represents a particular stream of data.
- It is similar to a table in a database (without all the constraints)
- We can have as many topics as we want.
- A topic is identified by its name

#### Partition
- Topics are split into **partitions**. A partition is something concrete.
- Each partition is ordered.
- Each partition will not have same number of messages, its independent.

#### Offset
- Each message within a partition gets an incremental id, called **offset**.

---
##### Topic example (`trucks_gps`)
- We have a fleet of trucks, each truck reports its GPS position to Kafka.
- We can have a topic `trucks_gps` that contains the position of all trucks.
- Each truck will send a message to Kafka every 20 seconds, each message will contain truck ID and truck position (latitude/longitude).
- We chose to create that topic with 10 partitions.
- We can have different consumers of data.

#### Note:
1. Offsets only have a meaning for a specific partition. Offset 3 in partition 0 doesn't represent the same data as offset 3 in partition 1.
2. Order is guaranteed only within a partition, not accross partitions.
3. Data is kept only for a limited time, default is 1 week.
4. Once the data is written to a partition, it can't be changes (immutable).
5. Data is assigned randomly to a partition unless a **key** is provided.

---
#### Broker and Kafka Cluster
- A **Broker** is basically a server that holds topics.
- A **Kafka Cluster** is composed of multiple brokers (servers).
- Each broker is identified by its ID (Integer).
- Each broker contains certain topic partitions.
- After connecting to any broker (called a bootstrap broker), you will be connected to the entire cluster.
- A topic partitions can be spread in different brokers.

##### Topic Replication Factor
- When we create a topic, we need to decide on the replication factor. Usually its between 2 and 3.
- Replication factor defines the number of copies of data.
- This way, if a broker is down, another broker can serve the data.

##### Leader for a Partition
- At any time, only one broker can be the leader for a given partition.
- Only that leader can receive and serve data for a partition.
- The other brokers will just synchronize the data.
- Each partition will have 1 leader and multiple ISR (in-sync replica).

---