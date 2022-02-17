---
title: 'Binary Search Tree'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
#### What is a Binary Search Tree (BST)?
- For all the nodes in a BST, the values of all the nodes in the left sub-tree of the current node are less than or equal to the value of the node itself. All the node values in the right subtree are greater than the value of the current node. This is referred to as the BST rule.
```
NodeValues(LeftSubtree) <= CurrentNodeValue < NodeValues(RightSubTree)
```

---
## Advantages of BST over Hash Table
Hash Table supports following operations in Θ(1) time.
1) Search
2) Insert
3) Delete

The time complexity of above operations in a self-balancing Binary Search Tree (BST) (like Red-Black Tree, AVL Tree, Splay Tree, etc) is O(Logn).

But,
- We can get all keys in sorted order by just doing Inorder Traversal of BST. This is not a natural operation in Hash Tables and requires extra efforts.
- Doing order statistics, finding closest lower and greater elements, doing range queries are easy to do with BSTs. Like sorting, these operations are not a natural operation with Hash Tables.
- BSTs are easy to implement compared to hashing, we can easily implement our own customized BST. To implement Hashing, we generally rely on libraries provided by programming languages.
- With Self-Balancing BSTs, all operations are guaranteed to work in O(Logn) time. But with Hashing, Θ(1) is average time and some particular operations may be costly, especially when table resizing happens.


---