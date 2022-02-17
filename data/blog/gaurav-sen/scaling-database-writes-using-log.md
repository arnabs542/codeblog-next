---
title: How databases scale "writes", The power of the log
date: 2020-05-20
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
#### Introduction
Client sends data to server and server writes to database, as it needs to maintain some. Traditional databases uses B+ Tree data structure to speed up queries. It is like a Binary Search Tree but can have multiple paths instead of just 2.

##### Why B+ tree is preferred?
Because it gives good insertion and search times (Log(n)).
When we INSERT or SELECT SQL commands, it maps to an insertion or a search operation in the B+ tree and underlying data structure is manipulated. Each of these operations an acknowledgement from the database after successful execution

##### how do you scale this?
To scale out database, we need to reduce the unnecessary exchange of data which is acknowledgements and headers, and also we need to reduce the I/O calls which will help us free up some resources and reduce the request response times. If we can condense all of this data queries into one block and send it in one shot to the database and get one acknowledgement.

##### Ideas
1. Condense data queries into single query
2. Use Linked-list (Log) data structure

##### Problem with this approach
- Read takes O(n) time in linked list, so we need to optiimze it. We can sort chunks data and before inserting
- We can use **bloom filter** to optimize read operation.

---