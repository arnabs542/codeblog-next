---
title: Level Averages in a Binary Tree
type: topic
section: Tree Breadth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree, populate an array to represent the averages of all of its levels.

#### Method: Tree Breadth First Search
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

class LevelAverage {
  public static List<Double> findLevelAverages(TreeNode root) {
    List<Double> result = new ArrayList<>();
    if(root == null)
      return result;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while(!q.isEmpty()) {
      int levelSize = q.size();
      double sum = 0;
      for(int i=0; i<levelSize; i++) {
        TreeNode curr = q.poll();
        sum += curr.val;
        if(curr.left != null)
          q.offer(curr.left);
        if(curr.right != null)
          q.offer(curr.right);
      }
      result.add(sum/levelSize);
    }
    return result;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(12);
    root.left = new TreeNode(7);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(9);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(10);
    root.right.right = new TreeNode(5);
    List<Double> result = LevelAverage.findLevelAverages(root);
    System.out.print("Level averages are: " + result);
  }
}
```
**Time complexity:** `O(N)`

**Space complexity:** `O(N)`

#### Similar Problems
**Problem 1:** Find the largest value on each level of a binary tree.

**Solution:** We will follow a similar approach, but instead of having a running sum we will track the maximum value of each level.

---