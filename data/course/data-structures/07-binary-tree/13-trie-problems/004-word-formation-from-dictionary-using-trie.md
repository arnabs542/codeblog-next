---
title: 'Word Formation from Dictionary using Trie'
type: 'problem'
topic: 'Trie Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Word Formation from Dictionary using Trie

---
##### Method 1: 
At the beginning of the algorithm, all the keys are inserted into the trie. Then, we iterate through the word, dividing it into two strings called first and second. We search for the two strings in the trie and if both are found, word can be formed with two words from the given dict.

Time Complexity: We perform the insert operation m times for a dictionary of size m. After that, the search operation runs on the word in the sequence:
```
"h", "he", "hel", "hell"...
```

If the size of the word is n, the complexity for this turns out to be n2. Hence, the total time complexity is O(m + n2).


---