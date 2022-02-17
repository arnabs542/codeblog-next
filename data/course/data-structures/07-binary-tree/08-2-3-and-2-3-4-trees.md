---
title: '2-3 and 2-3-4 Trees'
type: 'topic'
section: 'Binary Tree'
course: 'Data Structures'
tags:
- js
- array
---
## What is a 2-3 Tree?
A 2-3 Tree is another form of a search tree, but it is very different from a Binary Search Tree. Unlike BST, 2-3 Tree is a balanced and ordered search tree which provides a very efficient storage mechanism to guarantee fast operations.

One key feature of a 2-3 Tree is that it remains balanced, no matter how many insertions or deletions you perform. The leaf nodes are always present on the same level and are quite small in number. This is to make sure the height doesn’t increase up to a certain level as the time complexity of all the operations is mainly dependent upon it. Ideally, we want the height to be in logarithmic terms because the tree will require more time to perform operations as it grows larger. In 2-3 Trees, the height is logarithmic in the number of nodes present in the tree. They generally come in 2 forms:
1. 2 Node Tree
2. 3 Node Tree

#### Properties
- All leaves are at the same height.
- Each internal node can have either 2 or 3 children.
- If the node has one key, it can either be a leaf node or have exactly two children. Therefore, if we say X is the key, and LChild and RChild refer to the left and right child of the node respectively, then,
```
LChild.Key < X < RChild.Key
```
- If the node has two keys, it can either be a leaf node or have exactly three children. Therefore, if we say **X ** and Y are the keys present at a node and LChild and RChild refer to the left and right child of the node respectively, then,
```
LChild.Key < X < MChild.Key < Y < RChild.Key
```
- Finally, the height of a 2-3 Tree with n number of nodes will always be lesser than: `log​2​​ (n+1)`

---
## Insert
In 2-3 Trees, values are only inserted at leaf nodes based on certain conditions. 

#### Insertion Algorithm
- If the tree is initially empty, create a new leaf node and insert your value.
- If the tree is not empty, traverse through the tree to find the right leaf node where the value should be inserted.
- If the leaf node has only one value, insert your value into the node.
- If the leaf node has more than two values, split the node by moving the middle element to the top node.
- Keep forming new nodes wherever you get more than two elements.

---
## Delete

#### Case 1: Element at Leaf
When the element which needs to be removed is present at the leaf node, we check how many keys are present in that node. The further divides the algorithm into two scenarios:

###### Leaf node has more than one key
- If the leaf of the element to be deleted has more than one key, then simply delete the element.

###### Leaf node only has one key
- If the leaf node of the element to be removed has only one key, then we will have to adjust the keys of that sub-tree in such a way that it remains ordered and balanced. This condition is further divided into two scenarios:
    - Any of the siblings has two keys
    - No sibling has more than one key
      1. In the case when none of the siblings have more than one key, we have no other option but to merge the two nodes by rotation of keys. So we merge two child nodes into one node by rotating elements accordingly. This process is called Merge by Rotation.
      2. If there’s a case where the child nodes have more than one key, we shift an element from the child node to make it the parent node. When we are left with only one key at each child node, then we are bound to delete the node.

#### Case 2: Element at Internal Node
Deletion is always performed at the leaf. So, whenever we need to delete a key at the internal node, we swap the key with any of its in-order successors; somehow we make it shift to any leaf node, as deletion is always performed at the leaf. Shift the element at the leaf node and then delete it. The element to be deleted can be swapped by either of the following:
- an element with the largest key on the left
- an element with the smallest key on the right

This is applicable when the child node has more than one key stored at the node. If there is only one value at the child node, then you are bound to swap the parent with whatever value the child node has.




---
## 2-3-4 Trees
2-3-4 is a search tree which is an advanced version of 2-3 Trees. This tree can accommodate more keys and hence more child nodes as compared to 2-3 Trees.

#### Properties
- Each internal node can contain a max. of three keys
- Each internal node can have a max. of four child nodes
- In the case of three keys (left, mid, and right) at an internal node, all the keys present at the LeftChild node are smaller than the left key. This can be mathematically expressed as,
```
LeftChild.keys < LeftKeyLeftChild.keys < LeftKey
```

- All the keys present at the LeftMidChild node are smaller than the mid key, which can be mathematically expressed as,
```
LeftMidChild.keys < MidKeyLeftMidChild.keys < MidKey
```

- All the keys present at the RightMidChild node are smaller than the right key, which can be mathematically expressed as,
```
RightMidChild.keys < RightKeyRightMidChild.keys < RightKey
```

- Finally, all the keys present at the RightChild node are greater than the right key, which can be mathematically expressed as,
```
RightChild.keys > RightKeyRightChild.keys > RightKey
```




---