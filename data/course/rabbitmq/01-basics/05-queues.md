---
title: 'Queues'
type: 'topic'
section: 'Basics'
course: 'Rabbitmq'
tags:
- python
---
#### Queues

##### Message Ordering
- By default, message ordering in queues is First In First Out (FIFO).
- However, queues can be configured to act as priority queues, in which messages will be ordered depending on their priority which is set by the sender.

##### Durability
- Durable queues are persisted to disk and thus survive broker restarts. Queues that are not durable are called **transient**.
- Setting a queue to durable does not make messages that are routed to that queue durable. If the message broker is restarted, a durable queue will be re-declared during broker startup, however, only persistent messages will be recovered.
- The message sender can set the `delivery_mode` property for a message to set it to `persistent`, then it will be persisted to disk as soon as it is received by a durable queue.
- In some cases, non-persistent messages are also written to disk when there is a shortage of memory. However, this will not make them durable.

##### Temporary Queues
- Queues can be configured to be deleted automatically in 3 ways

1. **Exclusive queues** can only be used by their declaring connection, and will be automatically deleted once this connection is lost.
2. An **expiry time (time to live)** can be set for the queue. If the queue is left unused for a duration exceeding this period, the broker will automatically delete the queue.
3. **Auto-delete queues** will be automatically deleted once their last consumer has cancelled through the `basic.cancel` protocol or gone (eg., closed connection).

---