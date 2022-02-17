---
title: 'Triplet Sum to Zero'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array of unsorted numbers, find all **unique triplets in it that add up to zero**.

```
Input: [-3, 0, 1, 2, -1, 1, -2]
Output: [-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]
Explanation: There are four unique triplets whose sum is equal to zero.
```

#### Method: Two Pointers
This problem follows the Two Pointers pattern and shares similarities with Pair with Target Sum. A couple of differences are that the input array is not sorted and instead of a pair we need to find triplets with a target sum of zero.

To follow a similar approach, first, we will sort the array and then iterate through it taking one number at a time. Let’s say during our iteration we are at number ‘X’, so we need to find ‘Y’ and ‘Z’ such that `X + Y + Z == 0`. At this stage, our problem translates into finding a pair whose sum is equal to “-X” (as from the above equation Y + Z == -X).

Another difference from Pair with Target Sum is that we need to find all the unique triplets. To handle this, we have to skip any duplicate number. Since we will be sorting the array, so all the duplicate numbers will be next to each other and are easier to skip.
```java
import java.util.*;

class TripletSumToZero {
  public static List<List<Integer>> searchTriplets(int[] arr) {
    int n = arr.length;
    Arrays.sort(arr);
    List<List<Integer>> triplets = new ArrayList<>();
    for(int i=0; i<n-1; i++) {
      int l = i + 1; 
      int r = n - 1; 
      int x = arr[i];
      while(l < r) {
        if(x + arr[l] + arr[r] > 0)
          r--;
        else if(x + arr[l] + arr[r] < 0)
          l++;
        else {
          triplets.add(Arrays.asList(x, arr[l], arr[r]));
          l++;
          r--;
        }
      }
    }
    return triplets;
  }
  public static void main(String[] args) {
    System.out.println(TripletSumToZero.searchTriplets(new int[] { -3, 0, 1, 2, -1, 1, -2 }));
    System.out.println(TripletSumToZero.searchTriplets(new int[] { -5, 2, -1, -2, 3 }));
  }
}
```
**Time complexity:** `O(N)`



---