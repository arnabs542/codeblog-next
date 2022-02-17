---
title: 'Permutation in a String'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string and a pattern, find out if the string contains any permutation of the pattern.
```yml
Input: String="oidbcaf", Pattern="abc"
Output: true
Explanation: The string contains "bca" which is a permutation of the given pattern.

Input: String="odicf", Pattern="dc"
Output: false
Explanation: No permutation of the pattern is present in the given string as a substring.
```

#### Method: Sliding Window
This problem follows the **Sliding Window** pattern and we can use a similar sliding window strategy as discussed in Longest Substring with K Distinct Characters. We can use a **HashMap** to remember the frequencies of all characters in the given pattern. Our goal will be to match all the characters from this **HashMap** with a sliding window in the given string. Here are the steps of our algorithm:
1. Create a **HashMap** to calculate the frequencies of all characters in the pattern.
1. Iterate through the string, adding one character at a time in the sliding window.
1. If the character being added matches a character in the **HashMap**, decrement its frequency in the map. If the character frequency becomes zero, we got a complete match.
1. If at any time, the number of characters matched is equal to the number of distinct characters in the pattern (i.e., total characters in the **HashMap**), we have gotten our required permutation.
1. If the window size is greater than the length of the pattern, shrink the window to make it equal to the size of the pattern. At the same time, if the character going out was part of the pattern, put it back in the frequency **HashMap**.

```java
import java.util.*;

class StringPermutation {
  public static boolean findPermutation(String str, String pattern) {
    Map<Character, Integer> map = new HashMap<>();
    for(char c : pattern.toCharArray())
      map.put(c, map.getOrDefault(c, 0) + 1);
    int l = 0, matched = 0;
    // our goal is to match all the characters from the 'charFrequencyMap' with the current window
    // try to extend the range [l, r]
    for(int r=0; r<str.length(); r++) {
      char right = str.charAt(r);
      if(map.containsKey(right)) {
        map.put(right, map.get(right) - 1);
        if(map.get(right) == 0)
          matched++;
      }
      if(matched == map.size())
        return true;
      if(r >= pattern.length() - 1) {
        char left = str.charAt(l);
        l++;
        if(map.containsKey(left)) {
          if(map.get(left) == 0)
            matched--; // before putting the character back, decrement the matched count
          // put the character back for matching
          map.put(left, map.get(left) + 1);
        }
      }
    }
    return false;
  }
  public static void main(String[] args) {
    System.out.println("Permutation exist: " + StringPermutation.findPermutation("oidbcaf", "abc"));
    System.out.println("Permutation exist: " + StringPermutation.findPermutation("odicf", "dc"));
    System.out.println("Permutation exist: " + StringPermutation.findPermutation("bcdxabcdy", "bcdyabcdx"));
    System.out.println("Permutation exist: " + StringPermutation.findPermutation("aaacb", "abc"));
  }
}
```
**Time complexity:** `O(N + P)`

**Space complexity:** `O(P)`

---