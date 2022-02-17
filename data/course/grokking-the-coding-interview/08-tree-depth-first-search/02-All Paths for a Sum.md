---
title: All Paths for a Sum
type: topic
section: Tree Depth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree and a number ‘S’, find all paths from root-to-leaf such that the sum of all the node values of each path equals ‘S’.

#### Method: Tree Depth First Search
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. There will be two differences:
- Every time we find a root-to-leaf path, we will store it in a list.
- We will traverse all paths and will not stop processing after finding the first path.

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

class FindAllTreePaths {
  public static List<List<Integer>> findPaths(TreeNode root, int sum) {
    List<List<Integer>> allPaths = new ArrayList<>();
    List<Integer> currPath = new ArrayList<>();
    findPathsRec(allPaths, root, sum, currPath);
    return allPaths;
  }
  public static void findPathsRec(List<List<Integer>> allPaths, TreeNode node, int sum, List<Integer> currPath) {
    if(node == null)
      return;
    currPath.add(node.val);
    // if the current node is a leaf and its value is equal to sum, save the current path
    if(node.val == sum && node.left == null && node.right == null)
      allPaths.add(new ArrayList<>(currPath));
    else {
      // traverse the left and right sub-trees
      findPathsRec(allPaths, node.left, sum - node.val, currPath);
      findPathsRec(allPaths, node.right, sum - node.val, currPath);
    }
    // remove the current node from the path to backtrack, 
    // we need to remove the current node while we are going up the recursive call stack.
    currPath.remove(currPath.size() - 1);
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(12);
    root.left = new TreeNode(7);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(10);
    root.right.right = new TreeNode(5);
    int sum = 23;
    List<List<Integer>> result = FindAllTreePaths.findPaths(root, sum);
    System.out.println("Tree paths with sum " + sum + ": " + result);
  }
}
```
**Time complexity:** `O(N^2)`

#### Similar Problems #
**Problem 1:** Given a binary tree, return all root-to-leaf paths.

**Solution:** We can follow a similar approach. We just need to remove the “check for the path sum”.

**Problem 2:** Given a binary tree, find the root-to-leaf path with the maximum sum.

**Solution:** We need to find the path with the maximum sum. As we traverse all paths, we can keep track of the path with the maximum sum.

---