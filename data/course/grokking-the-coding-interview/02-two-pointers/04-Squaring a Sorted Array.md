---
title: 'Squaring a Sorted Array'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a sorted array, create a new array containing **squares of all the number of the input array** in the sorted order.
```
Input: [-2, -1, 0, 2, 3]
Output: [0, 1, 4, 4, 9]
```

#### Method: Two Pointers
```java
class SortedArraySquares {

  public static int[] makeSquares(int[] arr) {
    int n = arr.length;
    int[] squares = new int[n];
    int i = n-1, l = 0, r = n-1;
    while(l <= r) {
      if(arr[l]*arr[l] > arr[r]*arr[r]) {
        squares[i] = arr[l]*arr[l];
        l++;
      } else {
        squares[i] = arr[r]*arr[r];
        r--;
      }
      i--;
    }
    return squares;
  }
  public static void main(String[] args) {
    int[] result = SortedArraySquares.makeSquares(new int[] { -2, -1, 0, 2, 3 });
    for (int num : result)
      System.out.print(num + " ");
    System.out.println();

    result = SortedArraySquares.makeSquares(new int[] { -3, -1, 0, 1, 2 });
    for (int num : result)
      System.out.print(num + " ");
    System.out.println();
  }
}
```
**Time complexity:** `O(N)`


---