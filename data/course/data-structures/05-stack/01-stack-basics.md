---
title: 'Stack Basics'
type: 'topic'
section: 'Stack'
course: 'Data Structures'
tags:
- js
- array
---
## Stack
- Stack is a container of objects that are inserted and removed according to the **last-in first-out (LIFO)** principle. 

#### Applications of Stack
There are many computer algorithms like Depth First Search and Expression Evaluation Algorithm, etc., which are dependent on stacks to run perfectly. Stacks are used for the below actions:
1. To backtrack to the previous task/state, e.g., in a recursive code
2. To store a partially completed task, e.g., when you are exploring two different paths on a Graph from a point while calculating the smallest path to the target.

---
## Operations
|Function | Description | Time Complexity |
|-|-|-|
|`push` | Inserts an element at the top | O(n) |
|`pop` | Removes an element from the top and returns it | O(n) |
|`isFull` | Returns true if the stack is full and false otherwise | O(n) |
|`isEmpty` | Returns true if the stack is empty and false otherwise | O(n) |
|`top` | Returns the element at the top (i.e., the one added most recently) | O(n) |

---
## How do stacks work?
- When you insert an element into the stack, the variable that stores the position of the top element would be pointing to the number below it. So, you will have to update its value every time you insert a new element into the stack.
- Similarly, the value of the top variable will also change when you delete an element from the stack. It’s a good practice to update the top variable first, and then perform the operation; otherwise, the variable would be pointing to nothing or a wrong value in case of insertion.


---