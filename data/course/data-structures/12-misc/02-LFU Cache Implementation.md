---
title: LFU Cache Implementation
type: topic
section: Misc
course: Data Structures
tags:
---
#### How to implement LFU caching scheme? What data structures should be used? 
Least Frequently Used (LFU) is a caching algorithm in which the least frequently used cache block is removed whenever the cache is overflowed. In LFU we check the old page as well as the frequency of that page and if the frequency of the page is larger than the old page we cannot remove it and if all the old pages are having same frequency then take last i.e FIFO method for that and remove that page.

#### Method 1: Using MinHeap
Min-heap data structure is a good option to implement this algorithm, as it handles insertion, deletion, and update in logarithmic time complexity. A tie can be resolved by removing the least recently used cache block. The following two containers have been used to solve the problem:
- A vector of integer pairs has been used to represent the cache, where each pair consists of the block number and the number of times it has been used. The vector is ordered in the form of a min-heap, which allows us to access the least frequently used block in constant time.
- A hashmap has been used to store the indices of the cache blocks which allows searching in constant time.


#### Method 2: 


---