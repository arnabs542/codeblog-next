---
title: Rotation Count
type: topic
section: Modified Binary Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an array of numbers which is sorted in ascending order and is rotated ‘k’ times around a pivot, find ‘k’.
You can assume that the array does not have any duplicates.
```yml
Input: [4, 5, 7, 9, 10, -1, 2]
Output: 5
Explanation: The array has been rotated 5 times.
```

#### Method: Modified Binary Search
This problem follows the Binary Search pattern. We can use a similar strategy as discussed in Search in Rotated Array.

In this problem, actually, we are asked to find the index of the minimum element. The number of times the minimum element is moved to the right will be equal to the number of rotations. An interesting fact about the minimum element is that it is the only element in the given array which is smaller than its previous element. Since the array is sorted in ascending order, all other elements are bigger than their previous element.

After calculating the `middle`, we can compare the number at index `middle` with its previous and next number. This will give us two options:
1. If `arr[middle] > arr[middle + 1]`, then the element at `middle + 1` is the smallest.
2. If `arr[middle - 1] > arr[middle]`, then the element at `middle` is the smallest.

To adjust the ranges we can follow the same approach as discussed in Search in Rotated Array. Comparing the numbers at indices `start` and `middle` will give us two options:
1. If `arr[start] < arr[middle]`, the numbers from `start` to `middle` are sorted.
2. Else, the numbers from `middle + 1` to `end` are sorted.

```java
class RotationCountOfRotatedArray {

  public static int countRotations(int[] arr) {
    int start = 0, end = arr.length - 1;
    while (start < end) {
      int mid = start + (end - start) / 2;

      if (mid < end && arr[mid] > arr[mid + 1]) // if mid is greater than the next element
        return mid + 1;
      if (mid > start && arr[mid - 1] > arr[mid]) // if mid is smaller than the previous element
        return mid;

      if (arr[start] < arr[mid]) { // left side is sorted, so the pivot is on right side
        start = mid + 1;
      } else { // right side is sorted, so the pivot is on the left side     
        end = mid - 1;
      }
    }

    return 0; // the array has not been rotated
  }

  public static void main(String[] args) {
    System.out.println(RotationCountOfRotatedArray.countRotations(new int[] { 10, 15, 1, 3, 8 }));
    System.out.println(RotationCountOfRotatedArray.countRotations(new int[] { 4, 5, 7, 9, 10, -1, 2 }));
    System.out.println(RotationCountOfRotatedArray.countRotations(new int[] { 1, 3, 8, 10 }));
  }
}
```
**Time complexity:** `O(LogN)`

#### Similar Problems
How do we find the rotation count of a sorted and rotated array that has duplicates too?
```yml
Input: [3, 3, 7, 3]
Output: 3
Explanation: The array has been rotated 3 times
```

#### Method:
We can follow the same approach as discussed in Search in Rotated Array. The only difference is that before incrementing start or decrementing end, we will check if either of them is the smallest number.
```java
class RotationCountWithDuplicates {

  public static int countRotations(int[] arr) {
    if (arr == null || arr.length == 0)
      throw new IllegalArgumentException();

    int start = 0, end = arr.length - 1;
    while (start < end) {
      int mid = start + (end - start) / 2;
      if (mid < end && arr[mid] > arr[mid + 1]) // if element at mid is greater than the next element
        return mid + 1;
      if (mid > start && arr[mid - 1] > arr[mid]) // if element at mid is smaller than the previous element
        return mid;

      // this is the only difference from the previous solution
      // if numbers at indices start, mid, and end are same, we can't choose a side
      // the best we can do is to skip one number from both ends if they are not the smallest number
      if (arr[start] == arr[mid] && arr[end] == arr[mid]) {
        if (arr[start] > arr[start + 1]) // if element at start+1 is not the smallest
          return start + 1;
        ++start;
        if (arr[end - 1] > arr[end]) // if the element at end is not the smallest
          return end;
        --end;
        // left side is sorted, so the pivot is on right side
      } else if (arr[start] < arr[mid] || (arr[start] == arr[mid] && arr[mid] > arr[end])) {
        start = mid + 1;
      } else { // right side is sorted, so the pivot is on the left side     
        end = mid - 1;
      }
    }

    return 0; // the array has not been rotated
  }

  public static void main(String[] args) {
    System.out.println(RotationCountWithDuplicates.countRotations(new int[] { 3, 3, 7, 3 }));
  }
}
```

**Time complexity:** `O(LogN)`

---