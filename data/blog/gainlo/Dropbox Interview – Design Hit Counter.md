---
title: Dropbox Interview – Design Hit Counter
type: blog
date: 2020-06-02
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
**If you are building a website, how do you count the number of visitors for the past 1 minute?**

“Design hit counter” problem has recently been asked by many companies including Dropbox and the question is harder than it seems to be. This week, we’ll uncover all the mysteries of the problem. A couple of topics are discussed including basic data structures design, various optimization, concurrency and distributed counter.

#### What’s special about this problem?
As an interviewer, I have a strong preference for questions that are not hard to solve in the simplest case but the discussion can go deeper and deeper by removing/adding specific conditions. And this question is exactly the case.

Also, the question doesn’t come from nowhere, but has real use cases. For many systems today, we need a system to track not only users numbers, but different types of request numbers in real time.

#### Simple case
Forget about all the hard problems like concurrency and scalability issue, let’s say we only have a single machine with no concurrent requests, how would you get the number of visitors for the past 1 minute?

Apparently, the simplest solution is to store all the visitors with the timestamps in the database. When someone asks for visitor number of the past minute, we just go over the database and do the filtering and counting. A little bit optimization is to order users by timestamp so that we won’t scan the whole table.

The solution is not efficient as the time complexity is O(N) where N is the number of visitors. If the website has a large volume, the function won’t be able to return the number immediately.

#### Let’s optimize
A couple of ways to think about this problem. Since the above approach returns not only visitor numbers, but also visitors for the past minute, which is not needed in the question. And this is something we can optimize. From a different angle, we only need numbers for the past minute instead of any time range, which is another area that we can improve potentially. In a nutshell, by removing unnecessary features, we can optimize our solution.

A straightforward idea is to only keep users from the past minute and as time passes by, we keep updating the list and its length. This allows us to get the number instantly. In essence, we reduce the cost of fetching the numbers, but have to keep updating the list.

We can use a queue or linked list to store only users from the past minute. We keep all the element in order and when the last user (the earliest user) has the time more than a minute, just remove it from the list and update the length.

#### Space optimization
There’s little room to improve the speed as we can return the visitor number in O(1) time. However, storing all the users from the past minute can be costly in terms of space. A simple optimization is to only **keep the user timestamp in the list rather than the user object**, which can save a lot of space especially when the user object is large.

If we want to further reduce the space usage, what approach would you take?

A good way to think about this is that to improve space complexity, what should we sacrifice? Since we still want to keep the time complexity O(1), **one thing we can compromise is accuracy**. If we can’t guarantee to return the most accurate number, can we use less space?

Instead of tracking users from the past minute, we can only track users from the past second. By doing this, we know exactly how many visitors are from the last second. To get visitor numbers for the past minute, we keep a queue/linked list of 60 spots representing the past 60 seconds. Each spot stores the visitor number of that second. So every second, we remove the last (the earliest) spot from the list and add a new one with the visitor number of past second. Visitor number of the past minute is the sum of the 60 spots.

The minute count can be off by the request of the past second. And you can control the trade-off between accuracy and space by adjusting the unit, e.g. you can store users from past 2 seconds and have 30 spots in the list.

#### How about concurrent requests?
In production systems, concurrency is the most common problems people face. If there can be multiple users visiting the site simultaneously, does the previous approach still work?

Part of. Apparently, the basic idea still holds. However, when two requests update the list simultaneously, there can be race conditions. It’s possible that the request that updated the list first may not be included eventually.

The most common solution is to **use a lock to protect the list**. Whenever someone wants to update the list (by either adding new elements or removing the tail), a lock will be placed on the container. After the operation finishes, the list will be unlocked. 

This works pretty well when you don’t have a large volume of requests or performance is not a concern. Placing a lock can be **costly** at some times and when there are too many concurrent requests, **the lock may potentially block the system and becomes the performance bottleneck**.

#### Distribute the counter
When a single machine gets too many traffic and performance becomes an issue, it’s the perfect time to think of distributed solution. Distributed system significantly reduces the burden of a single machine by scaling the system to multiple nodes, but at the same time adding complexity.

Let’s say we distribute visit requests to multiple machines equally. I’d like to emphasize the importance of equal distribution first. If particular machines get much more traffic than the rest machines, the system doesn’t get to its full usage and it’s very important to take this into consideration when designing the system. In our case, we can get a hash of users email and distribute by the hash (it’s not a good idea to use email directly as some letter may appear much more frequent than the others).

To count the number, each machine works independently to count its own users from the past minute. When we request the global number, we just need to add all counters together.

#### Summary
One of the reasons I like this question is that the simplest solution can be a coding question and to solve concurrency and scalability issue, it becomes a system design question. Also, the question itself has a wide usage in production systems.

Again, the solution itself is not the most important thing in the post. What we’re focused on is to illustrate how to analyze the problem. for instance, trade-off is a great concept to be familiar with and when we try to optimize one area, think about what else should be sacrificed. By thinking like this, it opens up a lot of doors for you.


---