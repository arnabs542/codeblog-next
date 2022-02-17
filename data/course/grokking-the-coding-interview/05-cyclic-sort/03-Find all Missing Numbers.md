---
title: Find all Missing Numbers
type: topic
section: Cyclic Sort
course: Grokking the Coding Interview
tags:
---
#### Problem
We are given an unsorted array containing numbers taken from the range 1 to ‘n’. The array can have duplicates, which means some numbers will be missing. Find all those missing numbers.

```
Input: [2, 3, 1, 8, 2, 3, 5, 1]
Output: 4, 6, 7
Explanation: The array should have all numbers from 1 to 8, due to duplicates 4, 6, and 7 are missing.
```

#### Method: Cyclic Sort
```java
import java.util.*;

class AllMissingNumbers {

  public static List<Integer> findNumbers(int[] nums) {
    List<Integer> missingNumbers = new ArrayList<>();
    int n = nums.length;
    int i = 0;
    while(i < n) {
      int j = nums[i] - 1;
      if(nums[i] != nums[j])
        swap(nums, i, j);
      else
        i++;
    }
    for(i=0; i<n; i++) {
      int j = nums[i] - 1;
      if(i != j)
        missingNumbers.add(i + 1);
    }
    return missingNumbers;
  }
  private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  public static void main(String[] args) {
    List<Integer> missing = AllMissingNumbers.findNumbers(new int[] { 2, 3, 1, 8, 2, 3, 5, 1 });
    System.out.println("Missing numbers: " + missing);

    missing = AllMissingNumbers.findNumbers(new int[] { 2, 4, 1, 2 });
    System.out.println("Missing numbers: " + missing);

    missing = AllMissingNumbers.findNumbers(new int[] { 2, 3, 2, 1 });
    System.out.println("Missing numbers: " + missing);
  }
}
```
**Time complexity:** `O(N)`


---