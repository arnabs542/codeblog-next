---
title: LRU Cache Implementation
type: topic
section: Misc
course: Data Structures
tags:
---
#### How to implement LRU caching scheme? What data structures should be used? 
We are given total possible page numbers that can be referred. We are also given cache (or memory) size (Number of page frames that cache can hold at a time). The LRU caching scheme is to remove the least recently used frame when the cache is full and a new page is referenced which is not there in cache


#### Method 1: Brute-force


#### Method 2: Using Double linked list an HashMap
The key to solve this problem is using a double linked list which enables us to quickly move nodes.
The LRU cache is a hash map of keys and double linked nodes. The hash map makes the time of get() to be O(1). The list of double linked nodes make the nodes adding/removal operations O(1).

#### Method 3: Using LinkedHashMap in Java





---