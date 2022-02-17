---
title: 'Kafka Consumer'
type: 'topic'
section: 'Main Concepts'
course: 'Kafka'
tags:
- kafka
---
#### Consumers
- Comsumers read data from topics (identified by name).
- Consumers know which broker to read from.
- In case of broker failures, consumers know how to recover.
- Data is read in order within each partition.

##### Consumer Groups
- Consumers read data in consumers groups.
- Each consumer within a group reads from exclusive partitions.
- If you have more consumers than partitions, some consumers will be inactive.

##### Consumer Offsets
- Kafks stores the offsets at which a consumer group has been reading.
- The offsets committed live in a Kafka topic named `__consumer_offsets`
- When a consumer in a group has processed data received from Kafka, it should be committing the offsets. (done automatically)
- If a consumer dies, it will be able to read back from where it left off thanks to the committed consumer offsets.

##### Delivery Semantics for consumers
- Consumers choose when to commit offsets.
- There are 3 delivery semantics:
    1. **At most once:** (usually not preferred)
        - Offsets are committed as soon as the message is received.
        - If the processing goes wrong, the message will be lost (it won't be read again).
    2. **At least once:** (usually preferred)
        - Offsets are committed only after the message is processed.
        - If processing goes wrong, the message will be read again.
        - This can result in **duplicate processing of messages**. Make sure your processing is **idempotent** (processing again the messages won't impact your systems).
    3. **Exactly once:**
        - It can only be obtained from ***for Kafka to Kafka workflow***, using the Kafka Streams API.
        - ***For Kafka to external system workflows***, use an idempotent consumer. It makes sure that there is no duplicate in the final database.

###### Idempotent
- We can make processing idempotent by adding "id" parameter in IndexRequest.

##### Consumer Poll Behavior
- Kafka consumers have a "poll" model, while many other messaging bus in enterprises have a "push" model.
- This allows consumers to control where in the log they want to consume, how fast and gives them the ability to replay events.

**Settings**
1. `Fetch.min.bytes` (Default 1)
    - Controls how much data you want to pull at least on each request.
    - Helps improving throughput and decreasing request number.
    - At the cost of latency
2. `Max.poll.records` (Default 500)
    - Controls how many records to receive per poll request
    - Increase if your messages are very small and have a lot of available RAM.
    - Good to monitor how many records are polled per request
3. `Max.partitions.fetch.bytes` (Default 1MB)

4. `Fetch.max.bytes` (Default 50MB)
    - Maximum data returned for each fetch request (covers multiple partitions)
    - Consumer performs multiple fetches in parallel
    
---
##### Consumer Offset commits strategies
Two most common patterns for committing offsets in a consumer application
1. **enable.auto.commit = true & synchronous processing of batches**
    - With auto commit enabled, offsets will be committed automatically for you at regular interval **(auto.commit.interval.ms=5000 by default)** every time you call `.poll()`
    - If you don't use synchronous processing, you will be in "at-most-once" behavior because offsets will be committed before your data is processed.

```java
while(true) {
    List<Record> batch = consumer.poll(Duration.ofMillis(100));
    doSomething(batch);
}
```

2. **enable.auto.commit = false & manual commit of offsets**

3. **enable.auto.commit = false & synchronous processing of batches**
    - You control when you commit offsets and what's the condition for committing them.

```java
while(true) {
    batch += consumer.poll(Duration.ofMillis(100));
    if(isReady(batch)) {
        doSomethingSynchronous(batch);
        consumer.commitSync();
    }
}
```

---
##### Consumer offset reset behavior
- A consumer is expected to read from a log continuously
    - `auto.offset.reset=latest`: will read from the end of the log
    - `auto.offset.reset=earliest`: will read from the start of the log
    - `auto.offset.reset=none`: will throw exception if no offset is found
- Consumer offsets can be lost:
    - If a consumer hasn't read new data in 1 day. (Kafka < 2.0)
    - If a consumer hasn't read new data in 7 days. (Kafka >= 2.0)
    - This can be controlled by broker setting `offset.retention.minutes`

##### Replaying data for consumers
To replay data for a consumer group:
1. Take all consumers from a specific group down.
2. Use `kafka-consumer-groups` command to set offset to what you want
3. Restart consumers

**Note:**
- Set proper data retention period and offset retention period.
- Ensure the auto offset reset behavior is the one you expect / want.
- Use replay capabilities in case of unexpected behavior.