---
title: 'Activity Selection problem'
type: 'problem'
topic: 'Problems'
section: 'Greedy Algorithm'
course: 'Algorithms'
tags:
- algorithms
---
#### Problem
You are given n activities with their start and finish times. Select the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.

---
##### Method 1:
The greedy choice is to always pick the next activity whose finish time is least among the remaining activities and the start time is more than or equal to the finish time of previously selected activity.We can sort the activities according to their finishing time so that we always consider the next activity as minimum finishing time activity.

1. Sort the activities according to their finishing time
2. Select the first activity from the sorted array and print it.
3. Do following for remaining activities in the sorted array.
    - If the start time of this activity is greater than or equal to the finish time of previously selected activity then select this activity and print it.


---
> Time Complexity: O(n)

---