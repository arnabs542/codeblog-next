---
title: 'Find a peak element'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
Find a peak element in a array.

_An array element is a peak if it is NOT smaller than its neighbours. For corner elements, we need to consider only one neighbour._

---
##### Method 1: Simple Approach
```
1. If in the array, the first element is greater than the second or the last element is greater than the second last, print the respective element and terminate the program.
2. Else traverse the array from the second index to the second last index
3. If for an element array[i], it is greater than both its neighbours, i.e., array[i] > array[i-1] and array[i] 
```
> Time Complexity: O(n), Space Complexity: O(1)
---
##### Method 2: Divide and Conquer 
_The idea is based on the technique of Binary Search to check if the middle element is the peak element or not. If the middle element is not the peak element, then check if the element on the right side is greater than the middle element then there is always a peak element on the right side. If the element on the left side is greater than the middle element then there is always a peak element on the left side. Form a recursion and the peak element can be found in log n time._
```
1. Create two variables, l and r, initilize l = 0 and r = n-1
2. Iterate the steps below till l <= r, lowerbound is less than the upperbound
3. Check if the mid value or index mid = (l+r)/2, is the peak element or not, if yes then print the element and terminate.
4. Else if the element on the left side of the middle element is greater then check for peak element on the left side, i.e. update r = mid – 1
5. Else if the element on the right side of the middle element is greater then check for peak element on the right side, i.e. update l = mid + 1
```
> Time Complexity: O(Logn), Space Complexity: O(1)
---
