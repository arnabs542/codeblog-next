---
title: String Permutations by changing case
type: topic
section: Subsets
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a string, find all of its permutations preserving the character sequence but changing case.
```yml
Input: "ab7c"
Output: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C"
```

#### Method: Subsets
This problem follows the Subsets pattern and can be mapped to Permutations.

Let’s take Example-2 mentioned above to generate all the permutations. Following a BFS approach, we will consider one character at a time. Since we need to preserve the character sequence, we can start with the actual string and process each character (i.e., make it upper-case or lower-case) one by one:
1. Starting with the actual string: "ab7c"
1. Processing the first character (‘a’), we will get two permutations: "ab7c", "Ab7c"
1. Processing the second character (‘b’), we will get four permutations: "ab7c", "Ab7c", "aB7c", "AB7c"
1. Since the third character is a digit, we can skip it.
1. Processing the fourth character (‘c’), we will get a total of eight permutations: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C"

```java
import java.util.*;

class LetterCaseStringPermutation {

  public static List<String> findLetterCaseStringPermutations(String str) {
    List<String> permutations = new ArrayList<>();
    if (str == null)
      return permutations;

    permutations.add(str);
    // process every character of the string one by one
    for (int i = 0; i < str.length(); i++) {
      if (Character.isLetter(str.charAt(i))) { // only process characters, skip digits
        // we will take all existing permutations and change the letter case appropriately
        int n = permutations.size();
        for (int j = 0; j < n; j++) {
          char[] chs = permutations.get(j).toCharArray();
          // if the current character is in upper case change it to lower case or vice versa
          if (Character.isUpperCase(chs[i]))
            chs[i] = Character.toLowerCase(chs[i]);
          else
            chs[i] = Character.toUpperCase(chs[i]);
          permutations.add(String.valueOf(chs));
        }
      }
    }
    return permutations;
  }

  public static void main(String[] args) {
    List<String> result = LetterCaseStringPermutation.findLetterCaseStringPermutations("ad52");
    System.out.println(" String permutations are: " + result);

    result = LetterCaseStringPermutation.findLetterCaseStringPermutations("ab7c");
    System.out.println(" String permutations are: " + result);
  }
}
```
**Time complexity:** `O(N*N^2)`





---