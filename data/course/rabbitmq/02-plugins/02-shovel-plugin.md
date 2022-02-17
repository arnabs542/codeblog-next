---
title: Shovel Plugin
type: 'topic'
section: 'Plugins'
course: 'Rabbitmq'
tags:
- python
---
#### Shovel Plugin
- A shovel is used to reliably and continually move messages from a source (typically a queue) in one cluster to a destination (an exchange, topic, etc) in another cluster.
- The `rabbitmq_shovel` plugin allows you to configure a number of shovels (transfer workers), which do just that and run as part of a RabbitMQ cluster.

###### Why Use Shovel
1. Loose Coupling
2. WAN-friendly
3. Cross-protocol and Product Message Transfers
4. Flexibility

Steps:
- `rabbitmq-plugins enable rabbitmq_shovel`
- `rabbitmq-plugins enable rabbitmq_shovel_management`






---