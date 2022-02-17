---
title: 'Max Heap Implementation'
type: 'topic'
section: 'Heap'
course: 'Data Structures'
tags:
- js
- array
---
## Building a Max-Heap
The following steps illustrate how we build a Max Heap:
1. Create a new node at the end of the heap.
1. Assign a new value to the node.
1. Compare the value of this child node with its parent.
1. If the value of the parent is less than that of the child, then swap them.
1. Repeat steps 3 & 4 until the Heap property holds.

---
## Implementing a Max-Heap
Heaps can be implemented using arrays. Initially, elements are placed in nodes in the same order as they appear in the array. Then a function is called over the whole Heap in a bottom-up manner, which “Max Heapifies” this Heap so that the Heap property is satisfied on all nodes.

When we say bottom-up we mean the function starts from the last parent node present at the n/2th position of the array, and it checks if the values at the child nodes are smaller than the parent nodes.

#### Insertion in Max-Heap
If you want to insert a new element in the Max Heap, you will have to follow a list of steps to make sure the Heap property still holds after adding the element:
1. Create a new child node at the end of the heap.
2. Place the new key at that node.
3. Compare the value with its parent node key.
4. If the key is greater than the key at the parent node, swap values.
5. If both keys at the children nodes are greater than the parent node key, pick the larger one and see if the Heap property is satisfied.
6. Repeat until you reach the root node.

#### Removing an Element from a Max-Heap
Deletion in a Max-Heap is mainly performed when you want to remove the largest element. In most of the cases, the purpose of a Heap is to work as a priority queue.
Steps to follow:
1. Delete the root node
1. Move the key of the last child node at the last level to the root
1. Now compare the key with its children
1. If the key is smaller than the key at any of the child nodes, swap values
1. If both keys at the children nodes are greater than the parent node key, pick the larger one and see if the heap property is satisfied
1. Repeat until you reach the last level


#### Explanation
- **BuildHeap():** It takes the array and starts from the last child node at the last level, then passes it to MaxHeapify for comparison.
- **MaxHeapify():** This function takes the node value and compares it with the key at the parent node, and swaps them if the condition below stands true.

The while loop makes sure that the nodes keep swapping until the Heap property is satisfied, so we basically call MaxHeapify(); at each small level to achieve Max Heap.

#### Time Complexity
The worst-case time complexity of maxHeapify() is O(logn) and in buildMaxHeap(), the heapify function is called O(n) times. Therefore, the overall time complexity of building a Heap seems to be O(n(lgn)). But this is a **very loose upper bound**. A more accurate and **tight upper-bound** for the build heap operation is O(n).

The heapify function has different time complexity at each level of the tree i.e it will be O(1) at the leaf node and O(lg(n)) at the root. So, the worst-case time complexity of heapify at each node is O(h)O(h) where hh is the height of the node in the heap. We can derive this with mathematical summation formula.

**The time complexity of building a heap is O(n)O(n)**

---