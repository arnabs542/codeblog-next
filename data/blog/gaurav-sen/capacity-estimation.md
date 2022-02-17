---
title: Capacity Estimation - How much data does YouTube store daily?
date: 2020-05-19
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
##### Assumptions
- Number of users = 1 billion
- Users who uploads videos = 0.1%
- Average size of each video = 10 mins
- Size of video = 200 mb/hr
- Number of copies for fault tolerance and redundancy = 3

**Total size = 90TB (approx)**

Video are in multiple sizes
- 480px = 0.5
- 360px = 0.5
- 240px = 0.5
- 120px = 0.5

**Total = 2PB (approx)**

---