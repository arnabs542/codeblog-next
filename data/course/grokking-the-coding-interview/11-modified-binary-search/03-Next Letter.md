---
title: Next Letter
type: topic
section: Modified Binary Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an array of lowercase letters sorted in ascending order, find the smallest letter in the given array greater than a given ‘key’.
Assume the given array is a circular list, which means that the last letter is assumed to be connected with the first letter. This also means that the smallest letter in the given array is greater than the last letter of the array and is also the first letter of the array.
```yml
Input: ['a', 'c', 'f', 'h'], key = 'f'
Output: 'h'
Explanation: The smallest letter greater than 'f' is 'h' in the given array.
```

#### Method: Modified Binary Search
```java
class NextLetter {

  public static char searchNextLetter(char[] letters, char key) {
    int n = letters.length;
    if (key < letters[0] || key > letters[n - 1])
      return letters[0];

    int start = 0, end = n - 1;
    while (start <= end) {
      int mid = start + (end - start) / 2;
      if (key < letters[mid]) {
        end = mid - 1;
      } else { //if (key >= letters[mid]) {
        start = mid + 1;
      }
    }
    // since the loop is running until 'start <= end', so at the end of the while loop, 'start == end+1'
    return letters[start % n];
  }

  public static void main(String[] args) {
    System.out.println(NextLetter.searchNextLetter(new char[] { 'a', 'c', 'f', 'h' }, 'f'));
    System.out.println(NextLetter.searchNextLetter(new char[] { 'a', 'c', 'f', 'h' }, 'b'));
    System.out.println(NextLetter.searchNextLetter(new char[] { 'a', 'c', 'f', 'h' }, 'm'));
    System.out.println(NextLetter.searchNextLetter(new char[] { 'a', 'c', 'f', 'h' }, 'h'));
  }
}
```
**Time complexity:** `O(LogN)`


---