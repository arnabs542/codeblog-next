---
title: 'Longest Substring with K Distinct Characters'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string, find the length of the longest substring in it with no more than K distinct characters.
```
Input: String="araaci", K=2
Output: 4
Explanation: The longest substring with no more than '2' distinct characters is "araa".
```

#### Method: Sliding Window
```java
import java.util.*;

class LongestSubstringKDistinct {
  public static int findLength(String str, int k) {
    int n = str.length();
    int dist = 0;
    int max = 0;
    int l=0;
    Map<Character, Integer> map = new HashMap<>();
    for(int i=0; i<n; i++) {
      char right = str.charAt(i);
      if(map.get(right) == null) {
        dist++;
        map.put(right, 1);
      } else {
        map.put(right, map.get(right) + 1);
      }
      while(dist > k) {
        char left = str.charAt(l);
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
    System.out.println("Length of the longest substring: " + LongestSubstringKDistinct.findLength("araaci", 2));
    System.out.println("Length of the longest substring: " + LongestSubstringKDistinct.findLength("araaci", 1));
    System.out.println("Length of the longest substring: " + LongestSubstringKDistinct.findLength("cbbebi", 3));
  }
}
```
**Time complexity:** `O(N)`


---