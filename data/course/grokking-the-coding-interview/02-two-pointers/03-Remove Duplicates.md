---
title: 'Remove Duplicates'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array of **sorted** numbers, **remove all duplicates** from it. You should not use any extra space; after removing the duplicates in-place return the new length of the array.
```
Input: [2, 3, 3, 3, 6, 9, 9]
Output: 4
Explanation: The first four elements after removing the duplicates will be [2, 3, 6, 9].
```

#### Method: Two Pointers
```java
class RemoveDuplicates {

  public static int remove(int[] arr) {
    int nextNonRepeat = 1, next = 1;
    for(int i=0; i<arr.length; i++) {
      if(arr[nextNonRepeat-1] != arr[i]) {
        arr[nextNonRepeat] = arr[i];
        nextNonRepeat++;
      }
    }
    return nextNonRepeat;
  }
  public static void main(String[] args) {
    int[] arr = new int[] { 3, 2, 3, 6, 3, 10, 9, 3 };
    System.out.println(RemoveElement.remove(arr, 3));

    arr = new int[] { 2, 11, 2, 2, 1 };
    System.out.println(RemoveElement.remove(arr, 2));
  }
}
```
**Time complexity:** `O(N)`


---