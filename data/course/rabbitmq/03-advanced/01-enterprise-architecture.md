---
title: Enterprise Architecture
type: 'topic'
section: 'Advanced'
course: 'Rabbitmq'
tags:
- python
---
#### How should RabbitMQ be used in Enterprise Architecture?
- Asynchronous processing.
- Work queues -> distribution of work between multiple workers.
- Publishing data on to be picked up by multiple consumers subscribed to an exchange.
- Handling remote procedure calls (RPC) in a scalable way.

###### Real life scenario
A system where a user uploads a file to a website, the website scans the file for viruses and returns a message to the user indicating if the file was clean. An email will be sent to another user with the compressed version of the file, and can be done asynchronously.

There are 2 processes:
1. Scanning file for viruses (Synchronous)
2. compressing file and sending it on email (Asynchronous)










---