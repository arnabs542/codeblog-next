---
title: 'Consistent-Hash Exchange Plugin'
type: 'topic'
section: 'Plugins'
course: 'Rabbitmq'
tags:
- python
---
#### Consistent-Hash Exchange Plugin
- It allows systems to scale better without introducing possible race-conditions.
- It adds a new exchange type: the **x-consistent-hash** exchange
- Consistent-Hash Exchange ensures that messages sent to an exchange are consistently and equally distributed to queues bound to the exchange depending on the messages' routing key.
- This means that if 2 messages have the same routing key, the Consistent-Hash Exchange will route them to the same queue unless queue bindings to the exhange have changed.
- If the number of queues bound to the exchange changes, the Consistent-Hash Exchange will distribute routing keys evenly amongst the remaining number of queues bound to it.

##### Configuration
- By default, Consistent-Hash Exchange performs hashing on the **message routing key**, but hashing can also be done on:
  1. **Message Properties:** By declaring the exchange with the argument "hash property" and the argument value as either `message_id`, `correlation_id`, or `timestamp`.
  2. **Message Headers:** By declaring the exchange with the argument "hash-header" and the argument value as the header name to be used for hashing.
- The ratio of routing keys distributed between queues can be controlled by changing the binding key value of the queue to the exchange.
- Therefore, if you would like queue A to receive twice as many routing keys routed to it than are routed to queue B, then you bind the queue A with a binding key of twice the number.

##### Enabling the plugin
- Run command in rabbitmq local installation directory
  - `rabbitmq-plugins enable rabbitmq_consistent_hash_exchange`

---