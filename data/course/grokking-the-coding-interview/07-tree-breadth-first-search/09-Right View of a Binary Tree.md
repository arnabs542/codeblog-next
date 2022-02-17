---
title: Right View of a Binary Tree
type: topic
section: Tree Breadth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree, return an array containing nodes in its right view. The right view of a binary tree is the set of **nodes visible when the tree is seen from the right side**.

#### Method: Tree Breadth First Search
This problem follows the Binary Tree Level Order Traversal pattern. We can follow the same BFS approach. The only additional thing we will be do is to append the last node of each level to the result array.
```java
import java.util.*;

class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode(int x) {
    val = x;
  }
};

class RightViewTree {
  public static List<TreeNode> traverse(TreeNode root) {
    List<TreeNode> result = new ArrayList<>();
    if(root == null)
      return result;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while(!q.isEmpty()) {
      int levelSize = q.size();
      for(int i=0; i<levelSize; i++) {
        TreeNode curr = q.poll();
        if(i == levelSize - 1)
          result.add(curr);
        if(curr.left != null)
          q.offer(curr.left);
        if(curr.right != null)
          q.offer(curr.right);
      }
    }
    return result;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(12);
    root.left = new TreeNode(7);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(9);
    root.right.left = new TreeNode(10);
    root.right.right = new TreeNode(5);
    root.left.left.left = new TreeNode(3);
    List<TreeNode> result = RightViewTree.traverse(root);
    for (TreeNode node : result) {
      System.out.print(node.val + " ");
    }
  }
}
```
**Time complexity:** `O(N)`

#### Similar Questions
**Problem 1:** Given a binary tree, return an array containing nodes in its left view. The left view of a binary tree is the set of nodes visible when the tree is seen from the left side.

**Solution:** We will be following a similar approach, but instead of appending the last element of each level we will be appending the first element of each level to the output array.

---