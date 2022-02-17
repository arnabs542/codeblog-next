---
title: Horizontal vs. Vertical Scaling
type: blog
date: 2020-05-22
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
When the number of requests increases to a system to a point when it is not able to handle them, it crashes.
To avoid this, we have 2 solutions:
1. Buy bigger machine - Vertical Scaling
2. Buy more machines - Horizontal Scaling

#### Scalability
The ability to handle more requests by buying more machines or buying bigger machines is called **Scalability**.

|Horizontal Scaling|Vertical Scaling|
|-|-|
|Load Balancer required| LB not required|
|Resilient|Single point of failure|
|Network calls(RPC)|Interprocess communication|
|Data inconsistency|Data consistent|
|Scales well |Hardware limitation|


---