---
title: 'Palindrome LinkedList'
type: topic
section: Fast & Slow pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given the head of a Singly LinkedList, write a method to check if the LinkedList is a palindrome or not.
```
Input: 2 -> 4 -> 6 -> 4 -> 2 -> null
Output: true
Input: 2 -> 4 -> 6 -> 4 -> 2 -> 2 -> null
Output: false
```

#### Method: Fast & Slow pointers
As we know, a palindrome LinkedList will have nodes values that read the same backward or forward. This means that if we divide the LinkedList into two halves, the node values of the first half in the forward direction should be similar to the node values of the second half in the backward direction. As we have been given a Singly LinkedList, we can’t move in the backward direction. To handle this, we will perform the following steps:
- We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
- Once we have the middle of the LinkedList, we will reverse the second half.
- Then, we will compare the first half with the reversed second half to see if the LinkedList represents a palindrome.
- Finally, we will reverse the second half of the LinkedList again to revert and bring the LinkedList back to its original form.

```java

class ListNode {
  int value = 0;
  ListNode next;

  ListNode(int value) {
    this.value = value;
  }
}

class PalindromicLinkedList {

  public static boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null)
      return true;

    // find middle of the LinkedList
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    ListNode headSecondHalf = reverse(slow); // reverse the second half
    ListNode copyHeadSecondHalf = headSecondHalf; // store the head of reversed part to revert back later

    // compare the first and the second half
    while (head != null && headSecondHalf != null) {
      if (head.value != headSecondHalf.value) {
        break; // not a palindrome
      }
      head = head.next;
      headSecondHalf = headSecondHalf.next;
    }

    reverse(copyHeadSecondHalf); // revert the reverse of the second half
    if (head == null || headSecondHalf == null) // if both halves match
      return true;
    return false;
  }

  private static ListNode reverse(ListNode head) {
    ListNode prev = null;
    while (head != null) {
      ListNode next = head.next;
      head.next = prev;
      prev = head;
      head = next;
    }
    return prev;
  }

  public static void main(String[] args) {
    ListNode head = new ListNode(2);
    head.next = new ListNode(4);
    head.next.next = new ListNode(6);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(2);
    System.out.println("Is palindrome: " + PalindromicLinkedList.isPalindrome(head));

    head.next.next.next.next.next = new ListNode(2);
    System.out.println("Is palindrome: " + PalindromicLinkedList.isPalindrome(head));
  }
}
```
**Time complexity:** `O(N)`


---