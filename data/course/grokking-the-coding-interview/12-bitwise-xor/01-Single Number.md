---
title: Single Number
type: topic
section: Bitwise XOR
course: Grokking the Coding Interview
tags:
---
#### Problem
In a non-empty array of integers, every number appears twice except for one, find that single number.
```
Input: 1, 4, 2, 1, 3, 2, 3
Output: 4
```

#### Method: Using HashMap
One straight forward solution can be to use a HashMap kind of data structure and iterate through the input:
- If number is already present in HashMap, remove it.
- If number is not present in HashMap, add it.
- In the end, only number left in the HashMap is our required single number.

#### Method: Bitwise XOR
we can XOR all the numbers in the input; duplicate numbers will zero out each other and we will be left with the single number.
```java
class SingleNumber {
  public static int findSingleNumber(int[] arr) {
    int x = 0;
    for(int i=0; i<arr.length; i++) {
      x ^= arr[i];
    }
    return x;
  }

  public static void main( String args[] ) {
    System.out.println(findSingleNumber(new int[]{1, 4, 2, 1, 3, 2, 3}));
  }
}
```
**Time complexity:** `O(N)`


---