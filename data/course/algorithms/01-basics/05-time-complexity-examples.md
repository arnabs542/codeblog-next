---
title: 'Time Complexity Examples'
type: 'topic'
section: 'Basics'
course: 'Algorithms'
tags:
- java
---
#### Time Complexity Examples

##### 1. Loop

```
void fun() { 
   int i, j; 
   for (i=1; i<=n; i++) 
      for (j=1; j<=log(i); j++) 
         printf("GeeksforGeeks"); 
} 
```

- Time Complexity = Θ(log 1) + Θ(log 2) + Θ(log 3) + . . . . + Θ(log n) = Θ(log n!).
- Order of growth of ‘log n!’ and ‘n log n’ is same for large values of n, i.e., Θ (log n!) = Θ(n log n).
- So, **Time Complexity = Θ(n log n)**

> The expression Θ(log n!) = Θ(n log n) can be easily derived from following Stirling’s approximation (or Stirling’s formula).

##### 2. Time Complexity of building a heap

```
BUILD-HEAP(A) 
    heapsize := size(A); 
    for i := floor(heapsize/2) downto 1 
        do HEAPIFY(A, i); 
    end for 
END
```

- A quick look over the above algorithm suggests that the running time is O(nlg(n)), since each call to Heapify costs O(lg(n)) and Build-Heap makes O(n) such calls. This upper bound, though correct, is not asymptotically tight.
- Time complexity for Building a Binary Heap is O(n). 

##### 3. Time Complexity where loop variable is incremented by 1, 2, 3, 4 ..
```
void fun(int n) { 
   int j = 1, i = 0; 
   while (i < n) 
   { 
       // Some O(1) task 
       i = i + j; 
       j++; 
   } 
} 
```
- The loop variable ‘i’ is incremented by 1, 2, 3, 4, … until i becomes greater than or equal to n.
- The value of i is x(x+1)/2 after x iterations. So if loop runs x times, then x(x+1)/2 < n. Therefore time complexity can be written as Θ(√n).

##### 4. Time Complexity of Loop with Powers
```
void fun(int n, int k) { 
    for (int i=1; i<=n; i++) 
    { 
      int p = pow(i, k);  
      for (int j=1; j<=p; j++) 
      { 
          // Some O(1) work 
      } 
    } 
} 
```
- Time complexity of above function can be written as 1k + 2k + 3k + … n1k.
- In general, asymptotic value can be written as (nk+1)/(k+1) + Θ(nk)
- Note that, in asymptotic notations like Θ we can always ignore lower order terms. So the time complexity is Θ(nk+1 / (k+1))

##### 5. Performance of loops (A caching question)
Consider below two C language functions to compute sum of elements in a 2D array. Ignoring the compiler optimizations, which of the two is better implementation of sum?
```
// Function 1 
int fun1(int arr[R][C]) 
{ 
    int sum = 0; 
    for (int i=0; i<R; i++) 
      for (int j=0; j<C; j++) 
          sum += arr[i][j]; 
} 
  
// Function 2 
int fun2(int arr[R][C]) 
{ 
    int sum = 0; 
    for (int j=0; j<C; j++) 
      for (int i=0; i<R; i++) 
          sum += arr[i][j]; 
} 
```
- In C/C++, elements are stored in Row-Major order. So the first implementation has better spatial locality (nearby memory locations are referenced in successive iterations).
- Therefore, first implementation should always be preferred for iterating multidimensional arrays.

##### 6. Nested Loop with Multiplication
```
class NestedLoop {
	public static void main(String[] args) {
		int n = 10; // O(time complexity of the called function)
		int sum = 0; //O(?)
		double pie = 3.14; //O(?)
		int var = 1; //O(?)

		while(var < n) {
			System.out.println("Pie: " + pie); //O(?)
			for (int j = 0; j < var; j++) {
				sum++; //O(?)
			}
			var *= 2;  //O(?)
		} //end of while loop
		System.out.println("Sum: " + sum); //O(?)
	} //end of main
} //end of class
```

- O(n

7. Nested Loop with Multiplication
```
class NestedLoop {
	public static void main(String[] args) { 
		int n = 10; // O(time complexity of the called function)
		int sum = 0; //O(1)
		double pie = 3.14; //O(1)
		int var = 1;
			
		
		while(var < n) { // O(log3 n)
			System.out.println("Pie: " + pie); // O(log3 n)
		
			for (int j = 1; j < n; j = j + 2) {  // O((log3 n)* (n/2)) 
				sum++;  // O((log3 n)* (n/2) * 2) 
			}
			var *= 3;  // O(log3 n)
		} //end of while loop
		System.out.println("Sum: " + sum); //O(1)
	} //end of main
} //end of class
```

- O(nLogn)

8. Nested Loop with Multiplication
```
class NestedLoop {
	public static void main(String[] args) {
    int n = 10;    //O(1) 
    int sum = 0;  //O(1)
    int j = 1;   //O(1)
    double pie = 3.14;  //O(1) 
  
    //O(?)
    for (int var = 1; var < n; var += 3) {
      System.out.println("Pie: " + pie);
      j = 1;
      while (j < n) { //O(?)
        sum += 1;     
        j *= 3;       
      }
    }
    System.out.println("Sum: " + sum); //O(1)
	} //end of main
} //end of class
```

- O(nlogn)

9. Nested Loop with Multiplication
```
class NestedLoop {
	public static void main(String[] args) {
    int n = 10; //O(1)   
		int sum = 0; //O(1)
		double pie = 3.14; //O(1)

		for (int var = 0; var < n; var++) {    //O(n)
      int j = 1;  //O(n)
			System.out.println("Pie: " + pie); //O(n)
			while(j < var) { // O((n) * (log2 var))
        sum += 1; // O((n) * (log2 var))  
        j *= 2;  // O((n) * (log2 var))
      }
    } //end of for loop
    System.out.println("Sum: " + sum); //O(1)
  } //end of main
} //end of class
```

- 

---
