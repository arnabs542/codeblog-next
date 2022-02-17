---
title: 'Binary Tree Basics'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
## Binary Tree
- A tree whose elements have at most 2 children is called a binary tree.
- Since each element in a binary tree can have only 2 children, we typically name them the left and right child.
- A **Binary Tree Node** contains following parts.
  1. Data
  2. Pointer(reference) to left child
  3. Pointer(reference) to right child

#### Properties of Binary Tree
1. The maximum number of nodes at level ‘l’ of a binary tree is 2l-1. (_Here level is number of nodes on path from root to the node (including root and node). Level of root is 1._)
2. Maximum number of nodes in a binary tree of height ‘h’ is 2h – 1. (Here height of a tree is maximum number of nodes on root to leaf path. Height of a tree with single node is considered as 1.)
3. In a Binary Tree with N nodes, minimum possible height or minimum number of levels is Log2(N+1). 
4. A Binary Tree with L leaves has at least (Log2L + 1) levels.
5. In Binary tree where every node has 0 or 2 children, number of leaf nodes is always one more than nodes with two children.

---
## Types of Binary Tree
1. **Full Binary Tree** 
    - A Binary Tree is full if every node has 0 or 2 children. No node can have 1 child.
    - We can also say a full binary tree is a binary tree in which all nodes except leaves have two children.
    - In a Full Binary, number of leaf nodes is number of internal nodes plus 1
    - The total number of nodes in a Full Binary Tree of height ‘h’ can be expressed as: 2h+1 ≤ total number of nodes ≤ 2​<sup>(h+1)</sup>​​ −1
2. **Complete Binary Tree**
    - A Binary Tree is complete Binary Tree if all levels are completely filled except possibly the last level and the last level has all keys as left as possible
    - Total number of **nodes** in a complete binary tree of height h = 2<sup>h+1</sup>-1
    - Total number of **non-leaf nodes** in a complete binary tree of height h = 2<sup>h</sup>-1
    - Total number of **leaf nodes** in a complete binary tree of height h = 2<sup>h</sup>
    - Nodes are present in between range of 2<sup>​h</sup>​​ < Nodes < 2<sup>h+1</sup>-1
    - Example: **Binary Heap**.
3. **Perfect Binary Tree**
    - A Binary tree is Perfect Binary Tree in which all internal nodes have two children and all leaves are at the same level. (Full and Complete)
    - The total number of nodes in a perfect binary tree of height ‘h’ are given as: 2<sup>(h+1)</sup>-1
    - The total number of leaf nodes are given as 2<sup>h</sup> or (n+1)/2
4. **Skewed Binary Tree**​
    - A Skewed Binary Tree is a type of Binary Tree where all nodes are shifted to either the left or right side.
    - It can also be defined as a Binary Tree in which the number of children is firmly restricted to one at each node.
    - Furthermore, the side at which that single child node is present, either left or right, is also fixed throughout the tree.
    - This type of Binary Tree structure is avoided at all cost, as we will have to perform n number of comparisons to search for a node, where n is the total number of nodes in the tree.
    - Types:
        1. Left-Skewed Binary Tree
        2. Right-Skewed Binary Tree
​
5. **Balanced Binary Tree**
    - A binary tree is balanced if the height of the tree is O(Log n) where n is the number of nodes.
    - For Example, **AVL tree** maintains O(Log n) height by making sure that the difference between heights of left and right subtrees is atmost 1.
    - **Red-Black trees** maintain O(Log n) height by making sure that the number of Black nodes on every root to leaf paths are same and there are no adjacent red nodes.
    - Balanced Binary Search trees are performance wise good as they provide O(log n) time for search, insert and delete.
6. **degenerate (or pathological) tree**
    - A Tree where every internal node has one child.
    - Such trees are performance-wise same as linked list.

---
## Handshaking Lemma
#### What is Handshaking Lemma?
- In every finite undirected graph number of vertices with odd degree is always even.
- The handshaking lemma is a consequence of the degree sum formula (also sometimes called the handshaking lemma)

#### Interesting facts that can be proved using Handshaking lemma
1. In a k-ary tree where every node has either 0 or k children, following property is always true.
```
L = (k - 1)*I + 1
Where L = Number of leaf nodes
      I = Number of internal nodes  
```
2. In Binary tree, number of leaf nodes is always one more than nodes with two children.
```
L = T + 1
Where L = Number of leaf nodes
      T = Number of internal nodes with two children 
```

