---
title: Sum of Path Numbers
type: topic
section: Tree Depth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree where each node can only have a digit (0-9) value, each root-to-leaf path will represent a number. Find the total sum of all the numbers represented by all paths.
```
Explanation: The sume of all path numbers: 17 + 192 + 199
Output: 408
```

#### Method: Tree Depth First Search
This problem follows the Binary Tree Path Sum pattern. We can follow the same DFS approach. The additional thing we need to do is to keep track of the number representing the current path.

How do we calculate the path number for a node? Taking the first example mentioned above, say we are at node ‘7’. As we know, the path number for this node is ‘17’, which was calculated by: 1 * 10 + 7 => 17. We will follow the same approach to calculate the path number of each node.
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

class SumOfPathNumbers {
  public static int findSumOfPathNumbers(TreeNode root) {
    return findSumOfPathNumbersRec(root, 0);
  }
  private static int findSumOfPathNumbersRec(TreeNode node, int sum) {
    if(node == null)
      return 0;
    int temp = sum * 10 + node.val;
    if(node.left == null && node.right == null)
      return temp;
    return findSumOfPathNumbersRec(node.left, temp)
      + findSumOfPathNumbersRec(node.right, temp);
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(1);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(5);
    System.out.println("Total Sum of Path Numbers: " + SumOfPathNumbers.findSumOfPathNumbers(root));
  }
}
```
**Time complexity:** `O(N)`


---