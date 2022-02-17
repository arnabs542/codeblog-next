---
title: 'Dutch National Flag Problem'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array containing 0s, 1s and 2s, sort the array in-place. You should **treat numbers of the array as objects**, hence, we can’t count 0s, 1s, and 2s to recreate the array.

The flag of the Netherlands consists of three colors: red, white and blue; and since our input array also consists of three different numbers that is why it is called Dutch National Flag problem.
```
Input: [1, 0, 2, 1, 0]
Output: [0 0 1 1 2]
```

#### Method: Using Heap
The brute force solution will be to use an in-place sorting algorithm like Heapsort which will take O(N*logN).

#### Method: Two Pointers
```java
class DutchFlag {
  public static void sort(int[] arr) {
    int n = arr.length;
    int i = 0, l = 0, r = n-1;
    // all elements < low are 0 and all elements > high are 2
    while(i <= r) {
      if(arr[i] == 0) {
        swap(arr, i, l);
        // increment 'i' and 'low'
        l++;
        i++;
      } else if(arr[i] == 1) {
        i++;
      } else {
        swap(arr, i, r);
        // decrement 'high' only, after the swap the number at index 'i' could be 0, 1 or 2
        r--;
      }
    }
  }
  private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  public static void main(String[] args) {
    int[] arr = new int[] { 1, 0, 2, 1, 0 };
    DutchFlag.sort(arr);
    for (int num : arr)
      System.out.print(num + " ");
    System.out.println();

    arr = new int[] { 2, 2, 0, 1, 2, 0 };
    DutchFlag.sort(arr);
    for (int num : arr)
      System.out.print(num + " ");
  }
}
```
**Time complexity:** `O(N)`


---