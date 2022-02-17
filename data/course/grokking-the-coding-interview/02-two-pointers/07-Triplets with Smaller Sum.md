---
title: 'Triplets with Smaller Sum'
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array `arr` of unsorted numbers and a target sum, **count all triplets** in it such that `arr[i] + arr[j] + arr[k] < target` where `i`, `j`, and `k` are three different indices. Write a function to return the count of such triplets.

```yml
Input: [-1, 4, 2, 1, 3], target=5 
Output: 4
Explanation: There are four triplets whose sum is less than the target: 
   [-1, 1, 4], [-1, 1, 3], [-1, 1, 2], [-1, 2, 3]
```

#### Method: Two Pointers
```java
import java.util.*;

class TripletWithSmallerSum {

  public static int searchTriplets(int[] arr, int target) {
    Arrays.sort(arr);
    int n = arr.length;
    int count = 0;
    for(int i=0; i<n-2; i++) {
      int l = i+1, r = n-1;
      int x = target - arr[i];
      while(l < r) {
        // since arr[right] >= arr[left], therefore, we can replace arr[right] by any number between 
        // left and right to get a sum less than the target sum
        if(arr[l] + arr[r] < x) {
          count += r - l; // IMPORTANT: 
          System.out.println(arr[l] + " + " + arr[r] + " < " + x);
          l++;
        }
        else
          r--;
      }
    }
    System.out.println("end");
    return count;
  }
  public static void main(String[] args) {
    System.out.println(TripletWithSmallerSum.searchTriplets(new int[] { -1, 0, 2, 3 }, 3));
    System.out.println(TripletWithSmallerSum.searchTriplets(new int[] { -1, 4, 2, 1, 3 }, 5));
  }
}
```
**Time complexity:** `O(N*LogN)`

#### Similar Problems #
**Problem:** Write a function to return the list of all such triplets instead of the count. How will the time complexity change in this case?

**Solution:** Following a similar approach we can create a list containing all the triplets. Here is the code - only the highlighted lines have changed:
```java
import java.util.*;

class TripletWithSmallerSum {

  public static List<List<Integer>> searchTriplets(int[] arr, int target) {
    Arrays.sort(arr);
    List<List<Integer>> triplets = new ArrayList<>();
    for (int i = 0; i < arr.length - 2; i++) {
      searchPair(arr, target - arr[i], i, triplets);
    }
    return triplets;
  }

  private static void searchPair(int[] arr, int targetSum, int first, List<List<Integer>> triplets) {
    int left = first + 1, right = arr.length - 1;
    while (left < right) {
      if (arr[left] + arr[right] < targetSum) { // found the triplet
        // since arr[right] >= arr[left], therefore, we can replace arr[right] by any number between 
        // left and right to get a sum less than the target sum
        for (int i = right; i > left; i--)
          triplets.add(Arrays.asList(arr[first], arr[left], arr[i]));
        left++;
      } else {
        right--; // we need a pair with a smaller sum
      }
    }
  }

  public static void main(String[] args) {
    System.out.println(TripletWithSmallerSum.searchTriplets(new int[] { -1, 0, 2, 3 }, 3));
    System.out.println(TripletWithSmallerSum.searchTriplets(new int[] { -1, 4, 2, 1, 3 }, 5));
  }
}
```

---