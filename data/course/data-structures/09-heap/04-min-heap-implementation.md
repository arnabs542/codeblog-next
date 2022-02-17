---
title: 'Min Heap Implementation'
type: 'topic'
section: 'Heap'
course: 'Data Structures'
tags:
- js
- array
---
## Implementing a Min-Heap
Heaps can be implemented using arrays. Initially, elements are placed in nodes in the same order as they appear in the array. Then a function is called over the whole Heap in a bottom-up manner, which “Min Heapifies” this Heap so that the Heap property is satisfied on all nodes.

When we say bottom-up, we mean the function starts from the last parent node present in the n/2th position of the array, and checks if the values at the children nodes are greater than the parent node. If yes, then swap the values; if no, then move to the next parent node.

#### Insertion in Min-Heap
If you want to insert a new element in the Min Heap, you will have to follow a list of steps to make sure the Heap property still holds after adding the element:
1. Create a new child node at the end of the heap
1. Place the new key at that node
1. Compare the value with its parent node key
1. If the key is smaller than the key at the parent node, swap values
1. If both keys at the children nodes are smaller than the parent node key, then pick the smallest one and see if the Heap property is satisfied.
1. Repeat until you reach the root node

#### Removing an Element from a Min-Heap
Deletion is performed in the same way as in Max Heap. We will take the case of deleting the smallest element here as we are discussing Min Heaps.
Steps to follow:
1. Delete the root node
1. Move the key of the last child node (at the last level) to the root
1. Now compare the key with its children
1. If the key is greater than the key at any of the children nodes, swap values
1. If both keys at children nodes are smaller than the parent node key, pick the smallest one and see if the Heap property is satisfied.
1. Repeat until you reach the last level


#### Explanation
- **BuildHeap():** It takes the array and starts from the last child node (at the last level), then passes it to MinHeapify for comparison.
- **MinHeapify():** This functions takes the node value and compares it with the key at the parent node, and swaps them if the child node < the parent node.

The while loop makes sure that the nodes keep swapping until we reach the last index and Heap property is satisfied throughout the Heap!

#### Time Complexity
The overall time complexity of building the Heap in a Min Heap is the same in as a Max Heap: **O(n)**.

---