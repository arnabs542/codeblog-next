---
title: Comparing Strings containing Backspaces
type: topic
section: Two Pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given two strings containing backspaces (identified by the character ‘#’), check if the two strings are equal.
```json
Input: str1="xy#z", str2="xzz#"
Output: true
Explanation: After applying backspaces the strings become "xz" and "xz" respectively.

Input: str1="xywrrmp", str2="xywrrmu#p"
Output: true
Explanation: After applying backspaces the strings become "xywrrmp" and "xywrrmp" respectively.
```

#### Method: Two Pointers
To compare the given strings, first, we need to apply the backspaces. An efficient way to do this would be from the end of both the strings. We can have separate pointers, pointing to the last element of the given strings. We can start comparing the characters pointed out by both the pointers to see if the strings are equal. If, at any stage, the character pointed out by any of the pointers is a backspace (’#’), we will skip and apply the backspace until we have a valid character available for comparison.
```java

class BackspaceCompare {

  public static boolean compare(String str1, String str2) {
    int i = str1.length() - 1, j = str2.length() - 1;
    while(i >= 0 || j >= 0) {
      i = getNextValidCharIndex(str1, i);
      j = getNextValidCharIndex(str2, j);
      if(i < 0 && j < 0)
        return true;
      if(i < 0 || j < 0)
        return false;
      if(str1.charAt(i) != str2.charAt(j))
        return false;
      i--;
      j--;
    }
    return true;
  }
  private static int getNextValidCharIndex(String str, int index) {
    int backspaceCount = 0;
    while(index >= 0) {
      if(str.charAt(index) == '#')
        backspaceCount++;
      else if(backspaceCount > 0)
        backspaceCount--;
      else
        break;
      index--;
    }
    return index;
  }
  public static void main(String[] args) {
    System.out.println(BackspaceCompare.compare("xy#z", "xzz#"));
    System.out.println(BackspaceCompare.compare("xy#z", "xyz#"));
    System.out.println(BackspaceCompare.compare("xp#", "xyz##"));    
    System.out.println(BackspaceCompare.compare("xywrrmp", "xywrrmu#p"));
  }
}
```
**Time complexity:** `O(N + M)`


---