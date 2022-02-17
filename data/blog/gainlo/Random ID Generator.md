---
title: Random ID Generator
date: 2020-05-25
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
In case you don’t know what an ID generator is, let me briefly explain this here. Suppose you are building a social network product like Twitter, you need to store each user in your database with a user ID, which is unique and used to identify each user in the system.

In some systems, you can just keep incrementing the ID from 1, 2, 3 … N. In other systems, we may need to generate the ID as a random string. Usually, there are few requirements for ID generators:
1. **They cannot be arbitrarily long**. Let’s say we keep it within 64 bits.
2. **ID is incremented by date**. This gives the system a lot of flexibility, e.g. you can sort users by ID, which is same as ordering by register date.

There can be some other requirements, especially when you want to scale the system to support millions or even billions of users.

#### Single machine
It’s good to start with something simple and keep optimizing it later, which is more true when the question is broad. If I got this question in a system design interview, most likely I’ll start with a single machine design. Not only is this easy to design, but it’s good enough for most of the cases.

In the simplest case, we can just keep incrementing ID from 1, 2, 3 … N, which in fact is one of the most popular ways to generate ID in many real life projects. If user A’s ID is larger than user B, then we know that A registered later.

However, this approach is hard to scale. Let’s say after one year there are too many users everyday that we have to scale the database to multiple instances. You’ll see that this approach won’t work because it may generate duplicate IDs for different users.

#### 3rd party service
To scale the ID generator to multiple machines, one natural solution is to keep a single separate server that is only responsible for ID generation. More specifically, when a user registers to the product, for whichever database that handles this request, it’ll connect to the 3rd party server to ask for a random ID. Since all the ID generation is handled in a single server, there’s no risk of generating duplicate IDs.

However, the downside of this solution is obvious. Suppose the product is so popular that there can be a huge number of people registering within a single second, the 3rd party server will soon become the bottleneck. The server may either block registration or just crash.

#### Multiple machine solution
Thus, we have to scale the ID generation to multiple servers. If we want to have no communication between ID generation servers, each server itself should be able to generate unique IDs that are incremented by time. It should be quite natural to think about using timestamp to generate IDs.

Since within a single timestamp there can also be multiple users, we could solve this with two approaches.
1. We assign a server ID to each ID generation server and the final ID is a combination of timestamp and the server ID.
2. We can also allow multiple requests within a single timestamp on a single server. We can keep a counter on each server, which indicates how many IDs have been generated in the current timestamp. So the final ID is a combination of timestamp, serverID and the counter.

As mentioned previously, the ID cannot be arbitrarily long so that the counter may end up with only 8 bits for instance. In this case, the server can handle 256 requests within a single timestamp at most. If it frequently exceeds this limit, we need to add more instances.

In fact, this solution is what Twitter does to solve the problem. They open sourced their ID generator called **Snowflake**.

#### Clock synchronization
We ignored a crucial problem in the above analysis. In fact, there’s a hidden assumption that all ID generation servers have the same clock to generate the timestamp, which might not be true in distributed systems.

In reality, system clocks can drastically skew in distributed systems, which can cause our ID generators provide duplicate IDs or IDs with incorrect order. Clock synchronization is out of the scope of this discussion, however, it’s important for you to know such issue in this system. There are quite a few ways to solve this issue, check NTP if you want to know more about it.

---