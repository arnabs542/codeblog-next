---
title: 'No-repeat Substring'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string, find the length of the longest substring which has no repeating characters.
```
Input: String="aabccbb"
Output: 3
Explanation: The longest substring without any repeating characters is "abc".
```

#### Method: Sliding Window
We can use a HashMap to remember the last index of each character we have processed. Whenever we get a repeating character we will shrink our sliding window to ensure that we always have distinct characters in the sliding window.
```java
import java.util.*;

class NoRepeatSubstring {
  public static int findLength(String str) {
    int n = str.length();
    int l = 0;
    int max = 0;
    // mapping character to its index
    Map<Character, Integer> map = new HashMap<>();
    for(int r=0; r<n; r++) {
      char right = str.charAt(r);
      if(map.containsKey(right)) {
        l = Math.max(l, map.get(right) + 1);
      }
      map.put(right, r);
      max = Math.max(max, (r-l+1));
    }
    return max;
  }
  public static void main(String[] args) {
    System.out.println("Length of the longest substring: " + NoRepeatSubstring.findLength("aabccbb"));
    System.out.println("Length of the longest substring: " + NoRepeatSubstring.findLength("abbbb"));
    System.out.println("Length of the longest substring: " + NoRepeatSubstring.findLength("abccde"));
  }
}
```
**Time complexity:** `O(N)`


---