---
title: 'Tree Basics'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
## Tree
- Unlike Arrays, Linked Lists, Stack and queues, which are linear data structures, **Trees** are hierarchical data structures.
- A tree consists of nodes (vertices) that are connected using pointers (edges).
- The topmost node is called root of the tree. The elements that are directly under an element are called its children. The element directly above something is called its parent.

#### Why Trees?
1. One reason to use trees might be because you want to store information that naturally forms a hierarchy. For example, the file system on a computer.
2. Trees (with some ordering e.g., BST) provide moderate access/search (quicker than Linked List and slower than arrays).
3. Trees provide moderate insertion/deletion (quicker than Arrays and slower than Unordered Linked Lists).
4. Like Linked Lists and unlike Arrays, Trees don’t have an upper limit on number of nodes as nodes are linked using pointers.

---
## Terminology Used in Trees
- **Nodes:** Hold data
- **Root:** The uppermost node of a tree
- **Parent Node:** A node which is connected to one or more nodes on the lower level (Child Nodes).
- **Child Node:** A node which is linked to an upper node (Parent Node)
- **Sibling Node:** Nodes that have the same Parent Node
- **Leaf Node:** A node that doesn’t have any Child Node
- **Sub-tree:** A subtree is a portion of a tree that can be viewed as a complete tree on its own. Any node in a tree, together with all the connected nodes below it, comprise a subtree of the original tree. Think of the sub-tree as an analogy for the term, proper subset.
- **Degree:** The degree of a node refers to the total number of sub-trees of a node
- **Depth:** The number of connections (edges) from the root to a node is known as the depth of that node.
- **Level:** `(Depth Of Node) + 1`
- **Height of a Node:** The maximum number of connections between the node and a leaf node in its path is known as the height of that node.
- **Height of a Tree:** The height of a tree is simply the height of its root node.

---
## Main applications of trees
1. Manipulate hierarchical data.
2. Make information easy to search (see tree traversal).
3. Manipulate sorted lists of data.
4. As a workflow for compositing digital images for visual effects.
5. Router algorithms
6. Form of a multi-stage decision-making (see business chess).
7. Binary Search Tree is a tree that allows fast search, insert, delete on a sorted data. It also allows finding closest item
8. Heap is a tree data structure which is implemented using arrays and used to implement priority queues.
9. B-Tree and B+ Tree : They are used to implement indexing in databases.
10. Syntax Tree: Used in Compilers.
11. K-D Tree: A space partitioning tree used to organize points in K dimensional space.
12. Trie : Used to implement dictionaries with prefix lookup.
13. Suffix Tree : For quick pattern searching in a fixed text.
14. Spanning Trees and shortest path trees are used in routers and bridges respectively in computer networks
15. As a workflow for compositing digital images for visual effects.

---
## Types of Trees
##### 1. N-ary Tree
- In N-ary trees, each node can have child nodes anywhere from 0 to N. So if it’s a 2-ary tree, commonly known as a Binary Tree, it can have a max. of 0-2 child nodes.

##### 2. Balanced Tree
- A balanced tree is a tree in which almost all leaf nodes are present at the same level.
```
Height(Tree) = O(log​2(nodes))
```

- Or in simpler words, make the tree **height-balanced**; i.e. the difference between the height of the left and right sub-trees of each node should not be more than one. Mathematically, it can be written as:
```
|Height(LeftSubTree) - Height(RightSubTree) |<= 1
```

##### 3. Binary Tree

##### 4. BinarySearchTree

##### 5. AVL Tree

##### 6. Red-Black Tree

##### 7. 2-3 Tree


---