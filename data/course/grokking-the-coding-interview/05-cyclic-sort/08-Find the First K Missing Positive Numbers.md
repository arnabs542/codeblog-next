---
title: Find the First K Missing Positive Numbers
type: topic
section: Cyclic Sort
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an unsorted array containing numbers and a number ‘k’, find the first ‘k’ missing positive numbers in the array.
```yml
Input: [2, 3, 4], k=3
Output: [1, 5, 6]
Explanation: The smallest missing positive numbers are 1, 5 and 6.
```

#### Method: Cyclic Sort
This problem follows the **Cyclic Sort** pattern and shares similarities with **Find the Smallest Missing Positive Number**. The only difference is that, in this problem, we need to find the first ‘k’ missing numbers compared to only the first missing number.

We will follow a similar approach as discussed in **Find the Smallest Missing Positive Number** to place the numbers on their correct indices and ignore all numbers that are out of the range of the array. Once we are done with the cyclic sort we will iterate through the array to find indices that do not have the correct numbers.

If we are not able to find ‘k’ missing numbers from the array, we need to add additional numbers to the output array. To find these additional numbers we will use the length of the array. For example, if the length of the array is 4, the next missing numbers will be 4, 5, 6 and so on. One tricky aspect is that any of these additional numbers could be part of the array. Remember, while sorting, we ignored all numbers that are greater than or equal to the length of the array. So all indices that have the missing numbers could possibly have these additional numbers. To handle this, we must keep track of all numbers from those indices that have missing numbers. 


```java
import java.util.*;

class FirstKMissingPositive {

  public static List<Integer> findNumbers(int[] nums, int k) {
    int i = 0;
    while (i < nums.length) {
      if (nums[i] > 0 && nums[i] <= nums.length && nums[i] != nums[nums[i] - 1])
        swap(nums, i, nums[i] - 1);
      else
        i++;
    }

    List<Integer> missingNumbers = new ArrayList<>();
    Set<Integer> extraNumbers = new HashSet<>();
    for (i = 0; i < nums.length && missingNumbers.size() < k; i++)
      if (nums[i] != i + 1) {
        missingNumbers.add(i + 1);
        extraNumbers.add(nums[i]);
      }

    // add the remaining missing numbers
    for (i = 1; missingNumbers.size() < k; i++) {
      int candidateNumber = i + nums.length;
      // ignore if the array contains the candidate number
      if (!extraNumbers.contains(candidateNumber))
        missingNumbers.add(candidateNumber);
    }

    return missingNumbers;
  }

  private static void swap(int[] arr, int i, int j) {
    int temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  public static void main(String[] args) {
    List<Integer> missingNumbers = FirstKMissingPositive.findNumbers(new int[] { 3, -1, 4, 5, 5 }, 3);
    System.out.println("Missing numbers: " + missingNumbers);

    missingNumbers = FirstKMissingPositive.findNumbers(new int[] { 2, 3, 4 }, 3);
    System.out.println("Missing numbers: " + missingNumbers);

    missingNumbers = FirstKMissingPositive.findNumbers(new int[] { -2, -3, 4 }, 2);
    System.out.println("Missing numbers: " + missingNumbers);
  }
}
```
**Time complexity:** `O(N+k)`


---