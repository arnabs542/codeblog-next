---
title: Rearrange String K Distance Apart
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a string and a number ‘K’, find if the string can be rearranged such that the same characters are at least ‘K’ distance apart from each other.
```yml
Input: "Programming", K=3
Output: "rgmPrgmiano" or "gmringmrPoa" or "gmrPagimnor" and a few more
Explanation: All same characters are 3 distance apart.
```

#### Method: Top K Elements
This problem follows the Top ‘K’ Numbers pattern and is quite similar to Rearrange String. The only difference is that in the ‘Rearrange String’ the same characters need not be adjacent i.e., they should be at least ‘2’ distance apart (in other words, there should be at least one character between two same characters), while in the current problem, the same characters should be ‘K’ distance apart.

Following a similar approach, since we were inserting a character back in the heap in the next iteration, in this problem, we will re-insert the character after ‘K’ iterations. We can keep track of previous characters in a queue to insert them back in the heap after ‘K’ iterations.
```java
import java.util.*;

class RearrangeStringKDistanceApart {

  public static String reorganizeString(String str, int k) {
    if (k <= 1)
      return str;

    Map<Character, Integer> charFrequencyMap = new HashMap<>();
    for (char chr : str.toCharArray())
      charFrequencyMap.put(chr, charFrequencyMap.getOrDefault(chr, 0) + 1);

    PriorityQueue<Map.Entry<Character, Integer>> maxHeap = new PriorityQueue<Map.Entry<Character, Integer>>(
        (e1, e2) -> e2.getValue() - e1.getValue());

    // add all characters to the max heap
    maxHeap.addAll(charFrequencyMap.entrySet());

    Queue<Map.Entry<Character, Integer>> queue = new LinkedList<>();
    StringBuilder resultString = new StringBuilder(str.length());
    while (!maxHeap.isEmpty()) {
      Map.Entry<Character, Integer> currentEntry = maxHeap.poll();
      // append the current character to the result string and decrement its count
      resultString.append(currentEntry.getKey());
      currentEntry.setValue(currentEntry.getValue() - 1);
      queue.offer(currentEntry);
      if (queue.size() == k) {
        Map.Entry<Character, Integer> entry = queue.poll();
        if (entry.getValue() > 0)
          maxHeap.add(entry);
      }
    }

    // if we were successful in appending all the characters to the result string, return it
    return resultString.length() == str.length() ? resultString.toString() : "";
  }

  public static void main(String[] args) {
    System.out.println("Reorganized string: " + 
              RearrangeStringKDistanceApart.reorganizeString("mmpp", 2));
    System.out.println("Reorganized string: " + 
              RearrangeStringKDistanceApart.reorganizeString("Programming", 3));
    System.out.println("Reorganized string: " + 
              RearrangeStringKDistanceApart.reorganizeString("aab", 2));
    System.out.println("Reorganized string: " + 
              RearrangeStringKDistanceApart.reorganizeString("aappa", 3));
  }
}
```
**Time complexity:** `O(N*LogN)`


---