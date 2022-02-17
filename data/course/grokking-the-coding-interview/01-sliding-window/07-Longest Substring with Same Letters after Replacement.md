---
title: 'Longest Substring with Same Letters after Replacement'
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string with lowercase letters only, if you are allowed to replace no more than ‘k’ letters with any letter, find the length of the longest substring having the same letters after replacement.
```
Input: String="aabccbb", k=2
Output: 5
Explanation: Replace the two 'c' with 'b' to have a longest repeating substring "bbbbb".
```

#### Method: Sliding Window
```java
class CharacterReplacement {
  public static int findLength(String str, int k) {
    int n = str.length();
    int maxLen = 0, maxRepeat = 0;
    int l = 0;
    Map<Character, Integer> map = new HashMap<>();
    for(int r=0; r<n; r++) {
      char right = str.charAt(r);
      map.put(right, map.getOrDefault(right, 0) + 1);
      maxRepeat = Math.max(maxRepeat, map.get(right));
      if(r - l + 1 - maxRepeat > k) {
        char left = str.charAt(l);
        map.put(left, map.get(left) - 1);
        l++;
      }
      maxLen = Math.max(maxLen, r-l+1);
    }
    return maxLen;
  }
  public static void main(String[] args) {
    System.out.println(CharacterReplacement.findLength("aabccbb", 2));
    System.out.println(CharacterReplacement.findLength("abbcb", 1));
    System.out.println(CharacterReplacement.findLength("abccde", 1));
  }
}
```
**Time complexity:** `O(N)`


---