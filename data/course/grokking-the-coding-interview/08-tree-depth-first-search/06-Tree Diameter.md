---
title: Tree Diameter
type: topic
section: Tree Depth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree, find the length of its diameter. The diameter of a tree is the number of nodes on the longest path between any two leaf nodes. The diameter of a tree may or may not pass through the root.
Note: You can always assume that there are at least two leaf nodes in the given tree.

#### Method: Tree Depth First Search
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. There will be a few differences:
1. At every step, we need to find the height of both children of the current node. For this, we will make two recursive calls similar to DFS.
2. The height of the current node will be equal to the maximum of the heights of its left or right children, plus ‘1’ for the current node.
3. The tree diameter at the current node will be equal to the height of the left child plus the height of the right child plus ‘1’ for the current node: `diameter = leftTreeHeight + rightTreeHeight + 1`. To find the overall tree diameter, we will use a class level variable. This variable will store the maximum diameter of all the nodes visited so far, hence, eventually, it will have the final tree diameter.

```java
class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode(int x) {
    val = x;
  }
};

class TreeDiameter {
  private static int treeDiameter = 0;

  public static int findDiameter(TreeNode root) {
    calculateHight(root);
    return treeDiameter;
  }
  private static int calculateHight(TreeNode node) {
    if(node == null)
      return 0;
    int lh = calculateHight(node.left);
    int rh = calculateHight(node.right);
    int diameter =  lh + rh + 1;
    treeDiameter = Math.max(treeDiameter, diameter);
    return Math.max(lh, rh) + 1;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    System.out.println("Tree Diameter: " + TreeDiameter.findDiameter(root));
    root.left.left = null;
    root.right.left.left = new TreeNode(7);
    root.right.left.right = new TreeNode(8);
    root.right.right.left = new TreeNode(9);
    root.right.left.right.left = new TreeNode(10);
    root.right.right.left.left = new TreeNode(11);
    System.out.println("Tree Diameter: " + TreeDiameter.findDiameter(root));
  }
}
```
**Time complexity:** `O(N)`


---