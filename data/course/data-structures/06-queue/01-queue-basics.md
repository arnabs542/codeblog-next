---
title: 'Queue Basics'
type: 'topic'
section: 'Queue'
course: 'Data Structures'
tags:
- js
- array
---
## Queue
- Queue is a container of objects (a linear collection) that are inserted and removed according to the first-in first-out (FIFO) principle.

#### Applications of Queue
- Most operating systems also perform operations based on a Priority Queue — a kind of queue that allows operating systems to switch between appropriate processes.
- Implementing a cache also heavily relies on queues.
- We generally use queues in the following situations:
  1. We want to prioritize something over another
  2. A resource is shared between multiple devices (e.g., Web Servers and Control Units)

---
## Operations
|Function | Description | Time Complexity |
|-|-|-|
| `enqueue` | Inserts element to the end of the queue | O() |
| `dequeue` | Removes an element from the start of the queue | O() |
| `top` | Returns the first element of the queue | O() |
| `isEmpty` | Checks if the queue is empty | O() |
| `isFull` | Checks if the queue is full | O() |

---
## How do Queues work?
- The entire functionality of Queue depends on the enqueue and dequeue methods; the rest are just helper methods to produce simple, understandable code.

---
## Types of Queues
There are three common types of queues which cover a wide range of problems:
1. Linear Queue
2. Circular Queue
3. Priority Queue

#### Circular Queue
- Circular queues are circular in the structure; this means that both ends are connected to form a circle.
- Initially, the front and rear parts of the queue point to the same location and eventually move apart as more elements are inserted into the queue.
- Circular queues are generally used in the following ways:
  1. Simulation of objects
  2. Event handling (do something when a particular event occurs)

#### Priority Queue
- In Priority Queues, elements are sorted in a specific order. Based on that order, the most prioritized object appears at the front of the queue, the least prioritized object appears at the end, and so on.
- These queues are widely used in an operating system to determine which programs should be given more priority.

---

