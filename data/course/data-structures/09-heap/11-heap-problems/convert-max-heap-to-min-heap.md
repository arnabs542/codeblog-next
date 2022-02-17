---
title: 'Convert Max-Heap to Min-Heap'
type: 'problem'
topic: 'Heap Problems'
section: 'Heap'
course: 'Data Structures'
problemlist: true
tags:
- js
- array
---
#### Problem:
Implement the convertMax() function to convert a Binary Min Heap into a Binary Max Heap.

#### Method 1:
Remember that we can consider the given maxHeap to be a regular list of elements and reorder it so that it represents a min heap accurately. We do exactly that in this solution. The convertMax() function restores the heap property on all the nodes from the lowest parent node by calling the minHeapify() function on each.

> Time Complexity: O(n)



---

