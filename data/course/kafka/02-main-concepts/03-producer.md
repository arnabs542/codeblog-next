---
title: 'Kafka Producer'
type: 'topic'
section: 'Main Concepts'
course: 'Kafka'
tags:
- kafka
---
#### Producers
- Producers write data to topics (which is composed of partitions).
- Producers automatically know to which broker and partition to write to.
- In case of broker failure, Producers will automatically recover.
- Producers can choose to receive acknowledgement of data writes.

###### Acknowledgement modes:
1. **`acks=0`**:
    - Producer just sends data and won't wait for acknowledgement (possible data loss).
    - No response is requested.
    - If the broker goes offline or an exception happens, we won't know and will lose data.
    - Useful for data where its okay to potentially lose messages: Metric collection, Log collection, etc.
2. **`acks=1`**: (Default)
    - Producer will wait for the leader to acknowledge (limited data loss).
    - Leader response is requested, but replication is not a guarantee.
    - If an ack is not received, the producer may retry.
    - If the leader broker goes offline but replicas haven't replicated the data yet, we have a data loss.
3. **`acks=all`**:
    - Leader and all the replicas has to acknowledge (no data loss).
    - Added **latency** and **safety**.

#### Note
- `Acks=all` must be used in conjunction with `min.insync.replicas`.
- `min.insync.replicas` can be set at broker or topic level (override).
- `min.insync.replicas=2` implies that at least 2 brokers that are ISR (including leader) must respond that they have the data.
- That means if we use `replication.factor=3`, `min.insync.replicas=2`, `acks=all`, you can only tolerate 1 broker going down, otherwise the producer will receive an exception on send.


