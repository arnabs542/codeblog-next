---
title: 'Majority Element in array'
type: 'problem'
topic: 'Array Searching'
section: 'Array'
course: 'Data Structures'
tags:
- array
---
#### Problem
A majority element in an array A[] of size n is an element that appears more than n/2 times (and hence there is at most one such element).

---
##### Method 1: Using 2 Loops
```
1. Have two loops and keep track of the maximum count for all different elements.
2. If maximum count becomes greater than n/2 then break the loops and return the element having maximum count.
3. If the maximum count doesn’t become more than n/2 then majority element doesn’t exist.
```
> Time Complexity: O(n*n), Space Complexity: O(1)
---
##### Method 2: Using Binary Search Tree
```
1. Insert elements in BST one by one and if an element is already present then increment the count of the node.
2. At any stage, if the count of a node becomes more than n/2 then return the element.
```
> Time Complexity: O(n Logn), Space Complexity: O(n)
---
##### Method 3: Using Sorting
```
1. Sort the array and create a varibale count
2. Traverse the element from start to end
3. check element at index i + n/2. If element is present at i+n/2 then return the element
```
> Time Complexity: O(n Logn), Space Complexity: O(1)
---
##### Method 4: Using Hashmap
```
1. Create a hashmap to store a key-value pair, i.e. element-frequency pair.
2. For every element in the array, insert the element in the hashmap if the element does not exist as key, else fetch the value of the key ( array[i] ) and increase the value by 1
3. If the count is greater than half then print the majority element and break. If no majority element is found print “No Majority element”
```
> Time Complexity: O(n), Space Complexity: O(n)
---
##### Method 5: Moore’s Voting Algorithm
*Basic idea of the algorithm is that if each occurrence of an element e can be cancelled with all the other elements that are different from e then e will exist till end if it is a majority element.*

*__Note__: This method only works when the majority element does exist in the array.*
```
This is a two-step process:
Step 1 (Moore’s Voting Algorithm): Finding a Candidate
  - Loop through each element and maintains a count of majority element, and a majority index, maj_index
  - If the next element is same then increment the count, If the next element is not same then decrement the count.
Step 2: Check if the element obtained in step 1 is majority element or not.
  - Now again traverse through the array and find the count of majority element found.
  - If the count is greater than half the size of the array, print the element, Else print that there is no majority element
```
> Time Complexity: O(n), Space Complexity: O(n)

