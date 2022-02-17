---
title: 'Find extra character between strings'
type: 'problem'
topic: 'String Problems'
section: 'String'
course: 'String'
tags:
- binary tree
- tree
---
#### Problem
Given two strings which are of lengths n and n+1. The second string contains all the character of the first string, but there is one extra character. Your task to find the extra character in the second string.

##### Method 1: Using 2 Loops
```
Check with two for loop.
Time Complexity:- O(n^2)
Space Complexity:- O(1).
```

##### Method 2: Using Hash Map
```
Create an empty hash table and insert all character of second string. Now remove all characters of first string. Remaining character is the extra character.
Time Complexity:- O(n)
Auxiliary Space:- O(n).
```

##### Method 3: Using Bits
traverse first and second string from starting with xor operation at the end you get the character which is extra.

##### Method 4: Character Code
Add the character codes of both the strings. Minus character codes of smaller string from larger string and convert the result integer into character.


---