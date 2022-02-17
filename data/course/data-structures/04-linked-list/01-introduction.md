---
title: 'Introduction'
type: 'topic'
topic: 'Linked List Basics'
section: '04 Linked List'
course: 'Data Structures'
tags:
- js
- array
---
## Linked List
- A linked list is formed by nodes that are linked together like a chain. Each node holds data, along with a pointer to the next node in the list.

#### Applications
1. Implementing HashMaps, File System and Adjacency Lists
2. Dynamic memory allocation: We use linked lists of free blocks
3. Performing arithmetic operations on long integers
4. Maintaining a directory of names

---
### Array vs. Linked List
1. **Memory Allocation:** Arrays instantiate a whole block of memory, e.g., array[1000] gets space to store 1000 elements at the start even if it doesn’t contain any element yet. On the other hand, a linked list only instantiates the portion of memory it uses.

2. **Insertion and Deletion:** In a linked list, insertion and deletion at head happen in a constant amount of time (O(1)), while arrays take O(n) time to insert or delete a value because you have to shift the array elements left or right after that operation.

3. **Searching:** In an array, it takes constant time to access an index. In a linked list, you have to iterate the list from the start until you find the node with the correct value.

|Operation | Linked List | Array |
|-|-|-|
| Access  | O(n)  | O(1) |
| Insert (at head)  | O(1)  | O(n) |
| Delete (at head)  | O(1)  | O(n) |
| Insert (at tail)	| O(n)	| O(n) |
| Delete (at tail)	| O(n)	| O(n) |

---
## Singly Linked List (SLL)?
- The Singly Linked List (SLL) is the type of linked list where each node has only one pointer that stores the reference to the next value.

#### Operations
|Operations |Descriptions |
|-|-|
|`insertAtEnd(data)` | Inserts an element at the end of the linked list|
|`insertAtHead(data)` | Inserts an element at the start/head of the linked list|
|`insertAfter(data)` | Inserts after specified node value|
|`delete(data)` | Deletes an element from the linked list|
|`deleteAtHead()` | Deletes the first element of the list|
|`deleteAtEnd()` | Deletes the last element of the list|
|`deleteByValue(data)` | Deletes specified node value|
|`Search(data)` | Searches an element from the linked list|
|`isEmpty()` | Returns `True` if the linked list is empty, otherwise returns `False`|

---
## Doubly Linked List (DLL)
- A DLL is bi-directional; this means any particular node stores both the previous and next pointers that point to the previous and next nodes, respectively.

---
## Linked List with Tail
- In this type of list, in addition to the head being the starting of the list, a tail is used as the pointer to the last node of the list. Both SLL and DLL can be implemented using a tail pointer.

---