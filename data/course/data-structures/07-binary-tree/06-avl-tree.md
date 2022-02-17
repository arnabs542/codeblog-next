---
title: 'AVL Tree'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
## What is an AVL Tree?
- AVL trees are a self-balanced special type of Binary Search Tree with just one exception: **For each Node, the maximum height difference between the left and right sub-trees can only be one.**
- If at any point their difference becomes more than one, then re-balancing is applied to make it a valid AVL tree.

## When to use AVL Trees?
- As AVL are strictly balanced, AVL Trees are preferred in those applications where the lookup​ is the​ ​ most vital operation.

---
## Implementation
the terms which we will be using while re-balancing the tree.
- **Node U:** an unbalanced node
- **Node C:** child node of node U
- **Node G:** grandchild node of node U

---
## Insert
To rebalance the tree, we will perform rotations on the subtree with Node U as being the root node.
There are two types of rotations: **left** and **right**

We came across four different scenarios based on the arrangements of Nodes U, C and, G.
1. **Left-Left:** Node C is the left-child of Node U, and Node G is the left-child of Node C.
    - As you can see in the left-left case, we only need to make a single rotation towards the right at Node U to balance the AVL tree. In the final balanced version, Node C becomes the parent node of Node G and U and its two subtrees become balanced.
2. **Left-Right:** Node C is the left-child of Node U, and Node G is the right-child of Node C.
    - In the left-right case we need to make two rotations:
        - First is a left rotation at Node C.
        - Second is a right rotation at Node U.
    - These two rotations balance the AVL tree. In this case, Node G becomes the parent node of both Node C and U.
3. **Right-Right:** Node C is the right-child of Node U, and Node G is the right-child of Node C.
    - The right-right case is just like the left-left case. The only difference is that instead of rotating right, we ​need to make a ​single rotation towards the left at Node U to balance the AVL tree. In the final balanced version, Node C becomes the parent node of Node G and U and its two subtrees become balanced.
4. **Right-Left:** Node C is the right-child of Node U, and Node G is the left-child of Node C.
    - The right-left case is similar to the left-right case. The only difference is that the two rotations performed are as follows:
        - First is a right rotation at Node C.
        - Second is a left rotation at Node U.
    - These two rotations balance the AVL tree. In this case, Node G becomes the parent node of both Node C and U.

**Time Complexity:** Considering that it takes constant time to do left-right rotation operations and update the height to get a balanced tree, the time complexity of an AVL insert remains the same as BST insert: O(h) where h is the height of the tree. However, since the AVL tree is balanced, the height is O(Logn); so time complexity of an AVL insert is O(Logn).

---
## Delete
The deletion operation adds an extra step after the insertion method’s rotation and balancing of the first unbalanced node.
After fixing the first unbalanced node through rotations, start moving up and fix the next unbalanced node. Keep on fixing the unbalanced nodes until you reach the root.

#### Steps for Deletion
Step 1: Delete currentNode #
- Delete the currentNode in the same way as we did in BST deletion. At this point, the tree will become unbalanced, and we would need to perform some kind of rotation (left or right) to rebalance the tree.

Step 2: Traverse Upwards
- Start traversing from currentNode upwards till you find the first unbalanced node.

Step 3: Rebalance the Tree
- To rebalance the tree, we will perform rotations on the subtree where U is the root node.
- Steps for rebalance is same as insertion

#### Time Complexity
Considering that it takes constant time to do left-right rotation operations and update the height to get a balanced tree, the time complexity of an AVL insert remains the same as a BST insert: O(h) where h is the height of the tree. However, since AVL tree is balanced, the height is O(Logn). Therefore, the time complexity of AVL delete is O(Logn).

---