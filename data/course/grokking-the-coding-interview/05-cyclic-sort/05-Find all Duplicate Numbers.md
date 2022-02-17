---
title: 'Find all Duplicate Numbers'
type: topic
section: Cyclic Sort
course: Grokking the Coding Interview
tags:
---
#### Problem
We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’. The array has some duplicates, **find all the duplicate numbers without using any extra space**.

```
Input: [5, 4, 7, 2, 3, 5, 3]
Output: [3, 5]
```

#### Method: Cyclic Sort
This problem follows the Cyclic Sort pattern and shares similarities with Find the Duplicate Number. Following a similar approach, we will place each number at its correct index. After that, we will iterate through the array to find all numbers that are not at the correct indices. All these numbers are duplicates.
```java
import java.util.*;

class FindAllDuplicate {

  public static List<Integer> findNumbers(int[] nums) {
    int n = nums.length;
    int i = 0;
    while(i < n) {
      int j = nums[i] - 1;
      if(nums[i] != nums[j])
        swap(nums, i, j);
      else
        i++;
    }
    List<Integer> duplicateNumbers = new ArrayList<>();
    for (i = 0; i < nums.length; i++) {
      if (nums[i] != i + 1)
        duplicateNumbers.add(nums[i]);
    }
    return duplicateNumbers;
  }
  private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  public static void main(String[] args) {
    List<Integer> duplicates = FindAllDuplicate.findNumbers(new int[] { 3, 4, 4, 5, 5 });
    System.out.println("Duplicates are: " + duplicates);

    duplicates = FindAllDuplicate.findNumbers(new int[] { 5, 4, 7, 2, 3, 5, 3 });
    System.out.println("Duplicates are: " + duplicates);
  }
}
```
**Time complexity:** `O(N)`


---