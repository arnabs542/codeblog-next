---
title: K Closest Points to the Origin
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
Given an array of points in the a 2D plane, find ‘K’ closest points to the origin.
```
Input: point = [[1, 3], [3, 4], [2, -1]], K = 2
Output: [[1, 3], [2, -1]]
```

#### Method: Top K Elements
The Euclidean distance of a point P(x,y) from the origin can be calculated through the following formula: `sqrt(x^2 + y^2)`

```java
import java.util.*;

class Point {
  int x;
  int y;
  public Point(int x, int y) {
    this.x = x;
    this.y = y;
  }
  public int distFromOrigin() {
    return (x * x) + (y * y);
  }
}

class KClosestPointsToOrigin {

  public static List<Point> findClosestPoints(Point[] points, int k) {
    PriorityQueue<Point> maxHeap = new PriorityQueue<>((p1, p2) -> p2.distFromOrigin() - p1.distFromOrigin());
    for(int i=0; i<k; i++)
      maxHeap.add(points[i]);
    for(int i=k; i<points.length; i++) {
      if(points[i].distFromOrigin() < maxHeap.peek().distFromOrigin()) {
        maxHeap.poll();
        maxHeap.add(points[i]);
      }
    }
    return new ArrayList<>(maxHeap);
  }

  public static void main(String[] args) {
    Point[] points = new Point[] { new Point(1, 3), new Point(3, 4), new Point(2, -1) };
    List<Point> result = KClosestPointsToOrigin.findClosestPoints(points, 2);
    System.out.print("Here are the k points closest the origin: ");
    for (Point p : result)
      System.out.print("[" + p.x + " , " + p.y + "] ");
  }
}
```
**Time complexity:** `O(NLogK)`


---