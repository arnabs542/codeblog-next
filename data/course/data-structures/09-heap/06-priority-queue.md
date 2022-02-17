---
title: 'Priority Queue'
type: 'topic'
section: 'Heap'
course: 'Data Structures'
tags:
- js
- array
---
#### Priority Queue
- Priority Queue is a data structure that supports the operations `insert` and `deleteMin`(removes min element) or `deleteMax`(removes max element).
- These operations are equivalent to `EnQueue` and `DeQueue` of a queue. The difference is that, in Priority Queues, the order in which the elements enter the queue may not be same in which they are processed.

##### Types
1. **Ascending Priority Queue:**
    - Item with smallest key has highest priority
    - Always smallest element is deleted

2. **Descending Priority Queue**
    - Item with largest key has highest priority
    - Always largest element is deleted

---
#### Implementations

|Implementations            |Insertion    |DeleteMax   |FindMin   |
|---------------------------|-------------|------------|----------|
|Unordered Array            |1            |n            |n          |
|Unordered List             |1            |n            |n          |
|Ordered Array              |n            |1            |1          |
|Ordered List               |n            |1            |1          |
|Binary Search Tree         |logn (average)|logn (average)|logn (average)|
|Balanced Binary Search Tree|logn         | logn           | logn         |
|Binary Heap                |logn         |  logn          | 1         |


---

