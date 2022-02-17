---
title: 'Introduction'
type: 'topic'
section: 'Basics'
course: 'Data Structures'
tags:
- js
- array
---
####Data Structures
- Data structure is a way of storing and organizing data (information) so that it can be stored and retrieved efficiently.
- eg, Highway, where each vehicle represents a chunk of information. The vehicle combined with the driver and a license plate creates a unique piece of data that exists on the highway's data structure. Too many vehicles or less number of lanes will cause traffic.

##### Types of Data Structures
1. **Linear:** Linked List, Stack, Queue
2. **Non-linear:** Tree, Graph

##### Abstract Data Types (ADTs)
- User-defined data types are defined along with their operations.
- We generally combine data structures along with their operations and are called **Abstract Data Types (ADTs)**
- An ADT consists of 2 parts:
  1. Declaration of data
  2. Declaration of operations

##### Data Structures Characteristics
1. Data Structure is not defined by the data, its just a place to keep and organize the data.
2. How data can be inserted and removed from the Data structure.
3. How all of the data inside of the structure relates to all of the other data inside of that structure.
4. How well the structure performs when doing certain operations like inserts, sorts, etc.

---
#### Big O Notation
- **"O"** stands for order of the funciton or how the complexity of the function grows as the number of elements used in the function grow - O(n) or (log n), where **"n"** is number of elements in data structure.

#####Common Big O Algorithms
| Name           | Big O Notation | Example                                                      |
| -------------- |:---------------|: ------------------------------------------------------------|
| **Constant**       | O(1)           | `return true;`                                               |
| **Logarithmic**    | O(log n)       | Binary search                                                |
| **Linear**         | O(n)           | `for` or `while` loop                                        |
| **Quadratic**      | O(n^2)         | Loop within a loop                                           |
| **Exponential**    | O(c^2)         | Recursive calls over `n` and looping over `c` in the function|
| **Factorial**      | O(n!)          | Looping over `n` and recursive call in the loop to `n-1`     |

#####Data Structure Performance
| Name                | Access     | Search    |  Insert    | Delete    |
| --------------      |------------|-----------|------------|-----------|
| **Stack**           | O(n)       | O(n)      | O(1)       | O(1)      |
| **Queue**           | O(n)       | O(n)      | O(1)       | O(1)      |
| **Linked List**     | O(n)       | O(n)      | O(1)       | O(1)      |
| **Hash Table**      | O(1)       | O(1)      | O(1)       | O(1)      |
| **Binary Table**    | O(log n)   | O(log n)  | O(log n)   | O(log n)  |

