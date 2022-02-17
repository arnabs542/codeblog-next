---
title: 'Red Black Tree'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
## What is a Red-Black Tree?
- A Red-Black Tree is another type of self-balancing Binary Search Tree, just like the AVL Trees that we studied in the previous lesson, but with some additions.
- The nodes in a Red-Black Tree are colored to either red or black. Colored nodes help in re-balancing the tree after **insertion** or **deletion**.
- Colored nodes help in re-balancing the tree after insertion or deletion. There are also some cases used to balance the Red-Black Trees.

#### Properties of Red-Black Trees
1. Every node has either Red or Black color.
2. The root is always colored black.
3. Two red nodes cannot be adjacent, i.e. no red parent can have a red child and vice versa.
4. Every path from the root to a leaf must contain the exact same number of black-colored nodes.
5. Every null node is considered to be black in color.

#### Time Complexity
Balancing the tree doesn’t result in a tree being perfectly balanced, but it is good enough to get the time complexity close to O(logn) for basic operations like searching, deletion, and insertion.

#### AVL vs Red-Black Trees
Although AVL Trees are more balanced than Red-Black Trees, AVL Trees take more rotations during insertion and deletion operations than Red-Black Trees. So, if you have a search intensive application where insertion and deletion are not that frequent, then use AVL Trees. Otherwise, use Red-Black Trees for those applications involving more insertions and deletions.

---
## Insertion

#### Steps:
1. Insert currentNode using the standard BST insertion technique that we studied earlier, and make currentNode red.
2. If currentNode is the root, then change the color of currentNode to black.
3. If currentNode is not the root, then we will have to perform some operations to make the tree follow the Red-Black property.

#### Rebalancing the Tree
To balance an unbalanced tree, we have two techniques which are used depending on some conditions that we will discuss shortly. The two techniques are:
1. Recoloring Nodes.
2. Rotating Nodes (left or right).

First, we need to define the structure of the Red-Black Tree and some nodes relative to the currentNode, which is the node that we inserted in the Red-Black Tree.
- Node C – newly inserted node (currentNode)
- Node P – parent of currentNode
- Node G – grandparent of currentNode
- Node U – uncle of currentNode / sibling of Node P / child of Node G

If currentNode is not a root, and the parent of currentNode is not black, first, we will check Node U (the uncle of currentNode). Based on Node U’s color, we will perform some steps to make the tree balanced. If Node U is red, then do the following:
1. Change the color of Node P and U to black
2. Change the color of Node G to red
3. Make Node G the currentNode and repeat the same process from step two

If Node U (uncle) is black, then we come across four different scenarios based on the arrangements of Node P and G, just like we did in AVL trees. We will cover each of these scenarios and try to help you understand by using illustrations:
- Left-Left: Node P is the leftChild of Node G, and currentNode is the leftChild of Node P

```
When Node P is the leftChild of Node G, and currentNode is the leftChild of Node P, we perform the following steps:
1. Rotate Node G towards the Right
2. Swap the colors of Nodes G and P
```

- Left-Right: Node P is the leftChild of Node G, and currentNode is the rightChild of Node P

```
When Node P is the leftChild of Node G, and currentNode is the rightChild of Node P, we perform the following steps:
1. Rotate Node P towards the Left
2. After that, repeat the steps that we covered in Left-Left case
```

- Right-Right: Node P is the rightChild of Node G, and currentNode is the rightChild of Node P

```
When Node P is the rightChild of Node G, and currentNode is the rightChild of Node P, we perform the following steps:
1. Rotate Node G towards the Left
2. Swap the colors of Nodes G and P
```

- Right-Left: Node P is the rightChild of Node G, and currentNode is the leftChild of Node P

```
When Node P is the rightChild of Node G, and currentNode is the leftChild of Node P, we perform the following steps:
1. Rotate Node P towards Right
2. After that, repeat the steps that we covered in Right-Right case
```

---
## Delete
In insertion, we may violate the property of a red parent having a red child. At the same time, in a deletion operation, we may end up deleting a black node which could violate the property of, “the same number of black nodes from root to the null for every path”.

In insertion, we check the color of the uncle node (uncle to currentNode), and based on the color we perform appropriate operations to balance the tree. In the deletion operation, we will check the color of the sibling node (sibling to currentNode), and based on its color we will perform some actions to balance the tree again.

#### Steps for Deletion
Following are the steps involved to remove any value in a Red-Black Tree:
1. Search for a node with the given value to remove. We will call it currentNode
2. Remove currentNode using standard BST deletion operation that we studied earlier

We already know that for deletion in BST, we always end up deleting either a leaf node or a node with only one child.
- In the case of leaf node deletion, it is easy to just delete the node and link the parent of the node to be deleted with null
- In the case of a node with one child, deletion is relatively easy as we just link the parent of the node to be deleted with that one child

Let’s name some nodes relative to Node C, which is the node that we want to delete:
- **Node C** – node to be deleted (currentNode)
- **Node P** – parent node of currentNode
- **Node S** – sibling node (once we rotate tree, Node R will have a sibling node which we name as Node S)
- **Node SC** – child node of Node S
- **Node R** – node to be replaced with currentNode and linked with Node P (Node R is the single child of Node C)

#### Deletion Cases
- **Left-Left:** Node S is the leftChild of Node P, and Node SC (red) is the leftChild of S, or both children of S are red.
- **Right-Right:** Node S is the rightChild of Node P, and Node SC (red) is the rightChild of S, or both children of S are red.
- **Left-Right:** Node S is the leftChild of Node P and Node SC (red) is the rightChild of S.
- **Right-Left:** Node S is the rightChild of Node P and Node SC (red) is the leftChild of S.

#### Case 1: Left-Left
In the case when Node S is the leftChild of Node P, and Node SC (red) is the leftChild of S or both children of S are red, we perform the following steps:
1. Rotate Node P towards the right
2. Make the right child of Node S the left child of Node P

#### Case 2: Right-Right
In the case when Node S is the rightChild of Node P, and Node SC (red) is the rightChild of S or both children of S are red, we perform the following steps:
1. Rotate Node P towards the left
2. Make the left child of Node S the right child of Node P

#### Case 3: Left-Right
In the case when Node S is the leftChild of Node P and Node SC (red) is the rightChild of S, we perform the following steps:
1. Rotate Node S towards the left
2. Rotate Node P towards the right

#### Case 4: Right-Left
In the case when Node S is the rightChild of Node P and Node SC (red) is the leftChild of S, we perform the following steps:
1. Rotate Node S towards the right
2. Rotate Node P towards the left


---