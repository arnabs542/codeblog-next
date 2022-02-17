---
title: 'Linear & Non-Linear Data Structures'
type: 'topic'
section: 'Basics'
course: 'Data Structures'
tags:
- js
- array
---
## Linear Data Structures
- In linear data structures, each element is connected to either one (the next element) or two (the next and previous) more elements. 
- Traversal in these structures is linear, meaning that insertion, deletion, and search work in O(n).

#### Examples
2. Arrays
2. Linked Lists
3. Stacks
4. Queues

---
## Non-Linear Data Structures
- In a non-linear data structure, each element can be connected to several other data elements.
- Traversal is not linear; hence, search, insertion, and deletion can work in O(log n) and even O(1) time.

#### Examples
1. Trees
2. Graphs
3. Hash Tables

---
## Time and Space Complexity Cheat Table
In the table, n is the total number of elements stored in the structure.



| Data Structure | Insert | Delete | Search | Space complexity |
|-|-|-|-|-|
| Array	| O(n) | O(n) | O(n) | O(n) |
| Single linked list | O(1) (insert at head) | O(1) (delete head) | O(n) | O(n) |
| Doubly linked list | O(1) (insert at head) | O(1) (delete head) | O(n) | O(n) |
| Doubly linked list (with tail pointer) | O(1) (insert at head or tail) | O(1) (delete head or tail) | O(n) | O(n) |
| Stack | O(1) (push) | O(1) (pop) | O(n) | O(n) |
| Queue | O(1) (enqueue) | O(1) (dequeue) | O(n) | O(n) |
| Binary heap | O(lg n) | O(1) (removeMin()) | O(n) | O(n) |
| Binary tree | O(n) | O(n) | O(n) | O(n) |
| Binary search tree | O(n) | O(n) | O(n) | O(n) |
| Red-Black / AVL / 2-3 Tree | O(lg n) | O(lg n) | O(lg n) | O(n) |
| Hash table | O(n): worst case O(1): amortized | O(n): worst case O(1): amortized | O(n): worst case O(1):  |amortized | O(n): worst case O(1): amortized
| Trie (size of alphabet: d, length of longest word: n) | O(n) | O(n) | O(n) | O(d^n) |






---