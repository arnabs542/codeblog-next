---
title: Kth Smallest Number in M Sorted Lists
type: topic
section: K-way merge
course: Grokking the Coding Interview
tags:
---
#### Problem
Given ‘M’ sorted arrays, find the K’th smallest number among all the arrays.
```
Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5
Output: 4
Explanation: The 5th smallest number among all the arrays is 4, this can be verified from the merged 
list of all the arrays: [1, 2, 3, 3, 4, 6, 6, 7, 8]
```

#### Method: K-way merge
We can start merging all the arrays, but instead of inserting numbers into a merged list, we will keep count to see how many elements have been inserted in the merged list. Once that count is equal to ‘K’, we have found our required number.

A big difference from Merge K Sorted Lists is that in this problem, the input is a list of arrays compared to LinkedLists. This means that when we want to push the next number in the heap we need to know what the index of the current number in the current array was. To handle this, we will need to keep track of the array and the element indices.
```java
import java.util.*;

class Node {
  int elementIndex;
  int arrayIndex;

  Node(int elementIndex, int arrayIndex) {
    this.elementIndex = elementIndex;
    this.arrayIndex = arrayIndex;
  }
}

class KthSmallestInMSortedArrays {

  public static int findKthSmallest(List<Integer[]> lists, int k) {
    PriorityQueue<Node> minHeap = new PriorityQueue<Node>(
        (n1, n2) -> lists.get(n1.arrayIndex)[n1.elementIndex] - lists.get(n2.arrayIndex)[n2.elementIndex]);
    // put the 1st element of each array in the min heap
    for (int i = 0; i < lists.size(); i++)
      if (lists.get(i) != null)
        minHeap.add(new Node(0, i));
    // take the smallest (top) element form the min heap, if the running count is equal to k return the number
    // if the array of the top element has more elements, add the next element to the heap
    int numberCount = 0, result = 0;
    while (!minHeap.isEmpty()) {
      Node node = minHeap.poll();
      result = lists.get(node.arrayIndex)[node.elementIndex];
      if (++numberCount == k)
        break;
      node.elementIndex++;
      if (lists.get(node.arrayIndex).length > node.elementIndex)
        minHeap.add(node);
    }
    return result;
  }

  public static void main(String[] args) {
    Integer[] l1 = new Integer[] { 2, 6, 8 };
    Integer[] l2 = new Integer[] { 3, 6, 7 };
    Integer[] l3 = new Integer[] { 1, 3, 4 };
    List<Integer[]> lists = new ArrayList<Integer[]>();
    lists.add(l1);
    lists.add(l2);
    lists.add(l3);
    int result = KthSmallestInMSortedArrays.findKthSmallest(lists, 5);
    System.out.print("Kth smallest number is: " + result);
  }
}
```
**Time complexity:** `O(K*LogM)`

---
#### Similar Problems
**Problem 1:** Given ‘M’ sorted arrays, find the median number among all arrays.

**Solution:** This problem is similar to our parent problem with K=Median. So if there are ‘N’ total numbers in all the arrays we need to find the K’th minimum number where K=N/2K=N/2.

**Problem 2:** Given a list of ‘K’ sorted arrays, merge them into one sorted list.

**Solution:** This problem is similar to Merge K Sorted Lists except that the input is a list of arrays compared to LinkedLists. To handle this, we can use a similar approach as discussed in our parent problem by keeping a track of the array and the element indices.


---