---
title: 'Heap Basics'
type: 'topic'
section: 'Heap'
course: 'Data Structures'
tags:
- js
- array
---
## What is a Heap?
- A Heap is a tree with some special properties.

#### Heap property:
1. The value of a node must be >= (or <=) to the value of its children.
2. All leaves should be at `h` or `h-1` levels, where h is height of tree.
3. Heap should form a complete binary tree.

#### Types of Heaps
1. **Min Heap**
    - The value of a node must be less than or equal to the values of its children.
2. **Max Heap**
    - The value of a node must be greater than or equal to the values of its children.

> **Note:**
> 1. There is also a common **misconception** that the elements of a Heap are sorted. They are not at all sorted; in fact, the only key feature of a Heap is that the largest or smallest element is always placed at the top (parent node) depending on what kind of Heap we are using.
> 2. Moreover, this Data Structure Heap has nothing to do with the dynamic memory allocations on a Heap in various languages like C/C++ and Pascal.

#### Applications of Heaps
1. **Order statistics:** Heaps are primarily used for efficiently finding the smallest or largest element in an array.
2. **Priority Queues:** Priority queues can be efficiently implemented using Binary Heap because it supports `insert()`, `delete()`, `extractmax()`, and `decreaseKey()` operations in `O(logn)` time.
3. **Sorting:** HeapSort uses the Heap data structure to sort values in exactly the same way as TreeSort used a Binary Search Tree. Each `insert()` and `delete()` operation is `O(logN)`. At the very worst - the heap does not always have all N values in it, so the complexity is certainly no greater than `O(NlogN)`. This is better than the worst-case for TreeSort, which–because you might build a degenerate Binary Search Tree-- is `O(N*N)`.

---
## Binary Heap
- A Binary Heap is a complete Binary Tree which satisfies the Heap ordering property.
- The new elements are inserted from left to right. When you add a new node, you must make sure that the left child of that intermediate parent node is filled. If it’s not, add a node at the left and insert the new element there.
- 

---
## Heap Sort
- Heap sort algorithm, inserts all elements from an unsorted array into a heap, then remove them from the root of a heap until the heap is empty.
- Heap sort can be done in-place with the array to be sorted.
- Time complexity: O(nLogn)

---