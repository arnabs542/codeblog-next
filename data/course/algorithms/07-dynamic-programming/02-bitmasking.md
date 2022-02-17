---
title: Bitmasking
type: topic
section: Dynamic Programming
course: Algorithms
tags:
- java
---
#### What is Bitmasking?
Suppose we have a collection of elements which are numbered from 1 to N. If we want to represent a subset of this set then it can be encoded by a sequence of N bits (we usually call this sequence a “mask”). In our chosen subset the i-th element belongs to it if and only if the i-th bit of the mask is set i.e., it equals to 1. For example, the mask 10000101 means that the subset of the set [1… 8] consists of elements 1, 3 and 8. We know that for a set of N elements there are total 2N subsets thus 2N masks are possible, one representing each subset. Each mask is, in fact, an integer number written in binary notation.

Our main methodology is to assign a value to each mask (and, therefore, to each subset) and thus calculate the values for new masks using values of the already computed masks. Usually our main target is to calculate value/solution for the complete set i.e., for mask 11111111. Normally, to find the value for a subset X we remove an element in every possible way and use values for obtained subsets X’1, X’2… ,X’k to compute the value/solution for X. This means that the values for X’i must have been computed already, so we need to establish an ordering in which masks will be considered. It’s easy to see that the natural ordering will do: go over masks in increasing order of corresponding numbers. Also, We sometimes, start with the empty subset X and we add elements in every possible way and use the values of obtained subsets X’1, X’2… ,X’k to compute the value/solution for X.

We mostly use the following notations/operations on masks:
bit(i, mask) – the i-th bit of mask
count(mask) – the number of non-zero bits in the mask
first(mask) – the number of the lowest non-zero bit in the mask
set(i, mask) – set the ith bit in the mask
check(i, mask) – check the ith bit in the mask







---