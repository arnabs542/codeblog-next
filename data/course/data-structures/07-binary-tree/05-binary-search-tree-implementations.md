---
title: 'Binary Search Tree Implementations'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
#### Binary Search Tree Implementations

#### Insert
**Method 1: Recursive**

Time Complexity: O(h)

**Method 2: Iterative**

Time Complexity: O(h)

---
#### Search
Time Complexity: O(log2​(n))

---
#### Delete
1. **Deletion at Leaf Node:**
If the node we want to delete is present at the leaf node in a Binary Search Tree, we simply remove that leaf node. After deletion, its parent node will point to null.
2. **Deletion at Parent Node with one child:** If the parent node that you want to delete has only one child, then delete the parent node first. After doing that, take the deleted parent-node’s child and link it with the parent node of the deleted node. Now the parent of the deleted node will become the parent of the child node.
3. **Deletion at Parent Node with two childs:** Here, we will replace the node to be deleted with value just greater than it and then delete it.
    - Start by traversing the right subtree of the soon-to-be deleted parent node in such a way that you reach the left-most value—the value that will appear to be the smallest value in the whole subtree.
    - Replace the value of the node, found in the last step, with the parent’s node value.
    - Finally, delete the leaf node.

Time Complexity: O(h)

---