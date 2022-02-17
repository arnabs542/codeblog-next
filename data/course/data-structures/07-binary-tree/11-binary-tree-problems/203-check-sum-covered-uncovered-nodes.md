---
title: 'Check Sum Covered Uncovered Nodes'
type: 'problem'
topic: 'Binary Tree Problems'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- binary tree
- tree
---
#### Problem
Given a binary tree, you need to check whether sum of all covered elements is equal to sum of all uncovered elements or not.
In a binary tree, a node is called Uncovered if it appears either on left boundary or right boundary. Rest of the nodes are called covered.

---
##### Method 1: Simple Approach
For calculating sum of Uncovered nodes we will follow below steps:
1) Start from root, go to left and keep going until left child is available, if not go to right child and again follow same procedure until you reach a leaf node.

2) After step 1 sum of left boundary will be stored, now for right part again do the same procedure but now keep going to right until right child is available, if not then go to left child and follow same procedure until you reach a leaf node.

After above 2 steps sum of all Uncovered node will be stored, we can subtract it from total sum and get sum of covered elements and check for equines of binary tree.


---
