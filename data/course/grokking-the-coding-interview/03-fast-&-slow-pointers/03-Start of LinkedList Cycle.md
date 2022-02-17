---
title: 'Start of LinkedList Cycle'
type: topic
section: Fast & Slow pointers
course: Grokking the Coding Interview
tags:
- System Design
---
#### Problem
Given the head of a Singly LinkedList that contains a cycle, write a function to find the starting node of the cycle.

#### Method: Fast & Slow pointers
If we know the length of the LinkedList cycle, we can find the start of the cycle through the following steps:
1. Take two pointers. Let’s call them pointer1 and pointer2.
1. Initialize both pointers to point to the start of the LinkedList.
1. We can find the length of the LinkedList cycle using the approach discussed in LinkedList Cycle. Let’s assume that the length of the cycle is ‘K’ nodes.
1. Move pointer2 ahead by ‘K’ nodes.
1. Now, keep incrementing pointer1 and pointer2 until they both meet.
1. As pointer2 is ‘K’ nodes ahead of pointer1, which means, pointer2 must have completed one loop in the cycle when both pointers meet. Their meeting point will be the start of the cycle.

```
distance of start of loop from head = d
At the point of meeting, distance covered by 2 pointers
length of loop = c
distance of meeting point from start of cycle = k

slow => N = d + k + cx
fast => 2N = d + k + cy

So, N = c(x-y)

substituting 1st eqn in 2nd eqn.
2d + 2k + 2cx = d + k + cy
d + k = c(y - 2x) = multiple of length of loop length

```
```java
class ListNode {
  int value = 0;
  ListNode next;

  ListNode(int value) {
    this.value = value;
  }
}

class LinkedListCycleStart {

  public static ListNode findCycleStart(ListNode head) {
    int cycleLength = 0;
    // find the LinkedList cycle
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
      fast = fast.next.next;
      slow = slow.next;
      if (slow == fast) { // found the cycle
        cycleLength = calculateCycleLength(slow);
        break;
      }
    }

    return findStart(head, cycleLength);
  }

  private static int calculateCycleLength(ListNode slow) {
    ListNode current = slow;
    int cycleLength = 0;
    do {
      current = current.next;
      cycleLength++;
    } while (current != slow);
    
    return cycleLength;
  }

  private static ListNode findStart(ListNode head, int cycleLength) {
    ListNode pointer1 = head, pointer2 = head;
    // move pointer2 ahead 'cycleLength' nodes
    while (cycleLength > 0) {
      pointer2 = pointer2.next;
      cycleLength--;
    }

    // increment both pointers until they meet at the start of the cycle
    while (pointer1 != pointer2) {
      pointer1 = pointer1.next;
      pointer2 = pointer2.next;
    }

    return pointer1;
  }

  public static void main(String[] args) {
    ListNode head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = new ListNode(6);

    head.next.next.next.next.next.next = head.next.next;
    System.out.println("LinkedList cycle start: " + LinkedListCycleStart.findCycleStart(head).value);

    head.next.next.next.next.next.next = head.next.next.next;
    System.out.println("LinkedList cycle start: " + LinkedListCycleStart.findCycleStart(head).value);

    head.next.next.next.next.next.next = head;
    System.out.println("LinkedList cycle start: " + LinkedListCycleStart.findCycleStart(head).value);
  }
}
```
**Time complexity:** `O(N)`


---