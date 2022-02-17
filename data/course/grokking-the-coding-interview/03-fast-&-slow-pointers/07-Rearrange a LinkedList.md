---
title: Rearrange a LinkedList
type: topic
section: Fast & Slow pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given the head of a Singly LinkedList, write a method to modify the LinkedList such that the ((nodes from the second half of the LinkedList are inserted alternately to the nodes from the first half in reverse order)). So if the LinkedList has nodes `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null`, your method should return `1 -> 6 -> 2 -> 5 -> 3 -> 4 -> null`.

```json
Input: 2 -> 4 -> 6 -> 8 -> 10 -> 12 -> null
Output: 2 -> 12 -> 4 -> 10 -> 6 -> 8 -> null 
```

#### Method: Fast & Slow pointers
This problem shares similarities with Palindrome LinkedList. To rearrange the given LinkedList we will follow the following steps:
1. We can use the Fast & Slow pointers method similar to Middle of the LinkedList to find the middle node of the LinkedList.
1. Once we have the middle of the LinkedList, we will reverse the second half of the LinkedList.
1. Finally, we’ll iterate through the first half and the reversed second half to produce a LinkedList in the required order.

```java

class ListNode {
  int value = 0;
  ListNode next;

  ListNode(int value) {
    this.value = value;
  }
}

class RearrangeList {
  public static void reorder(ListNode head) {
    if(head == null || head.next == null)
      return;
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    // slow is now pointing to the middle node
    ListNode headSecondHalf = reverse(slow); // reverse the second half
    ListNode headFirstHalf = head;
    // rearrange to produce the LinkedList in the required order
    while (headFirstHalf != null && headSecondHalf != null) {
      ListNode temp = headFirstHalf.next;
      headFirstHalf.next = headSecondHalf;
      headFirstHalf = temp;

      temp = headSecondHalf.next;
      headSecondHalf.next = headFirstHalf;
      headSecondHalf = temp;
    }
    // set the next of the last node to 'null'
    if (headFirstHalf != null)
      headFirstHalf.next = null;
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
    head.next.next.next = new ListNode(8);
    head.next.next.next.next = new ListNode(10);
    head.next.next.next.next.next = new ListNode(12);
    RearrangeList.reorder(head);
    while (head != null) {
      System.out.print(head.value + " ");
      head = head.next;
    }
  }
}
```
**Time complexity:** `O(N)`


---