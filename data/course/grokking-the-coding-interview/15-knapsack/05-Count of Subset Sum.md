---
title: Count of Subset Sum
type: topic
section: 0/1 Knapsack
course: Grokking the Coding Interview
tags:
---
#### Problem
Given a set of positive numbers, find the total number of subsets whose sum is equal to a given number ‘S’.
```
Input: {1, 2, 7, 1, 5}, S=9
Output: 3
The given set has '3' subsets whose sum is '9': {2, 7}, {1, 7, 1}, {1, 2, 1, 5}
```

#### Method: Recursion
```java
class SubsetSum {
  static int countSubsets(int[] num, int sum) {
    return countSubsetsRec(num, sum, 0);
  }
  static int countSubsetsRec(int[] num, int sum, int i) {
    if(sum == 0)
      return 1;
    if(num.length == 0 || i >= num.length)
      return 0;
    int sum1 = 0;
    if(num[i] <= sum)
      sum1 = countSubsetsRec(num, sum - num[i], i+1);
    int sum2 = countSubsetsRec(num, sum, i+1);
    return sum1 + sum2;
  }

  public static void main(String[] args) {
    SubsetSum ss = new SubsetSum();
    int[] num = { 1, 1, 2, 3 };
    System.out.println(ss.countSubsets(num, 4));
    num = new int[] { 1, 2, 7, 1, 5 };
    System.out.println(ss.countSubsets(num, 9));
  }
}
```
**Time complexity:** `O(2^N)`

---
#### Method: Memoization
```java
class SubsetSum {

  public int countSubsets(int[] num, int sum) {
    Integer[][] dp = new Integer[num.length][sum + 1];
    return this.countSubsetsRecursive(dp, num, sum, 0);
  }

  private int countSubsetsRecursive(Integer[][] dp, int[] num, int sum, int currentIndex) {
    // base checks
    if (sum == 0)
      return 1;

    if(num.length == 0 || currentIndex >= num.length)
      return 0;

    // check if we have not already processed a similar problem
    if(dp[currentIndex][sum] == null) {
      // recursive call after choosing the number at the currentIndex
      // if the number at currentIndex exceeds the sum, we shouldn't process this
      int sum1 = 0;
      if( num[currentIndex] <= sum )
        sum1 = countSubsetsRecursive(dp, num, sum - num[currentIndex], currentIndex + 1);

      // recursive call after excluding the number at the currentIndex
      int sum2 = countSubsetsRecursive(dp, num, sum, currentIndex + 1);

      dp[currentIndex][sum] = sum1 + sum2;
    }

    return dp[currentIndex][sum];
  }

  public static void main(String[] args) {
    SubsetSum ss = new SubsetSum();
    int[] num = {1, 1, 2, 3};
    System.out.println(ss.countSubsets(num, 4));
    num = new int[]{1, 2, 7, 1, 5};
    System.out.println(ss.countSubsets(num, 9));
  }
}
```
**Time complexity:** `O(N*S)`

---
#### Method: Bottom-up DP
```java
class SubsetSum {

  public int countSubsets(int[] num, int sum) {
    int n = num.length;
    int[][] dp = new int[n][sum + 1];

    // populate the sum=0 columns, as we will always have an empty set for zero sum
    for(int i=0; i < n; i++)
      dp[i][0] = 1;

    // with only one number, we can form a subset only when the required sum is equal to its value
    for(int s=1; s <= sum ; s++) {
      dp[0][s] = (num[0] == s ? 1 : 0);
    }

    // process all subsets for all sums
    for(int i=1; i < num.length; i++) {
      for(int s=1; s <= sum; s++) {
        // exclude the number
        dp[i][s] = dp[i-1][s];
        // include the number, if it does not exceed the sum
        if(s >= num[i])
          dp[i][s] += dp[i-1][s-num[i]];
      }
    }

    // the bottom-right corner will have our answer.
    return dp[num.length-1][sum];
  }

  public static void main(String[] args) {
    SubsetSum ss = new SubsetSum();
    int[] num = {1, 1, 2, 3};
    System.out.println(ss.countSubsets(num, 4));
    num = new int[]{1, 2, 7, 1, 5};
    System.out.println(ss.countSubsets(num, 9));
  }
}
```
**Time complexity:** `O(N*S)`

#### Challenge
Can we improve our bottom-up DP solution even further? Can you find an algorithm that has O(S)O(S) space complexity?
```java
class SubsetSum {
  static int countSubsets(int[] num, int sum) {
    int n = num.length;
    int[] dp = new int[sum + 1];
    dp[0] = 1;

    // with only one number, we can form a subset only when the required sum is equal to its value
    for(int s=1; s <= sum ; s++) {
      dp[s] = (num[0] == s ? 1 : 0);
    }

    // process all subsets for all sums
    for(int i=1; i < num.length; i++) {
      for(int s=sum; s >= 0; s--) {
        if(s >= num[i])
          dp[s] += dp[s-num[i]];
      }
    }

    return dp[sum];
  }
}
```

---