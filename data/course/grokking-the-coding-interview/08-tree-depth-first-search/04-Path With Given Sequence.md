---
title: Path With Given Sequence
type: topic
section: Tree Depth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree and a number sequence, find if the sequence is present as a root-to-leaf path in the given tree.

#### Method: Tree Depth First Search
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach and additionally, track the element of the given sequence that we should match with the current node. Also, we can return false as soon as we find a mismatch between the sequence and the node value.
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

class PathWithGivenSequence {
  public static boolean findPath(TreeNode root, int[] sequence) {
    if(root == null)
      return sequence.length == 0;
    return findPathRec(root, sequence, 0);
  }
  private static boolean findPathRec(TreeNode node, int[] sequence, int i) {
    if(node == null)
      return false;
    if(i >= sequence.length)
      return false;
    if(node.val != sequence[i])
      return false;
    if(node.left == null && node.right == null && i == sequence.length - 1)
      return true;
    return findPathRec(node.left, sequence, i + 1) || findPathRec(node.right, sequence, i + 1);
  }
  
  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(1);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(5);

    System.out.println("Tree has path sequence: " + PathWithGivenSequence.findPath(root, new int[] { 1, 0, 7 }));
    System.out.println("Tree has path sequence: " + PathWithGivenSequence.findPath(root, new int[] { 1, 1, 6 }));
  }
}
```
**Time complexity:** `O(N)`


---