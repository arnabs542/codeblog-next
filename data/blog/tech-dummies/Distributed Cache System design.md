---
title: Distributed Cache System design
type: blog
date: 2020-06-11
authors: ['Ashish']
image: ../cover.jpg
tags:
- node
---
#### Distributed Cache

###### Caching best practices
- Validity
- High hit rate
- Cache miss
- TTL

###### Features and Estimation
- Scalability: 1 million queries per second
- Latency: 1 ms
- Eviction policy: LRU (Least recently used)
- Availability: 100%

###### Cache access patterns
Every system has a cache and a database. 
1. Write through
    - Write will happen in cache and database both and then acknowledgement is sent.
2. Write around
    - Write happens only in DB and acknowledgement is sent. After that data will be synced in cache. Read happens directly from cache.
3. Write back
    - Write happens in cache and acknowledgement is sent. After that data will be synced to DB

###### Implement cache
We can use Hash Table to implement cache.

###### Cache Eviction Policy
1. LRU: Using Doubly Linked List and HashMap
2. MRU
3. LFU

---
#### Internal of a Cache system
get/put -> event queue -> event loop -> thread pool -> Memory RAM

###### Fault Tolerant / Persistent
- Regular interval snapshot
- Log reconstruction

###### Availability
- Multiple nodes
- Replica of cache server.
- Master slave configuration

---