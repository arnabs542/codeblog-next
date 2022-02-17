---
title: 'Find k Largest Elements in Array'
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
Implement the findKlargest() function to take an array as input and find the “k” largest elements in the array using Max Heap. 

#### Method 1:
We first create a max-heap out of the given array by inserting the list elements into an empty heap. Then we then call removeMax()on the heap kk times save the output in a list and return it.

> Time Compexity: O(klogn)




---

