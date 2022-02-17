---
title: Scheduling Tasks
type: topic
section: Top K Elements
course: Grokking the Coding Interview
tags:
---
#### Problem
You are given a list of tasks that need to be run, in any order, on a server. Each task will take one CPU interval to execute but once a task has finished, it has a cooling period during which it can’t be run again. If the cooling period for all tasks is ‘K’ intervals, find the minimum number of CPU intervals that the server needs to finish all tasks.

If at any time the server can’t execute any task then it must stay idle.
```yml
Input: [a, a, a, b, c, c], K=2
Output: 7
Explanation: a -> c -> b -> a -> c -> idle -> a
```

#### Method: Top K Elements
This problem follows the Top ‘K’ Elements pattern and is quite similar to Rearrange String K Distance Apart. We need to rearrange tasks such that same tasks are ‘K’ distance apart.

Following a similar approach, we will use a Max Heap to execute the highest frequency task first. After executing a task we decrease its frequency and put it in a waiting list. In each iteration, we will try to execute as many as k+1 tasks. For the next iteration, we will put all the waiting tasks back in the Max Heap. If, for any iteration, we are not able to execute k+1 tasks, the CPU has to remain idle for the remaining time in the next iteration.
```java
import java.util.*;

class TaskScheduler {

  public static int scheduleTasks(char[] tasks, int k) {
    int intervalCount = 0;
    Map<Character, Integer> taskFrequencyMap = new HashMap<>();
    for (char chr : tasks)
      taskFrequencyMap.put(chr, taskFrequencyMap.getOrDefault(chr, 0) + 1);

    PriorityQueue<Map.Entry<Character, Integer>> maxHeap = new PriorityQueue<Map.Entry<Character, Integer>>(
        (e1, e2) -> e2.getValue() - e1.getValue());

    // add all tasks to the max heap
    maxHeap.addAll(taskFrequencyMap.entrySet());

    while (!maxHeap.isEmpty()) {
      List<Map.Entry<Character, Integer>> waitList = new ArrayList<>();
      int n = k + 1; // try to execute as many as 'k+1' tasks from the max-heap
      for (; n > 0 && !maxHeap.isEmpty(); n--) {
        intervalCount++;
        Map.Entry<Character, Integer> currentEntry = maxHeap.poll();
        if (currentEntry.getValue() > 1) {
          currentEntry.setValue(currentEntry.getValue() - 1);
          waitList.add(currentEntry);
        }
      }
      maxHeap.addAll(waitList); // put all the waiting list back on the heap
      if (!maxHeap.isEmpty())
        intervalCount += n; // we'll be having 'n' idle intervals for the next iteration
    }

    return intervalCount;
  }

  public static void main(String[] args) {
    char[] tasks = new char[] { 'a', 'a', 'a', 'b', 'c', 'c' };
    System.out.println("Minimum intervals needed to execute all tasks: " + TaskScheduler.scheduleTasks(tasks, 2));

    tasks = new char[] { 'a', 'b', 'a' };
    System.out.println("Minimum intervals needed to execute all tasks: " + TaskScheduler.scheduleTasks(tasks, 3));
  }
}
```
**Time complexity:** `O(N*LogN)`


---