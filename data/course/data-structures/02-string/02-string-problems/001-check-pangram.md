---
title: 'Check Pangram'
type: 'problem'
topic: 'String Problems'
section: 'String'
course: 'String'
tags:
- binary tree
- tree
---
#### Problem
Given a string check if it is Pangram or not. A pangram is a sentence containing every letter in the English Alphabet.

##### Method 1: Iterative
We create a mark[] array of Boolean type. We iterate through all the characters of our string and whenever we see a character we mark it. Lowercase and Uppercase are considered the same. So ‘A’ and ‘a’ are marked in index 0 and similarly ‘Z’ and ‘z’ are marked in index 25.


> Time Complexity: O(n)

---