---
title: 'Fruits into Baskets'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given an array of characters where each character represents a fruit tree, you are given **two baskets** and your goal is to **put maximum number of fruits in each basket**. The only restriction is that **each basket can have only one type of fruit.**

You can start with any tree, but once you have started **you can’t skip a tree**. You will pick one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

Write a function to return the maximum number of fruits in both the baskets.
```
Input: Fruit=['A', 'B', 'C', 'A', 'C']
Output: 3
Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']
```

#### Method: Sliding Window
```java
import java.util.*;

class MaxFruitCountOf2Types {
  public static int findLength(char[] arr) {
    int n = arr.length;
    int dist = 0;
    int max = 0;
    int l=0;
    Map<Character, Integer> map = new HashMap<>();
    for(int i=0; i<n; i++) {
      char right = arr[i];
      if(map.get(right) == null) {
        dist++;
        map.put(right, 1);
      } else {
        map.put(right, map.get(right) + 1);
      }
      while(dist > 2) {
        char left = arr[l];
        map.put(left, map.get(left) - 1);
        l++;
        if(map.get(left) == 0) {
          map.remove(left);
          dist--;
        }
      }
      max = Math.max(max, i-l+1);
    }
    return max;
  }
  public static void main(String[] args) {
    System.out.println("Maximum number of fruits: " + 
                          MaxFruitCountOf2Types.findLength(new char[] { 'A', 'B', 'C', 'A', 'C' }));
    System.out.println("Maximum number of fruits: " + 
                          MaxFruitCountOf2Types.findLength(new char[] { 'A', 'B', 'C', 'B', 'B', 'C' }));
  }
}
```
**Time complexity:** `O(N)`


---