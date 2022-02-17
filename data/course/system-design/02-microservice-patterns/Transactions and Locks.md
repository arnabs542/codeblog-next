---
title: Transactions and Locks
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
#### Transactions and Locks
- Transaction is a sequence of commands incorporated into one logical unit.
- If 2 users are trying to purchase an item and only 1 item is in stock. In this case, that particular row will be locked until 1st transaction completes.

###### Transfer Money
Transfer money from account A (100 $) to account B (0 $). We have to do all steps in one transaction by locking the row.

Steps:
- withdraw(10, A)
- deposit(10, B)
- deduct_commision(1)

A -> 89 $, B -> 10 $

If withdraw() is success and deposit() fails, then transaction will roll back and 10$ will be added back in account A. If all 3 steps are success then it commits in the database and releases lock.

#### Write-ahead logging (WAL)
- write-ahead logging (WAL) is a family of techniques for providing atomicity and durability (two of the ACID properties) in database systems. The changes are first recorded in the log, which must be written to stable storage, before the changes are written to the database.
- In a system using WAL, all modifications are written to a log before they are applied. Usually both redo and undo information is stored in the log.

---
#### Distributed Transactions
**How to implement transactions that span services?**

Different ways to handle it:
1. multiple services using same database.
2. multiple services using replica of same database. Consistency will go for a toss.
3. 2 phase commit
4. 3 phase commit
5. SAGA

##### 2 phase commit
Commits have 2 steps:

**prepare**
- Coordinator service will create transaction id. It will call prepare transaction in customer wallet service and order service. It will **lock** corresponding rows if both response is success.
- If any of the prepare transaction fails, transaction will rolled back.

**commit**
- Coordinator service asks customer wallet service and order service to start commit. Then 2 calls will be made - "commit wallet" and "commit order".

Here, concurrent requests have to wait until the locks are released. This will bring latency and affect performance. This model is very consistent, but also has single point of failure (coordinator service).

It need to have timeout mechanism in case a service doesn't respond.

**Problems in 2 phase commit**
1. What happens if coordinator fails?
2. What happens if microservice fails to reply during phase 1, coordinator will not know the state of failed microservice.
3. What if the microservice fails during commit phase?

Hence, 2 phase commit is not the recommended solution.

##### 3 phase commit
- can commit: Collects votes
- pre commit: Commits authorized
- do commit: Finalize commits

##### SAGA
- A saga is a sequence of local transactions. Each local transaction updates the database and publishes a message or event to trigger the next local transaction in the saga.
- If a local transaction fails because it violates a business rule then the saga executes a series of compensating transactions that undo the changes that were made by the preceding local transactions.
- It works asynchronously, unlike 2 phase or 3 phase commit.

<img src="https://chrisrichardson.net/i/sagas/From_2PC_To_Saga.png"></img>

---
#### Distributed Locks

**Lock:** Locks are used to lock critical sections of code from threads of the same process usually.

**Mutex:** Mutex is used to lock critical section, or an object, or a file from multiple processes or threads .

**Semaphore:** It is used to allocate a particular group accessors or threads that can access a critical section.

In distributed systems, we have multiple instances of services and databases, so syncing data in all database instances is a challenge.

###### Properties of Distributed Locks
- Mutual exclusion
- Deadlock free
- Fault tolerance

We can use a coordination service (like zookeeper) to generate unique_id (epoch time).

---