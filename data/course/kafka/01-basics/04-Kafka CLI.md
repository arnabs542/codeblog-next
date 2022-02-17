---
title: 'Kafka CLI'
type: 'topic'
section: 'Basics'
course: 'Kafka'
tags:
- kafka
---
##### `kafka-topics`

###### Create a topic
- `kafka-topics --zookeeper 127.0.0.1:2181 --topic first_topic --create --partitions 3 --replication-factor 2`

###### List all topics
- `kafka-topics --zookeeper 127.0.0.1:2181 --list`

###### Describe a topic
- `kafka-topics --zookeeper 127.0.0.1:2181 --topic first_topic --describe`

###### Delete a topic
- `kafka-topics --zookeeper 127.0.0.1:2181 --topic first_topic --delete`

**Note:**
- In Kafka, you cannot create a topic with a replication factor greater than the number of brokers you have.

---
##### `kafka-console-producer`
###### Produce a message
- `kafka-console-producer --broker-list 127.0.0.1:9092 --topic first_topic`
- `kafka-console-producer --broker-list 127.0.0.1:9092 --topic first_topic --producer-property acks=all`

**Note:**
- Producing to a topic that didn't exist before, will create it with default config.

---
##### `kafka-console-consumer`
###### Consume a message
- `kafka-console-consumer --bootstrap-server 127.0.0.1:9092 --topic first_topic`

**Note:**
- `kafka-console-consumer` by default only reads from the point when we launch it, not old messages.

###### Consume all message from beginning
- `kafka-console-consumer --bootstrap-server 127.0.0.1:9092 --topic first_topic --from-beginning`

###### Assign consumer group
- `kafka-console-consumer --bootstrap-server 127.0.0.1:9092 --topic first_topic --group my-first-app`

---
##### `kafka-consumer-groups`
###### List all consumer groups
- `kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --list`

###### Describe a consumer groups
- `kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --describe --group my-first-app`

###### Reset offsets
- `kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --group my-first-app --reset-offsets --to-earliest --execute --topic first_topic`

###### Shift offsets
- `kafka-consumer-groups --bootstrap-server 127.0.0.1:9092 --group my-first-app --reset-offsets --shift-by -1 --execute --topic first_topic`

---