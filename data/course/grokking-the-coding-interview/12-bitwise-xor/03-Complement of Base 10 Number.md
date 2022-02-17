---
title: Complement of Base 10 Number
type: topic
section: Bitwise XOR
course: Grokking the Coding Interview
tags:
---
#### Problem
Every non-negative integer N has a binary representation, for example, 8 can be represented as “1000” in binary and 7 as “0111” in binary.

The complement of a binary representation is the number in binary that we get when we change every 1 to a 0 and every 0 to a 1. For example, the binary complement of “1010” is “0101”.

For a given positive number N in base-10, return the complement of its binary representation as a base-10 integer.
```
Input: 8
Output: 7
Explanation: 8 is 1000 in binary, its complement is 0111 in binary, which is 7 in base-10.

Input: 10
Output: 5
Explanation: 10 is 1010 in binary, its complement is 0101 in binary, which is 5 in base-10.
```

#### Method: Bitwise XOR
XOR of a number with its complement will result in a number that has all of its bits set to 1. For example, the binary complement of “101” is “010”; and if we take XOR of these two numbers, we will get a number with all bits set to 1, i.e., 101 ^ 010 = 111
```
number ^ complement = all_bits_set
number ^ number ^ complement = number ^ all_bits_set
0 ^ complement = number ^ all_bits_set
complement = number ^ all_bits_set
```

**How do we calculate ‘all_bits_set’?** One way to calculate `all_bits_set` will be to first count the bits required to store the given number. We can then use the fact that for a number which is a complete power of ‘2’ i.e., it can be written as pow(2, n), if we subtract ‘1’ from such a number, we get a number which has ‘n’ least significant bits set to ‘1’. For example, ‘4’ which is a complete power of ‘2’, and ‘3’ (which is one less than 4) has a binary representation of ‘11’ i.e., it has ‘2’ least significant bits set to ‘1’.

```java
import java.lang.Math;

class CalculateComplement {
    public static int bitwiseComplement(int num) {
      int bitCount = 0;
      int n = num;
      while(n > 0) {
        bitCount++;
        n = n >> 1;
      }
      int allBitsSet = (int)Math.pow(2, bitCount) - 1;
      return num ^ allBitsSet;
    }

    public static void main( String args[] ) {
      System.out.println("Bitwise complement is: " + CalculateComplement.bitwiseComplement(8));
      System.out.println("Bitwise complement is: " + CalculateComplement.bitwiseComplement(10));
    }
}
```
**Time complexity:** `O(b)` where ‘b’ is the number of bits required to store the given number


---