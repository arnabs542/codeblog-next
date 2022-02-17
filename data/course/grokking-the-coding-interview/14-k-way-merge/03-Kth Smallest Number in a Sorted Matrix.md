---
title: Kth Smallest Number in a Sorted Matrix
type: topic
section: K-way merge
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an N * N matrix where each row and column is sorted in ascending order, find the Kth smallest element in the matrix.
```
Input: Matrix=[
    [2, 6, 8], 
    [3, 7, 10],
    [5, 8, 11]
  ], 
  K=5
Output: 7
Explanation: The 5th smallest number in the matrix is 7.
```

#### Method: K-way merge
This problem follows the K-way merge pattern and can be easily converted to Kth Smallest Number in M Sorted Lists. As each row (or column) of the given matrix can be seen as a sorted list, we essentially need to find the Kth smallest number in ‘N’ sorted lists.
```java
import java.util.*;
class Node {
  int row;
  int col;
  Node(int row, int col) {
    this.row = row;
    this.col = col;
  }
}
class KthSmallestInSortedMatrix {

  public static int findKthSmallest(int[][] matrix, int k) {
    PriorityQueue<Node> minHeap = new PriorityQueue<Node>((n1, n2) -> matrix[n1.row][n1.col] - matrix[n2.row][n2.col]);
    // put the 1st element of each row in the min heap
    // we don't need to push more than 'k' elements in the heap
    for(int i=0; i<matrix.length && i<k; i++) {
      minHeap.add(new Node(i, 0));
    }
    int count = 0, result = 0;
    while(!minHeap.isEmpty()) {
      Node temp = minHeap.poll();
      result = matrix[temp.row][temp.col];
      if(++count == k)
        break;
      temp.col++;
      if (matrix[0].length > temp.col)
        minHeap.add(temp);
    }
    return result;
  }

  public static void main(String[] args) {
    int matrix[][] = { { 2, 6, 8 }, { 3, 7, 10 }, { 5, 8, 11 } };
    int result = KthSmallestInSortedMatrix.findKthSmallest(matrix, 5);
    System.out.print("Kth smallest number is: " + result);
  }
}
```
**Time complexity:** `O(min(K,N)+K∗logN)`

#### Method: Binary Search
An alternative could be to apply the Binary Search on the “number range” instead of the “index range”. As we know that the smallest number of our matrix is at the top left corner and the biggest number is at the bottom right corner. These two numbers can represent the “range” i.e., the `start` and the `end` for the Binary Search. Here is how our algorithm will work:
1. Start the Binary Search with `start = matrix[0][0]` and `end = matrix[n-1][n-1]`.
1. Find `middle` of the `start` and the `end`. This `middle` number is NOT necessarily an element in the matrix.
1. Count all the numbers smaller than or equal to `middle` in the matrix. As the matrix is sorted, we can do this in O(N).O(N).
1. While counting, we can keep track of the “smallest number greater than the `middle`” (let’s call it `n1`) and at the same time the “biggest number less than or equal to the `middle`” (let’s call it `n2`). These two numbers will be used to adjust the “number range” for the Binary Search in the next iteration.
1. If the count is equal to ‘K’, `n1` will be our required number as it is the “biggest number less than or equal to the `middle`”, and is definitely present in the matrix.
1. If the count is less than ‘K’, we can update `start = n2` to search in the higher part of the matrix and if the count is greater than ‘K’, we can update `end = n1` to search in the lower part of the matrix in the next iteration.

```java
class KthSmallestInSortedMatrix {
  public static int findKthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    int start = matrix[0][0], end = matrix[n - 1][n - 1];
    while (start < end) {
      int mid = start + (end - start) / 2;
      // first number is the smallest and the second number is the largest
      int[] smallLargePair = { matrix[0][0], matrix[n - 1][n - 1] };

      int count = countLessEqual(matrix, mid, smallLargePair);

      if (count == k)
        return smallLargePair[0];

      if (count < k)
        start = smallLargePair[1]; // search higher
      else
        end = smallLargePair[0]; // search lower
    }
 
    return start;
  }

  private static int countLessEqual(int[][] matrix, int mid, int[] smallLargePair) {
    int count = 0;
    int n = matrix.length, row = n - 1, col = 0;
    while (row >= 0 && col < n) {
      if (matrix[row][col] > mid) {
        // as matrix[row][col] is bigger than the mid, let's keep track of the
        // smallest number greater than the mid
        smallLargePair[1] = Math.min(smallLargePair[1], matrix[row][col]);
        row--;
      } else {
        // as matrix[row][col] is less than or equal to the mid, let's keep track of the
        // biggest number less than or equal to the mid
        smallLargePair[0] = Math.max(smallLargePair[0], matrix[row][col]);
        count += row + 1;
        col++;
      }
    }
    return count;
  }

  public static void main(String[] args) {
    int matrix[][] = { { 1, 4 }, { 2, 5 } };
    int result = KthSmallestInSortedMatrix.findKthSmallest(matrix, 2);
    System.out.println("Kth smallest number is: " + result);

    int matrix1[][] = { { -5 } };
    result = KthSmallestInSortedMatrix.findKthSmallest(matrix1, 1);
    System.out.println("Kth smallest number is: " + result);

    int matrix2[][] = { { 2, 6, 8 }, { 3, 7, 10 }, { 5, 8, 11 } };
    result = KthSmallestInSortedMatrix.findKthSmallest(matrix2, 5);
    System.out.println("Kth smallest number is: " + result);

    int matrix3[][] = { { 1, 5, 9 }, { 10, 11, 13 }, { 12, 13, 15 } };
    result = KthSmallestInSortedMatrix.findKthSmallest(matrix3, 8);
    System.out.println("Kth smallest number is: " + result);

  }
}
```

**Time complexity:** `O(N∗log(max−min))`

---