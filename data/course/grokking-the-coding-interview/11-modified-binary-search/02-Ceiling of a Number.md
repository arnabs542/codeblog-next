---
title: Ceiling of a Number
type: topic
section: Modified Binary Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an array of numbers sorted in an ascending order, find the ceiling of a given number ‘key’. The ceiling of the ‘key’ will be the smallest element in the given array greater than or equal to the ‘key’.
```yml
Input: [1, 3, 8, 10, 15], key = 12
Output: 4
Explanation: The smallest number greater than or equal to '12' is '15' having index '4'.
```

#### Method: Modified Binary Search
This problem follows the Binary Search pattern. Since Binary Search helps us find a number in a sorted array efficiently, we can use a modified version of the Binary Search to find the ceiling of a number.

We can use a similar approach as discussed in Order-agnostic Binary Search. We will try to search for the ‘key’ in the given array. If we find the ‘key’, we return its index as the ceiling. If we can’t find the ‘key’, the next big number will be pointed out by the index start.
```java
class CeilingOfANumber {

  public static int searchCeilingOfANumber(int[] arr, int key) {
    if (key > arr[arr.length - 1]) // if the 'key' is bigger than the biggest element
      return -1;

    int start = 0, end = arr.length - 1;
    while (start <= end) {
      int mid = start + (end - start) / 2;
      if (key < arr[mid]) {
        end = mid - 1;
      } else if (key > arr[mid]) {
        start = mid + 1;
      } else { // found the key
        return mid;
      }
    }
    // since the loop is running until 'start <= end', so at the end of the while loop, 'start == end+1'
    // we are not able to find the element in the given array, so the next big number will be arr[start]
    return start;
  }

  public static void main(String[] args) {
    System.out.println(CeilingOfANumber.searchCeilingOfANumber(new int[] { 4, 6, 10 }, 6));
    System.out.println(CeilingOfANumber.searchCeilingOfANumber(new int[] { 1, 3, 8, 10, 15 }, 12));
    System.out.println(CeilingOfANumber.searchCeilingOfANumber(new int[] { 4, 6, 10 }, 17));
    System.out.println(CeilingOfANumber.searchCeilingOfANumber(new int[] { 4, 6, 10 }, -1));
  }
}
```
**Time complexity:** `O(LogN)`

#### Similar Problem
Given an array of numbers sorted in ascending order, find the floor of a given number ‘key’. The floor of the ‘key’ will be the biggest element in the given array smaller than or equal to the ‘key’
```java
class FloorOfANumber {

  public static int searchFloorOfANumber(int[] arr, int key) {
    if (key < arr[0]) // if the 'key' is smaller than the smallest element
      return -1;

    int start = 0, end = arr.length - 1;
    while (start <= end) {
      int mid = start + (end - start) / 2;
      if (key < arr[mid]) {
        end = mid - 1;
      } else if (key > arr[mid]) {
        start = mid + 1;
      } else { // found the key
        return mid;
      }
    }
    // since the loop is running until 'start <= end', so at the end of the while loop, 'start == end+1'
    // we are not able to find the element in the given array, so the next smaller number will be arr[end]
    return end;
  }

  public static void main(String[] args) {
    System.out.println(FloorOfANumber.searchFloorOfANumber(new int[] { 4, 6, 10 }, 6));
    System.out.println(FloorOfANumber.searchFloorOfANumber(new int[] { 1, 3, 8, 10, 15 }, 12));
    System.out.println(FloorOfANumber.searchFloorOfANumber(new int[] { 4, 6, 10 }, 17));
    System.out.println(FloorOfANumber.searchFloorOfANumber(new int[] { 4, 6, 10 }, -1));
  }
}
```





---