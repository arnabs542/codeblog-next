---
title: Count Paths for a Sum
type: topic
section: Tree Depth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree and a number ‘S’, find all paths in the tree such that the sum of all the node values of each path equals ‘S’. Please note that the **paths can start or end at any node** but all paths must follow direction from parent to child (top to bottom).

#### Method: Tree Depth First Search
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. But there will be four differences:
1. We will keep track of the current path in a list which will be passed to every recursive call.
2. Whenever we traverse a node we will do two things:
    - Add the current node to the current path.
    - As we added a new node to the current path, we should find the sums of all sub-paths ending at the current node. If the sum of any sub-path is equal to ‘S’ we will increment our path count.
3. We will traverse all paths and will not stop processing after finding the first path.
4. Remove the current node from the current path before returning from the function. This is needed to Backtrack while we are going up the recursive call stack to process other paths.

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

class CountAllPathSum {
  public static int countPaths(TreeNode root, int S) {
    List<Integer> currPath = new LinkedList<>();
    return countPathsRec(root, S, currPath);
  }
  private static int countPathsRec(TreeNode node, int S, List<Integer> currPath) {
    if(node == null)
      return 0;
    currPath.add(node.val);
    int count = 0, sum = 0;
    // find the sums of all sub-paths in the current path list
    ListIterator<Integer> pathIterator = currPath.listIterator(currPath.size());
    while(pathIterator.hasPrevious()) {
      sum += pathIterator.previous();
      if (sum == S) {
        count++;
      }
    }
    count += countPathsRec(node.left, S, currPath);
    count += countPathsRec(node.right, S, currPath);
    return count;
  }
  
  public static void main(String[] args) {
    TreeNode root = new TreeNode(12);
    root.left = new TreeNode(7);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(10);
    root.right.right = new TreeNode(5);
    System.out.println("Tree has path: " + CountAllPathSum.countPaths(root, 11));
  }
}

```
**Time complexity:** `O(N^2)`


---