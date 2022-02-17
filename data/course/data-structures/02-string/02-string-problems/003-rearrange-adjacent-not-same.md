---
title: 'Rearrange characters so that adjacent not same'
type: 'problem'
topic: 'String Problems'
section: 'String'
course: 'String'
tags:
- binary tree
- tree
---
#### Problem
Given a string with repeated characters, the task is to rearrange characters in a string so that no two adjacent characters are same.

##### Method 1:
The idea is to put the highest frequency character first (a greedy approach). We use a priority queue (Or Binary Max Heap) and put all characters and ordered by their frequencies (highest frequency character at root). We one by one take the highest frequency character from the heap and add it to result. After we add, we decrease the frequency of the character and we temporarily move this character out of priority queue so that it is not picked next time.


```
1. Build a Priority_queue or max_heap, pq that stores characters and their frequencies.
…… Priority_queue or max_heap is built on the bases of the frequency of character.
2. Create a temporary Key that will be used as the previously visited element (the previous element in the resultant string. Initialize it { char = ‘#’ , freq = ‘-1’ }
3. While pq is not empty.
….. Pop an element and add it to the result.
….. Decrease frequency of the popped element by ‘1’
….. Push the previous element back into the priority_queue if it’s frequency > ‘0’
….. Make the current element as the previous element for the next iteration.
4. If the length of the resultant string and original string is not equal, print “not possible”. Else print result.
```


---