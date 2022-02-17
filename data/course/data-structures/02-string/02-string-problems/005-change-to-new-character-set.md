---
title: 'Change to new character set'
type: 'problem'
topic: 'String Problems'
section: 'String'
course: 'String'
tags:
- binary tree
- tree
---
#### Problem
Given a 26 letter character set, which is equivalent to character set of English alphabet i.e. (abcd….xyz) and act as a relation. We are also given several sentences and we have to translate them with the help of given new character set.


##### Method 1: Using Hashing
1) Print first character in capital.
2) Traverse rest of the string and print every character after space in capital letter.

##### Method 2:
```
1.Initialize two strings, one with actual set of alphabets and another with modified one.
  2.Get the string to be converted from the user.
  3.Retrive the first element of the string, find its index in the modified set of alphabets(eg:0 for ‘q’).
  4.Find the element of same index in the actual set of alphabets and concatenate it with the result string.
  5.Repeat the above steps for all the remaining elements of the input string.
  6.Return the result string.
```


---