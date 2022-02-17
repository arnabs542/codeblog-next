---
title: 'Exchanges'
type: 'topic'
section: 'Basics'
course: 'Rabbitmq'
tags:
- python
---
#### Exchanges
- An Exchange receives messages from producers and pushes them to queues.
- An exchange can be set to forward messages to zero or more queues depending on the routing parameters and exchange configurations.
- Exchange types:
  1. Fanout
  2. Direct
  3. Topic
  4. Headers

> **Routing Key**

##### 1. Fanout
- A **Fanout exchange** routes a message to all queues bound to it.
- It ignores any **routing key** provided with the message.

##### 2. Direct
- A **Direct exchange** routes a message with a particular routing key to queues bound to it with that exact routing key.

##### 3. Topic
- A **Topic Exchange** routes a message with a particular routing key to queues whose routing key matches all, or a portion of a routing key.
- Messages are published with routing keys containing one or more words separated by a dot. eg, multi.word.test
- Queues that bind to a topic exchange supply a matching routing key pattern for the server to use when routing the message. These patterns may contain an asterisk(*) to match any word in a specific position of the routing key, or a hash(#) to match zero or more words.
- Eg, a message published with routing key "multi.word.test"
  - will match queues with routing key "multi.#", "*.word.*", "#"
  - but it will not match queues with routing key "multi.*", "single.#", or "multi.foo.test"

##### 4. Headers
- A **Header exchange** routes messages based upon a matching of the message's headers to the expected headers specified by the binding queue.
- More than one header criteria can be specified as a filter by the binding queue, in which case the binding queue can specify if the message headers need to contain "any" or "all" of the header criteria.
- Message Headers can be matched in any order.

##### Difference between Header exchange and Topic exchange
1. Topic exchange matches on the routing key
2. Header exchange matches on the message header

---