---
title: Smallest Window containing Substring
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string and a pattern, find the **smallest substring** in the given string which **has all the characters of the given pattern**.
```yml
Input: String="aabdec", Pattern="abc"
Output: "abdec"
Explanation: The smallest substring having all characters of the pattern is "abdec"

Input: String="adcad", Pattern="abc"
Output: ""
Explanation: No substring in the given string has all characters of the pattern.
```

#### Method: Sliding Window
This problem follows the **Sliding Window** pattern and has a lot of similarities with Permutation in a String with one difference. In this problem, we need to find a substring having all characters of the pattern which means that the required substring can have some additional characters and doesn’t need to be a permutation of the pattern. Here is how we will manage these differences:
1. We will keep a running count of every matching instance of a character.
1. Whenever we have matched all the characters, we will try to shrink the window from the beginning, keeping track of the smallest substring that has all the matching characters.
1. We will stop the shrinking process as soon as we remove a matched character from the sliding window. One thing to note here is that we could have redundant matching characters, e.g., we might have two ‘a’ in the sliding window when we only need one ‘a’. In that case, when we encounter the first ‘a’, we will simply shrink the window without decrementing the matched count. We will decrement the matched count when the second ‘a’ goes out of the window.

```java
import java.util.*;

class MinimumWindowSubstring {
  public static String findSubstring(String str, String pattern) {
    Map<Character, Integer> map = new HashMap<>();
    for (char c : pattern.toCharArray())
      map.put(c, map.getOrDefault(c, 0) + 1);
    // try to extend the range [l, r]
    int l = 0, matched = 0, minLen = str.length() + 1, minStart = 0;
    for(int r=0; r<str.length(); r++) {
      char right = str.charAt(r);
      if(map.containsKey(right)) {
        map.put(right, map.get(right) - 1);
        if(map.get(right) >= 0) // count every matching of a character
          matched++;
      }
      // shrink the window if we can, finish as soon as we remove a matched character
      while(matched == pattern.length()) {
        if(minLen > r - l + 1) {
          minLen = r - l + 1;
          minStart = l;
        }
        char left = str.charAt(l);
        l++;
        if(map.containsKey(left)) {
          // note that we could have redundant matching characters, therefore we'll decrement the
          // matched count only when a useful occurrence of a matched character is going out of the window
          if(map.get(left) == 0)
            matched--;
          map.put(left, map.get(left) + 1);
        }
      }
    }
    return minLen > str.length() ? "" : str.substring(minStart, minStart + minLen);
  }
  public static void main(String[] args) {
    System.out.println(MinimumWindowSubstring.findSubstring("aabdec", "abc"));
    System.out.println(MinimumWindowSubstring.findSubstring("abdabca", "abc"));
    System.out.println(MinimumWindowSubstring.findSubstring("adcad", "abc"));
  }
}
```
**Time complexity:** `O(N + P)`

**Space complexity:** `O(P)`

---