##### Message Keys
- Producers can choose to send a **key** with a message (string, number, etc..).
- If key is not sent or `key=null`, data is sent round robin (broker 101, then 102, then 103..)
- If key is sent, then all messages for that key will always go to the same partition (but we can't tell to which partition it will go).
- A key is basically sent if you need message ordering for a specific field.
- The mechanism of key to partition is called **Hashing**.

##### Producer Retries
- In case of transient failures, developers are expected to handle exceptions, otherwise the data will be lost.
- Examples of transient failures:
    - NotEnoughReplicasException
- There is a "retries" setting:
    - defaults to 0 for Kafka <= 2.0 (will not retry automatically)
    - defaults to 2147483647 for Kafka >= 2.1 (will retry automatically a very high number of times)
- The `retry.backoff.ms` setting is by default 100ms.
- The `delivery.timeout.ms` setting is by default 120000ms (2 minutes).
- Records will be failed if they can't be acknowledged in delivery.timeout.ms

###### Note
- In case of retries, there is chance that messages will be sent out of order (if a batch has failed to be sent)
- If you rely on key-based ordering, that can be an issue.
- For this, you can set the setting while controls how many produce requests can be made in parallel: `max.in.flight.per.connection`
    - By default it is 5
    - Set it to 1 to ensure ordering, but it may impact throughput.

#### Idempotent producers
- **The problem**: The producer can introduce duplicate messages in Kafka due to network errors.
- In Kafka >= 0.11, you can define a "idempotent producer" which won't introduce duplicates on network error.
- Idempotent producers are a great way to guarantee a stable and safe pipeline.
- They come with:
    - retries = Integer.MAX_VALUE(2^31 - 1 = 2147483647)
    - max.in.flight.requests = 1 (Kafka == 0.11)
    - max.in.flight.requests = 5 (Kafka >= 1.0, higher performance & keep ordering)
    - acks=all
- These settings are applied automatically after your producer has started if you don't set them manually.
- To make producer idempotent, just set:
    - producerProps.put("enable.idempotence", true);

#### Safe Producer summary
**kafka < 0.11**
- `acks=all` (producer level)
    - Ensures data is properly replicated before an ack is received.
- `min.insync.replicas=2` (broker/topic level)
    - Ensures 2 brokers in ISR at least have the data after an ack.
- `retries=MAX_INT` (producer level)
    - Ensures transient errors are retried indefinitely.
- `max.in.flight.requests.per.connection=1` (producer level)
    - Ensures only 1 request is tried at any time, preventing message re-ordering in case of retries.

**Kafka > 0.11**
- `enable.idempotence=true` (producer level) + `min.insync.replicas=2` (broker/topic level)
    - Keeps ordering guarantess and improving performance.

###### Note
- Running a "safe producer" might impact throughput and latency, always test for your use case.

---
#### Message Compression
- Producer usually send data that is text-based, for example with JSON data.
- In this case, it is important to apply compression to the producer.
- Compression is applied at Producer level and doesn't require any configuration change in the Brokers or in the Brokers or in the Consumers.
- `compression.type` can be `none` (default), `gzip`, `lz4`, `snappy`.
- Compression is more effective the bigger the batch of message being sent to Kafka.
- https://blog.cloudflare.com/squeezing-the-firehose/

###### Advantages
- Much smaller producer request size (compression ratio upto 4x)
- Fast transfer over network => less latency
- Better throughput
- Better disk utilization in Kafka

###### Disadvantages
- Producers must commit some CPU cycles to compression.
- Consumers must commit some CPU cycles to compression.

###### Note
- Consider testing snappy or lz4 for optimal speed/compression ratio
- Find a compression algorithm that gives you the best performance for your specific data. Test them all.
- Always use compression in production and especially if you have high throughput.
- Consider tweaking `linger.ms` and `batch.size` to have bigger batches, and therefore more compression and higher throughput.

---
#### Producer Batching
- By default, Kafka tries to send records as soon as possible
    - It will have up to 5 requests in flight, meaning up to 5 messages individually sent at the same time.
    - After this, if more messages have to be sent while others are in flight, Kafka is smart and will start batching them while they wait to send them all at once.
- This smart batching allows Kafka to increase throughput while maintaining very low latency.
- Batches have higher compression ratio so better efficiency.

**`linger.ms`**
- Number of milliseconds a producer is willing to wait before sending a batch out. (default 0)
- By introducing some lag (eg, `linger.ms=5`), we increase the chances of messages being sent together in a batch.
- So at the expense of introducing a small delay, we can increase throughput, compression and efficiency of our producer.
- If a batch is full, before the end of the `linger.ms` period, it will be sent to Kafka right away.

**`batch.size`**
- Maximum number of bytes that will be included in a batch. Default is 16KB.
- Increasing a batch size to something like 32KB or 64KB can increase the compression, throughput and efficiency of requests.
- Any message that is bigger than the batch size will not be batched.
- A batch is allocated per partition, so make sure that you don't set it to a number that's too high, otherwise you will run waste memory.
- You can monitor average batch size metric using Kafka Producer Metrics.

---
#### High Throughput Producer
- We will add `snappy` message compression in our producer.
    - `snappy` is very helpful if your messages are text based, for example log lines or JSON documents.
    - `snappy` has a good balance of CPU/compression ratio.
- We will also increase `batch.size` to 32KB and introduce a small delay through `linger.ms` (20ms.)

---
#### Producer Default Partitioner and how keys are hashed
- By default, keys are hashed using the "murmur2" algorithm.
- It is most likely preferred to not override the behavior of the partitioner, but it is possible to do so (`partitioner.class`).
- The formula is:
    - `targetPartition = Utils.abs(Utils.murmur2(record.key())) % numPartitions;`
- This means that same key will go to the same partition and adding partitions to a topic will completely alter the formula.

---
###### `max.block.ms` and `buffer.memory`
- If the producer produces faster than the broker can take, the records will be buffered in memory.
- By default, size of buffer memory of each producer: `max.block.ms` = 33554432 (32MB)
- That buffer will fill up over time and fill back down when the throughput to the broker increases.
- If that broker is full (all 32MB), then the `.send()` method will start to block (won't return right away).
- `max.block.ms` = 60000: the time the `.send()` will block until throwing an exception. Exceptions are basically thrown when
    - The producer has filled up its buffer.
    - The broker is not accepting any new data.
    - 60 seconds has elapsed.
- If you hit an exception that usually means your brokers are down or overloaded as they can't respond to the requests.