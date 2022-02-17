---
title: Rotate a LinkedList
type: topic
section: In-place Reversal of a LinkedList
course: Grokking the Coding Interview
tags:
---
#### Problem
Given the head of a Singly LinkedList and a number ‘k’, rotate the LinkedList to the right by ‘k’ nodes.

#### Method: In-place Reversal of a LinkedList
Another way of defining the rotation is to take the sub-list of ‘k’ ending nodes of the LinkedList and connect them to the beginning. Other than that we have to do three more things:
1. Connect the last node of the LinkedList to the head, because the list will have a different tail after the rotation.
1. The new head of the LinkedList will be the node at the beginning of the sublist.
1. The node right before the start of sub-list will be the new tail of the rotated LinkedList.

```java
import java.util.*;

class ListNode {
  int value = 0;
  ListNode next;

  ListNode(int value) {
    this.value = value;
  }
}

class RotateList {

  public static ListNode rotate(ListNode head, int rotations) {
    if (head == null || head.next == null || rotations <= 0)
      return head;

    // find the length and the last node of the list
    ListNode lastNode = head;
    int listLength = 1;
    while (lastNode.next != null) {
      lastNode = lastNode.next;
      listLength++;
    }

    lastNode.next = head; // connect the last node with the head to make it a circular list
    rotations %= listLength; // no need to do rotations more than the length of the list
    int skipLength = listLength - rotations;
    ListNode lastNodeOfRotatedList = head;
    for (int i = 0; i < skipLength - 1; i++)
      lastNodeOfRotatedList = lastNodeOfRotatedList.next;

    // 'lastNodeOfRotatedList.next' is pointing to the sub-list of 'k' ending nodes
    head = lastNodeOfRotatedList.next;
    lastNodeOfRotatedList.next = null;
    return head;
  }

  public static void main(String[] args) {
    ListNode head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = new ListNode(6);

    ListNode result = RotateList.rotate(head, 3);
    System.out.print("Nodes of the reversed LinkedList are: ");
    while (result != null) {
      System.out.print(result.value + " ");
      result = result.next;
    }
  }
}
```
**Time complexity:** `O(N)`

#### Method: Rotate by one Step

```java
import java.util.*;

class ListNode {
  int value = 0;
  ListNode next;

  ListNode(int value) {
    this.value = value;
  }
}

class RotateList {

  public static ListNode rotate(ListNode head, int rotations) {
    if(head == null)
      return head;
    ListNode tail = head;
    int len = 1;
    while(tail.next != null) {
      tail = tail.next;
      len++;
    }
    rotations %= len;
    for(int i=0; i<rotations; i++) {
      ListNode temp = head;
      head = head.next;
      tail.next = temp;
      tail = temp;
      tail.next = null;
    }
    return head;
  }

  public static void main(String[] args) {
    ListNode head = new ListNode(1);
    head.next = new ListNode(2);
    head.next.next = new ListNode(3);
    head.next.next.next = new ListNode(4);
    head.next.next.next.next = new ListNode(5);
    head.next.next.next.next.next = new ListNode(6);

    ListNode result = RotateList.rotate(head, 3);
    System.out.print("Nodes of the reversed LinkedList are: ");
    while (result != null) {
      System.out.print(result.value + " ");
      result = result.next;
    }
  }
}
```
**Time complexity:** `O(N)`


---