---
title: Connect All Level Order Siblings
type: topic
section: Tree Breadth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree, connect each node with its level order successor. The last node of each level should point to the first node of the next level.

#### Method: Tree Breadth First Search
This problem follows the Binary Tree Level Order Traversal pattern. We can follow the same BFS approach. The only difference will be that while traversing we will remember (irrespective of the level) the previous node to connect it with the current node.
```java
import java.util.*;

class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;
  TreeNode next;

  TreeNode(int x) {
    val = x;
    left = right = next = null;
  }
  // tree traversal using 'next' pointer
  public void printTree() {
    TreeNode current = this;
    System.out.print("Traversal using 'next' pointer: ");
    while (current != null) {
      System.out.print(current.val + " ");
      current = current.next;
    }
  }
};

class ConnectAllSiblings {
  public static void connect(TreeNode root) {
    if(root == null) return;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    TreeNode curr = null, prev = null;
    while(!q.isEmpty()) {
      curr = q.poll();
      if(prev != null)
        prev.next = curr;
      prev = curr;
      if(curr.left != null)
        q.offer(curr.left);
      if(curr.right != null)
        q.offer(curr.right);
    }
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(12);
    root.left = new TreeNode(7);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(9);
    root.right.left = new TreeNode(10);
    root.right.right = new TreeNode(5);
    ConnectAllSiblings.connect(root);

    // level order traversal using 'next' pointer
    TreeNode current = root;
    System.out.println("Traversal using 'next' pointer: ");
    while (current != null) {
      System.out.print(current.val + " ");
      current = current.next;
    }
  }
}
```
**Time complexity:** `O(N)`


---