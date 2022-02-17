---
title: Connect Ropes
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given ‘N’ ropes with different lengths, we need to connect these ropes into one big rope with minimum cost. The cost of connecting two ropes is equal to the sum of their lengths.
```
Input: [1, 3, 11, 5]
Output: 33
Explanation: First connect 1+3(=4), then 4+5(=9), and then 9+11(=20). So the total cost is 33 (4+9+20)
```

#### Method: Top K Elements
```java
import java.util.*;

class ConnectRopes {

  public static int minimumCostToConnectRopes(int[] ropeLengths) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>((n1, n2) -> n1 - n2);
    for(int i=0; i<ropeLengths.length; i++)
      minHeap.add(ropeLengths[i]);
    
    int result = 0;
    while(minHeap.size() > 1) {
      int temp = minHeap.poll() + minHeap.poll();
      result += temp;
      minHeap.add(temp);
    }
    return result;
  }

  public static void main(String[] args) {
    int result = ConnectRopes.minimumCostToConnectRopes(new int[] { 1, 3, 11, 5 });
    System.out.println("Minimum cost to connect ropes: " + result);
    result = ConnectRopes.minimumCostToConnectRopes(new int[] { 3, 4, 5, 6 });
    System.out.println("Minimum cost to connect ropes: " + result);
    result = ConnectRopes.minimumCostToConnectRopes(new int[] { 1, 3, 11, 5, 2 });
    System.out.println("Minimum cost to connect ropes: " + result);
  }
}
```
**Time complexity:** `O(NLogN)`


---