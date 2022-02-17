---
title: 'Find all Words in Trie'
type: 'problem'
topic: 'Trie Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Find all Words in Trie

---
##### Method 1: 
The findWords(root) function contains a result ArrayList which will contain all the words in the trie. word is a character array in which node characters are added one by one to keep track of all the alphabets in the same recursive call.

getWords() is our recursive function which begins from the root and traverses every node. Whenever a node is the end of a word, temp(containing the character array) is converted into a string and inserted into result.

Since word cannot be reset before recording every new word, we simply update the values at each index using level.

> Time Complexity: O(n)


---