---
title: Search in Rotated Array
type: topic
section: Modified Binary Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an array of numbers which is sorted in ascending order and also rotated by some arbitrary number, find if a given ‘key’ is present in it.

Write a function to return the index of the ‘key’ in the rotated array. If the ‘key’ is not present, return -1. You can assume that the given array does not have any duplicates.
```yml
Input: [4, 5, 7, 9, 10, -1, 2], key = 10
Output: 4
Explanation: '10' is present in the array at index '4'.
```

#### Method: Modified Binary Search
The problem follows the Binary Search pattern. We can use a similar approach as discussed in Order-agnostic Binary Search and modify it similar to Search Bitonic Array to search for the ‘key’ in the rotated array.

After calculating the `middle`, we can compare the numbers at indices start and `middle`. This will give us two options:
1. If `arr[start] <= arr[middle]`, the numbers from start to `middle` are sorted in ascending order.
1. Else, the numbers from middle+1 to end are sorted in ascending order.

Once we know which part of the array is sorted, it is easy to adjust our ranges. For example, if option-1 is true, we have two choices:
1. By comparing the ‘key’ with the numbers at index start and `middle` we can easily find out if the ‘key’ lies between indices start and `middle`; if it does, we can skip the second part => `end = middle -1`.
1. Else, we can skip the first part => `start = middle + 1`.

```java
class SearchRotatedArray {

  public static int search(int[] arr, int key) {
    int start = 0, end = arr.length - 1;
    while (start <= end) {
      int mid = start + (end - start) / 2;
      if (arr[mid] == key)
        return mid;

      if (arr[start] <= arr[mid]) { // left side is sorted in ascending order
        if (key >= arr[start] && key < arr[mid]) {
          end = mid - 1;
        } else { //key > arr[mid]
          start = mid + 1;
        }
      } else { // right side is sorted in ascending order       
        if (key > arr[mid] && key <= arr[end]) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }

    // we are not able to find the element in the given array
    return -1;
  }

  public static void main(String[] args) {
    System.out.println(SearchRotatedArray.search(new int[] { 10, 15, 1, 3, 8 }, 15));
    System.out.println(SearchRotatedArray.search(new int[] { 4, 5, 7, 9, 10, -1, 2 }, 10));
  }
}
```
**Time complexity:** `O(LogN)`

#### Similar Problems
How do we search in a sorted and rotated array that also has duplicates?

#### Method: 
The only problematic scenario is when the numbers at indices `start`, `middle`, and `end` are the same, as in this case, we can’t decide which part of the array is sorted. In such a case, the best we can do is to skip one number from both ends: `start = start + 1` & `end = end - 1`.
```java
class SearchRotatedWithDuplicate {

  public static int search(int[] arr, int key) {
    int start = 0, end = arr.length - 1;
    while (start <= end) {
      int mid = start + (end - start) / 2;
      if (arr[mid] == key)
        return mid;
      // the only difference from the previous solution,
      // if numbers at indexes start, mid, and end are same, we can't choose a side
      // the best we can do, is to skip one number from both ends as key != arr[mid]
      if ((arr[start] == arr[mid]) && (arr[end] == arr[mid])) {
        ++start;
        --end;
      } else if (arr[start] <= arr[mid]) { // left side is sorted in ascending order
        if (key >= arr[start] && key < arr[mid]) {
          end = mid - 1;
        } else { //key > arr[mid]
          start = mid + 1;
        }
      } else { // right side is sorted in ascending order
        if (key > arr[mid] && key <= arr[end]) {
          start = mid + 1;
        } else {
          end = mid - 1;
        }
      }
    }

    // we are not able to find the element in the given array
    return -1;
  }

  public static void main(String[] args) {
    System.out.println(SearchRotatedWithDuplicate.search(new int[] { 3, 7, 3, 3, 3 }, 7));
  }
}
```

**Time complexity:** `O(LogN)`

---