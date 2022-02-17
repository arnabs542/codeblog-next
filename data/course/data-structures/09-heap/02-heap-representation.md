---
title: 'Heap Representation'
type: 'topic'
section: 'Heap'
course: 'Data Structures'
tags:
- js
- array
---
#### Represention of Binary Heaps
- Heaps are implemented through Arrays, where each element of the array corresponds to a node in the binary tree and the value inside the node is called a “key”.
- Since heaps are forming complete binary trees, there will not be any wastage of locations.
- The contents of a heap with n nodes are stored in such a way that all the parent nodes occur in the first half of array (n/2), while the leaves are present at the last n/2 positions. So the last parent will be at the n/2th position.

> Heaps can also be implemented using trees with a node class and pointers, but it’s usually easier and more space efficient to use an array.

#### Parent of a Node
- For a node at `i`th location, its parent is at `(i - 1)/2`th location.

#### Children of a Node
- For a node at `i`th location, its children are at `2*(i + 1)`th `2*(i + 2)`th locations.

#### Getting maximum element
- Since, maximum element in max heap is always at root, it will be stored at h → array[0]
- Time complexity: O(n)

#### Heapifying an element
- After inserting an element into an heap, it may not satisfy the heap property. In that case, we need to adjust the locations of the heap to make it heap again. This Process is called **heapifying**.
- In max-heap, to heapify an element, we have to find the maximum of its children and swip it with the current element and continue this process until the heap property is satisfied at every node.
- Since we are moving top to bottom, this process is also called as `percolate down`.
- Time complexity: O(n)

#### Deleting an Element
- To delete an element from heap, we just need to delete the element from root.
- After deleting root element of heap, copy the last element of the heap and move it to root.
- To make it heap again, call `percolate down` method.

#### Inserting an Element
- Increase the heap size
- Keep the new element at the end of the heap
- Heapify the element from bottom to top (`prelocate up`)

#### Destroying Heap

---