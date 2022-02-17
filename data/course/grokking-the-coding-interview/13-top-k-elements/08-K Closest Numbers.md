---
title: K Closest Numbers
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a sorted number array and two integers ‘K’ and ‘X’, find ‘K’ closest numbers to ‘X’ in the array. Return the numbers in the sorted order. ‘X’ is not necessarily present in the array.
```yml
Input: [5, 6, 7, 8, 9], K = 3, X = 7
Output: [6, 7, 8]
```

#### Method: Top K Elements
This problem follows the Top ‘K’ Numbers pattern. The biggest difference in this problem is that we need to find the closest (to ‘X’) numbers compared to finding the overall largest numbers. Another difference is that the given array is sorted.

Utilizing a similar approach, we can find the numbers closest to ‘X’ through the following algorithm:
1. Since the array is sorted, we can first find the number closest to ‘X’ through **Binary Search**. Let’s say that number is ‘Y’.
1. The ‘K’ closest numbers to ‘Y’ will be adjacent to ‘Y’ in the array. We can search in both directions of ‘Y’ to find the closest numbers.
1. We can use a heap to efficiently search for the closest numbers. We will take ‘K’ numbers in both directions of ‘Y’ and push them in a **Min Heap** sorted by their absolute difference from ‘X’. This will ensure that the numbers with the smallest difference from ‘X’ (i.e., closest to ‘X’) can be extracted easily from the **Min Heap**.
1. Finally, we will extract the top ‘K’ numbers from the **Min Heap** to find the required numbers.

```java
import java.util.*;

class Entry {
  int key;
  int value;

  public Entry(int key, int value) {
    this.key = key;
    this.value = value;
  }
}

class KClosestElements {

  public static List<Integer> findClosestElements(int[] arr, int K, Integer X) {
    int index = binarySearch(arr, X);
    int low = index - K, high = index + K;
    low = Math.max(low, 0); // 'low' should not be less than zero
    high = Math.min(high, arr.length - 1); // 'high' should not be greater the size of the array

    PriorityQueue<Entry> minHeap = new PriorityQueue<>((n1, n2) -> n1.key - n2.key);
    // add all candidate elements to the min heap, sorted by their absolute difference from 'X'
    for (int i = low; i <= high; i++)
      minHeap.add(new Entry(Math.abs(arr[i] - X), i));

    // we need the top 'K' elements having smallest difference from 'X'
    List<Integer> result = new ArrayList<>();
    for (int i = 0; i < K; i++)
      result.add(arr[minHeap.poll().value]);

    Collections.sort(result);
    return result;
  }

  private static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
    while (low <= high) {
      int mid = low + (high - low) / 2;
      if (arr[mid] == target)
        return mid;
      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    if (low > 0) {
      return low - 1;
    }
    return low;
  }

  public static void main(String[] args) {
    List<Integer> result = KClosestElements.findClosestElements(new int[] { 5, 6, 7, 8, 9 }, 3, 7);
    System.out.println("'K' closest numbers to 'X' are: " + result);

    result = KClosestElements.findClosestElements(new int[] { 2, 4, 5, 6, 9 }, 3, 6);
    System.out.println("'K' closest numbers to 'X' are: " + result);

    result = KClosestElements.findClosestElements(new int[] { 2, 4, 5, 6, 9 }, 3, 10);
    System.out.println("'K' closest numbers to 'X' are: " + result);
  }
}
```
**Time complexity:** `O(logN + K*logK)`

#### Method: Using Two Pointers
After finding the number closest to ‘X’ through Binary Search, we can use the Two Pointers approach to find the ‘K’ closest numbers. Let’s say the closest number is ‘Y’. We can have a left pointer to move back from ‘Y’ and a right pointer to move forward from ‘Y’. At any stage, whichever number pointed out by the left or the right pointer gives the smaller difference from ‘X’ will be added to our result list.

To keep the resultant list sorted we can use a Queue. So whenever we take the number pointed out by the left pointer, we will append it at the beginning of the list and whenever we take the number pointed out by the right pointer we will append it at the end of the list.
```java
import java.util.*;

class KClosestElements {

  public static List<Integer> findClosestElements(int[] arr, int K, Integer X) {
    List<Integer> result = new LinkedList<>();
    int index = binarySearch(arr, X);
    int leftPointer = index;
    int rightPointer = index + 1;
    for (int i = 0; i < K; i++) {
      if (leftPointer >= 0 && rightPointer < arr.length) {
        int diff1 = Math.abs(X - arr[leftPointer]);
        int diff2 = Math.abs(X - arr[rightPointer]);
        if (diff1 <= diff2)
          result.add(0, arr[leftPointer--]); // append in the beginning
        else
          result.add(arr[rightPointer++]); // append at the end
      } else if (leftPointer >= 0) {
        result.add(0, arr[leftPointer--]);
      } else if (rightPointer < arr.length) {
        result.add(arr[rightPointer++]);
      }
    }
    return result;
  }

  private static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
    while (low <= high) {
      int mid = low + (high - low) / 2;
      if (arr[mid] == target)
        return mid;
      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    if (low > 0) {
      return low - 1;
    }
    return low;
  }

  public static void main(String[] args) {
    List<Integer> result = KClosestElements.findClosestElements(new int[] { 5, 6, 7, 8, 9 }, 3, 7);
    System.out.println("'K' closest numbers to 'X' are: " + result);

    result = KClosestElements.findClosestElements(new int[] { 2, 4, 5, 6, 9 }, 3, 6);
    System.out.println("'K' closest numbers to 'X' are: " + result);

    result = KClosestElements.findClosestElements(new int[] { 2, 4, 5, 6, 9 }, 3, 10);
    System.out.println("'K' closest numbers to 'X' are: " + result);
  }
}
```
**Time complexity:** `O(logN + K)`


---