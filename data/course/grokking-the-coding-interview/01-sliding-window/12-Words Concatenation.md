---
title: Words Concatenation
type: topic
section: Sliding Window
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given a string and a list of words, find all the starting indices of substrings in the given string that are a **concatenation of all the given words** exactly once **without any overlapping** of words. It is given that all words are of the same length.
```yml
Input: String="catfoxcat", Words=["cat", "fox"]
Output: [0, 3]
Explanation: The two substring containing both the words are "catfox" & "foxcat".

Input: String="catcatfoxfox", Words=["cat", "fox"]
Output: [3]
Explanation: The only substring containing both the words is "catfox".
```

#### Method: Sliding Window
This problem follows the **Sliding Window** pattern and has a lot of similarities with Maximum Sum Subarray of Size K. We will keep track of all the words in a **HashMap** and try to match them in the given string. Here are the set of steps for our algorithm:
1. Keep the frequency of every word in a **HashMap**.
1. Starting from every index in the string, try to match all the words.
1. In each iteration, keep track of all the words that we have already seen in another **HashMap**.
1. If a word is not found or has a higher frequency than required, we can move on to the next character in the string.
1. Store the index if we have found all the words.

```java
import java.util.*;

class WordConcatenation {
  public static List<Integer> findWordConcatenation(String str, String[] words) {
    Map<String, Integer> wordFrequencyMap = new HashMap<>();
    for (String word : words)
      wordFrequencyMap.put(word, wordFrequencyMap.getOrDefault(word, 0) + 1);

    List<Integer> resultIndices = new ArrayList<Integer>();
    int wordsCount = words.length, wordLength = words[0].length();

    for (int i = 0; i <= str.length() - wordsCount * wordLength; i++) {
      Map<String, Integer> wordsSeen = new HashMap<>();
      for (int j = 0; j < wordsCount; j++) {
        int nextWordIndex = i + j * wordLength;
        // get the next word from the string
        String word = str.substring(nextWordIndex, nextWordIndex + wordLength);
        if (!wordFrequencyMap.containsKey(word)) // break if we don't need this word
          break;

        wordsSeen.put(word, wordsSeen.getOrDefault(word, 0) + 1); // add the word to the 'wordsSeen' map

        // no need to process further if the word has higher frequency than required 
        if (wordsSeen.get(word) > wordFrequencyMap.getOrDefault(word, 0))
          break;

        if (j + 1 == wordsCount) // store index if we have found all the words
          resultIndices.add(i);
      }
    }

    return resultIndices;
  }

  public static void main(String[] args) {
    List<Integer> result = WordConcatenation.findWordConcatenation("catfoxcat", new String[] { "cat", "fox" });
    System.out.println(result);
    result = WordConcatenation.findWordConcatenation("catcatfoxfox", new String[] { "cat", "fox" });
    System.out.println(result);
  }
}
```
**Time complexity:** `O(N*M*Len)`, ‘N’ is the number of characters in the given string, ‘M’ is the total number of words, and ‘Len’ is the length of a word.

**Space complexity:** `O(M)`


---