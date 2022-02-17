---
title: 'String Anagrams'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string and a pattern, find all anagrams of the pattern in the given string.

```yml
Input: String="ppqp", Pattern="pq"
Output: [1, 2]
Explanation: The two anagrams of the pattern in the given string are "pq" and "qp".

Input: String="abbcabc", Pattern="abc"
Output: [2, 3, 4]
Explanation: The three anagrams of the pattern in the given string are "bca", "cab", and "abc".
```

#### Method: Sliding Window
This problem follows the Sliding Window pattern and is very similar to Permutation in a String. In this problem, we need to find every occurrence of any permutation of the pattern in the string. We will use a list to store the starting indices of the anagrams of the pattern in the string.
```java
import java.util.*;

class StringAnagrams {
  public static List<Integer> findStringAnagrams(String str, String pattern) {
    List<Integer> result = new ArrayList<Integer>();
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
        result.add(l);
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
    return result;
  }
  public static void main(String[] args) {
    System.out.println(StringAnagrams.findStringAnagrams("ppqp", "pq"));
    System.out.println(StringAnagrams.findStringAnagrams("abbcabc", "abc"));
  }
}
```
**Time complexity:** `O(N + P)`

**Space complexity:** `O(P)`


---