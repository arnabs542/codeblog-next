---
title: 'Message Queue and Exchange'
type: 'topic'
section: 'Basics'
course: 'Rabbitmq'
tags:
- python
---
#### Messages
- A message is a binary blob of data that is handled by RabbitMQ and can be distributed to queues and exchanges.

##### Producer
- Producer refers to a program producing messages and sending them to a RabbitMQ queue/exchange.

##### Consumer
- Consumer refers to a program receiving messages from RabbitMQ.

---
#### Queue
- A queue is where messages flowing through RabbitMQ can be stored, functioning similar to a **post box**.
- It can be seen as a large message buffer.
- A queue's message storing limit is only bound by the host's memory and disk limit.

---
#### Exchange
- An exchange recieves message from producers and pushes them to queues.
- An exchange can be set to forward messages to zero or more queues depending on the routing parameters and exchange configurations.
- If we relate this to the post office analogy, where queues are post boxes, then exchanges are the **postmen** that deliver messages to the post boxes.

---
#### Message Acknowledgements
- If a connection fails between Rabbitmq server and a client (producer or consumer), messages in transit may not have all been processed correctly and need to be re-sent.
- To detect such instances, message acknowledgements are used. If the sender does not receive a positive acknowledgement (ack) before the connection fails, it will re-queue the message.
- It is therefore good practices to acknowledge a message after any required operations on the message are performed. 
- There are different configurations of message acknowledgements
  1. by enabling automatic acknowledgement mode, the message will be considered acknowledged as soon as it is sent - acting in a **"fire and forget"** mode. This will reduce the safety check that a message has been received successfully but allows for more throughput.
  2. Consumers can also send a negative acknowledgement for a message, and instruct the message broker to re-queue them. Both positive and negative acknowledgements can be sent in bulk by setting `multiple` flag of the acknowledgement command to `true`.

##### Protocol methods for Acknowledgements:
1. basic.ack : used for positive acknowledgements
2. basic.nack : used for negative acknowledgements
3. basic.reject : also used for negative acknowledgements but is only capable of rejecting one message at a time

---