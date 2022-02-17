---
title: Binary Tree Level Order Traversal
type: topic
section: Tree Breadth First Search
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a binary tree, populate an array to represent its level-by-level traversal. You should populate the values of all nodes of each level from left to right in separate sub-arrays.

#### Method: Tree Breadth First Search
Since we need to traverse all nodes of each level before moving onto the next level, we can use the **Breadth First Search (BFS)** technique to solve this problem.

We can use a Queue to efficiently traverse in BFS fashion. Here are the steps of our algorithm:
1. Start by pushing the root node to the queue.
1. Keep iterating until the queue is empty.
1. In each iteration, first count the elements in the queue (let’s call it levelSize). We will have these many nodes in the current level.
1. Next, remove levelSize nodes from the queue and push their value in an array to represent the current level.
1. After removing each node from the queue, insert both of its children into the queue.
1. If the queue is not empty, repeat from step 3 for the next level.

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

class LevelOrderTraversal {
  public static List<List<Integer>> traverse(TreeNode root) {
    List<List<Integer>> result = new ArrayList<List<Integer>>();
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while(!q.isEmpty()) {
      int levelSize = q.size();
      List<Integer> currLevel = new ArrayList<>(levelSize);
      for(int i=0; i<levelSize; i++) {
        TreeNode curr = q.poll();
        currLevel.add(curr.val);
        if(curr.left != null)
          q.offer(curr.left);
        if(curr.right != null)
          q.offer(curr.right);
      }
      result.add(currLevel);
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
    List<List<Integer>> result = LevelOrderTraversal.traverse(root);
    System.out.println("Level order traversal: " + result);
  }
}
```
**Time complexity:** `O(N)`

**Space complexity:** `O(N)`

---