---
title: Minimum Meeting Rooms
type: topic
section: Merge Intervals
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a list of intervals representing the start and end time of ‘N’ meetings, find the **minimum number of rooms required to hold all the meetings**.
```yml
Meetings: [[4,5], [2,3], [2,4], [3,5]]
Output: 2
Explanation: We will need one room for [2,3] and [3,5], and another room for [2,4] and [4,5].
```

#### Method: Merge Intervals
Let’s take the above-mentioned example and try to follow our Merge Intervals approach:

**Meetings:** [[4,5], [2,3], [2,4], [3,5]]

**Step 1:** Sorting these meetings on their start time will give us: [[2,3], [2,4], [3,5], [4,5]]

**Step 2:** Merging overlapping meetings:
- [2,3] overlaps with [2,4], so after merging we’ll have => [[2,4], [3,5], [4,5]]
- [2,4] overlaps with [3,5], so after merging we’ll have => [[2,5], [4,5]]
- [2,5] overlaps [4,5], so after merging we’ll have => [2,5]

Since all the given meetings have merged into one big meeting ([2,5]), does this mean that they all are overlapping and we need a minimum of four rooms to hold these meetings? You might have already guessed that the answer is NO! As we can clearly see, some meetings are mutually exclusive. For example, [2,3] and [3,5] do not overlap and can happen in one room. So, to correctly solve our problem, we need to keep track of the mutual exclusiveness of the overlapping meetings.

Here is what our strategy will look like:
1. We will sort the meetings based on start time.
1. We will schedule the first meeting (let’s call it `m1`) in one room (let’s call it `r1`).
1. If the next meeting `m2` is not overlapping with `m1`, we can safely schedule it in the same room `r1`.
1. If the next meeting `m3` is overlapping with `m2` we can’t use `r1`, so we will schedule it in another room (let’s call it r2).
1. Now if the next meeting m4 is overlapping with `m3`, we need to see if the room `r1` has become free. For this, we need to keep track of the end time of the meeting happening in it. If the end time of `m2` is before the start time of m4, we can use that room `r1`, otherwise, we need to schedule m4 in another room r3.

We can conclude that we need to **keep track of the ending time of all the meetings currently happening** so that when we try to schedule a new meeting, we can see what meetings have already ended. We need to put this information in a data structure that can easily give us the smallest ending time. A **Min Heap** would fit our requirements best.

So our algorithm will look like this:
1. Sort all the meetings on their start time.
1. Create a min-heap to store all the active meetings. This min-heap will also be used to find the active meeting with the smallest end time.
1. Iterate through all the meetings one by one to add them in the min-heap. Let’s say we are trying to schedule the meeting `m1`.
1. Since the min-heap contains all the active meetings, so before scheduling `m1` we can remove all meetings from the heap that have ended before `m1`, i.e., remove all meetings from the heap that have an end time smaller than or equal to the start time of `m1`.
1. Now add `m1` to the heap.
1. The heap will always have all the overlapping meetings, so we will need rooms for all of them. Keep a counter to remember the maximum size of the heap at any time which will be the minimum number of rooms needed.

```java
import java.util.*;

class Meeting {
  int start;
  int end;

  public Meeting(int start, int end) {
    this.start = start;
    this.end = end;
  }
};

class MinimumMeetingRooms {

  public static int findMinimumMeetingRooms(List<Meeting> meetings) {
    if (meetings == null || meetings.size() == 0)
      return 0;
    // sort the meetings by start time
    Collections.sort(meetings, (m1, m2) -> Integer.compare(m1.start, m2.start));
    int minRooms = 0;
    PriorityQueue<Meeting> minHeap = 
      new PriorityQueue<>(meetings.size(), (a, b) -> Integer.compare(a.end, b.end));
    for (Meeting meeting : meetings) {
      // remove all meetings that have ended
      while (!minHeap.isEmpty() && meeting.start >= minHeap.peek().end)
        minHeap.poll();
      // add the current meeting into the minHeap
      minHeap.offer(meeting);
      // all active meeting are in the minHeap, so we need rooms for all of them.
      minRooms = Math.max(minRooms, minHeap.size());
    }
    return minRooms;
  }

  public static void main(String[] args) {
    List<Meeting> input = new ArrayList<Meeting>() {
      {
        add(new Meeting(4, 5));
        add(new Meeting(2, 3));
        add(new Meeting(2, 4));
        add(new Meeting(3, 5));
      }
    };
    int result = MinimumMeetingRooms.findMinimumMeetingRooms(input);
    System.out.println("Minimum meeting rooms required: " + result);

    input = new ArrayList<Meeting>() {
      {
        add(new Meeting(1, 4));
        add(new Meeting(2, 5));
        add(new Meeting(7, 9));
      }
    };
    result = MinimumMeetingRooms.findMinimumMeetingRooms(input);
    System.out.println("Minimum meeting rooms required: " + result);

    input = new ArrayList<Meeting>() {
      {
        add(new Meeting(6, 7));
        add(new Meeting(2, 4));
        add(new Meeting(8, 12));
      }
    };
    result = MinimumMeetingRooms.findMinimumMeetingRooms(input);
    System.out.println("Minimum meeting rooms required: " + result);

    input = new ArrayList<Meeting>() {
      {
        add(new Meeting(1, 4));
        add(new Meeting(2, 3));
        add(new Meeting(3, 6));
      }
    };
    result = MinimumMeetingRooms.findMinimumMeetingRooms(input);
    System.out.println("Minimum meeting rooms required: " + result);

    input = new ArrayList<Meeting>() {
      {
        add(new Meeting(4, 5));
        add(new Meeting(2, 3));
        add(new Meeting(2, 4));
        add(new Meeting(3, 5));
      }
    };
    result = MinimumMeetingRooms.findMinimumMeetingRooms(input);
    System.out.println("Minimum meeting rooms required: " + result);
  }
}
```

**Time complexity:** `O(N*LogN)`

**Space complexity:** `O(N)`

#### Similar Problems
**Problem 1:** Given a list of intervals, find the point where the maximum number of intervals overlap.

**Problem 2:** Given a list of intervals representing the arrival and departure times of trains to a train station, our goal is to find the minimum number of platforms required for the train station so that no train has to wait.

---