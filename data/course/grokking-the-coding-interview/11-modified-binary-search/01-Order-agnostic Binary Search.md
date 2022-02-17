---
title: Order-agnostic Binary Search
type: topic
section: Modified Binary Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a sorted array of numbers, find if a given number ‘key’ is present in the array. Though we know that the array is sorted, we don’t know if it’s sorted in ascending or descending order. You should assume that the array can have duplicates.
```yml
Input: [1, 2, 3, 4, 5, 6, 7], key = 5
Output: 4
```

#### Method: Modified Binary Search
```java
class BinarySearch {

  public static int search(int[] arr, int key) {
    int start = 0, end = arr.length - 1;
    boolean isAscending = arr[start] < arr[end];
    while (start <= end) {
      // calculate the middle of the current range
      int mid = start + (end - start) / 2;

      if (key == arr[mid])
        return mid;

      if (isAscending) { // ascending order
        if (key < arr[mid]) {
          end = mid - 1; // the 'key' can be in the first half
        } else { // key > arr[mid]
          start = mid + 1; // the 'key' can be in the second half
        }
      } else { // descending order        
        if (key > arr[mid]) {
          end = mid - 1; // the 'key' can be in the first half
        } else { // key < arr[mid]
          start = mid + 1; // the 'key' can be in the second half
        }
      }
    }
    return -1; // element not found
  }

  public static void main(String[] args) {
    System.out.println(BinarySearch.search(new int[] { 4, 6, 10 }, 10));
    System.out.println(BinarySearch.search(new int[] { 1, 2, 3, 4, 5, 6, 7 }, 5));
    System.out.println(BinarySearch.search(new int[] { 10, 6, 4 }, 10));
    System.out.println(BinarySearch.search(new int[] { 10, 6, 4 }, 4));
  }
}
```
**Time complexity:** `O(LogN)`


---