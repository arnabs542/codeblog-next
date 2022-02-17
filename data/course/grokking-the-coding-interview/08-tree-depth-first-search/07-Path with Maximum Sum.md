---
title: Path with Maximum Sum
type: topic
section: Tree Depth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Find the path with the maximum sum in a given binary tree. Write a function that returns the maximum sum. A path can be defined as a sequence of nodes between any two nodes and doesn’t necessarily pass through the root.

#### Method: Tree Depth First Search
This problem follows the Binary Tree Path Sum pattern and shares the algorithmic logic with Tree Diameter. We can follow the same DFS approach. The only difference will be to ignore the paths with negative sums. Since we need to find the overall maximum sum, we should ignore any path which has an overall negative sum.
```java
class TreeNode {
  int val;
  TreeNode left;
  TreeNode right;

  TreeNode(int x) {
    val = x;
  }
};

class MaximumPathSum {
  private static int maxSum;
  public static int findMaximumPathSum(TreeNode root) {
    maxSum = Integer.MIN_VALUE;
    findMaximumPathSumRec(root);
    return maxSum;
  }
  private static int findMaximumPathSumRec(TreeNode node) {
    if(node == null)
      return 0;
    int maxLeft = Math.max(findMaximumPathSumRec(node.left), 0);
    int maxRight = Math.max(findMaximumPathSumRec(node.right), 0);
    // ignore paths with negative sums, since we need to find the maximum sum we should
    // ignore any path which has an overall negative sum.
    int tempMaxSum = maxLeft + maxRight + node.val;
    maxSum = Math.max(maxSum, tempMaxSum);
    // maximum sum of any path from the current node will be equal to the maximum of 
    // the sums from left or right subtrees plus the value of the current node
    return Math.max(maxLeft, maxRight) + node.val;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    System.out.println("Maximum Path Sum: " + MaximumPathSum.findMaximumPathSum(root));
    
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    root.right.left.left = new TreeNode(7);
    root.right.left.right = new TreeNode(8);
    root.right.right.left = new TreeNode(9);
    System.out.println("Maximum Path Sum: " + MaximumPathSum.findMaximumPathSum(root));
    
    root = new TreeNode(-1);
    root.left = new TreeNode(-3);
    System.out.println("Maximum Path Sum: " + MaximumPathSum.findMaximumPathSum(root));
  }
}
```
**Time complexity:** `O(N)`


---