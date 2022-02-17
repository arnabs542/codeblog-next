---
title: 'Happy Number'
type: topic
section: Fast & Slow pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Any number will be called a happy number if, after repeatedly replacing it with a number equal to the **sum of the square of all of its digits, leads us to number ‘1’**. All other (not-happy) numbers will never reach ‘1’. Instead, they will be stuck in a cycle of numbers which does not include ‘1’.

```
Input: 23   
Output: true (23 is a happy number)  
Explanations: Here are the steps to find out that 23 is a happy number:
```
```
Input: 12   
Output: false (12 is not a happy number)  
Explanations: Here are the steps to find out that 12 is not a happy number:
```

#### Method: Fast & Slow pointers
The process, defined above, to find out if a **number is a happy number or not, always ends in a cycle**. If the number is a happy number, the process will be stuck in a cycle on number ‘1,’ and if the number is not a happy number then the process will be stuck in a cycle with a set of numbers. As we saw in Example-2 while determining if ‘12’ is a happy number or not, our process will get stuck in a cycle with the following numbers: 
`89 -> 145 -> 42 -> 20 -> 4 -> 16 -> 37 -> 58 -> 89`
```java
class HappyNumber {

  public static boolean find(int num) {
    int slow = num, fast = num;
    do {
      slow = findSquareSum(slow); // move one step
      fast = findSquareSum(findSquareSum(fast)); // move two steps
    } while (slow != fast);
    return slow == 1;
  }
  private static int findSquareSum(int num) {
    int sum = 0;
    while(num > 0) {
      int temp = num % 10;
      sum += temp * temp;
      num /= 10;
    }
    return sum;
  }

  public static void main(String[] args) {
    System.out.println(HappyNumber.find(23));
    System.out.println(HappyNumber.find(12));
  }
}
```

**Time complexity:** The time complexity of the algorithm is difficult to determine. However we know the fact that all unhappy numbers eventually get stuck in the cycle: 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4

time complexity: `O(LogN)`

---