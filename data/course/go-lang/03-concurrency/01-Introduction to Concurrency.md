---
title: Introduction to Concurrency
type: topic
section: Concurrency
course: Go Lang
tags:
- design
- system design
- ElasticSearch
---
### What is concurrency?
Concurrency, by definition, is the ability to break down a computer program or algorithm into individual parts, which can be executed independently. The final outcome of a concurrent program is the same as that of a program which has been executed sequentially. Using concurrency, we are able to achieve the same results in lesser time, thus increasing the overall performance and efficiency of our programs.

The trick with writing concurrent programs is to ensure the correctness of your program yourself. Therefore, keep in mind that all the individual chunks of your concurrent program should be executed independently and have access to the shared memory i.e. they can read from or write to the same memory location. Also, you need to take care of the allocation of resources so that no process starves due to a lack of resources. In addition, you will have to synchronize and coordinate between processes so that you can prevent a deadlock if they are dependent on each other.

In short, concurrency is all about designing and structuring your algorithm. It is widely used in computer science today to solve problems efficiently. One such example is that of bank operations in which someone deposits and withdraws cash from their bank account at the same time. The bank account is the shared resource and both the operations have to be executed concurrently in order to get the correct bank balance at the end. Hence, you have to write your code concurrently, where deposit() and withdraw() are independent operations which will read/write to the same bank account at the same time and obtain the exact balance after the execution.

The bottom line is that the concept of concurrency is tricky to understand and implement. In general, concurrency implies that a lot of things are happening at the same time so people tend to confuse it with parallelism. Please remember that concurrency and parallelism are two separate concepts in computer science, so make sure that you don’t mix them up!

### Concurrency vs. Parallelism
A lot of people confuse concurrency with parallelism because they both somewhat imply executing code simultaneously but they are two completely different concepts.

> "**Concurrency** is about dealing with lots of things at once."
"**Parallelism** is about doing lots of things at once."

##### What is parallelism?
Parallelism is when we break up a task into subtasks and execute them simultaneously. Each of the subtasks is independent and may or may not be related. In short, we carry out many computations at the same time in parallelism.

The multicore processor in your computer is an example of parallelism where parallel tasks are run on multiple cores to solve problems. In this way, parallel computing helps us solve large problems efficiently by using more than one CPU to execute multiple computations at the same time, which saves time in the case of large datasets.

However, parallel programming is hard to achieve as we need to ensure the independence of tasks when it comes to dividing the problem and sharing the data. This is where concurrency comes into play!

Concurrency and Parallelism are not the same but are closely related to each other.

> "**Concurrency** is about structure."
"**Parallelism** is about execution."

When we say that parallelism is about the execution of tasks that are independent of each other, we first need to create these independent tasks through concurrency. That is what we do when we design and structure a big problem into smaller problems which can be solved independently. Concurrency will ensure that these independent tasks are able to coordinate and synchronize with each other such that we get the correct final result. Therefore concurrency has to be there for parallelism to exist.

##### Example: Let’s Go to Work!
Let’s draw a scenario to compare and contrast between concurrency and parallelism:

After waking up in the morning, you have to get ready to go to work. Let’s divide this scenario into four steps:
1. Getting ready (Washing your face, changing clothes etc)
1. Preparing breakfast
1. Eating breakfast
1. Going to the office

###### Sequential Approach
You will first get ready and eventually move on to preparing breakfast for yourself. Then you’ll eat your breakfast and leave for the office either by walking, driving or using public transport. Every task has to be in sequence with another task.

###### Concurrent Approach
Let’s now be efficient and plan a better routine. You can try getting ready and preparing your breakfast at the same time. For example, if you have to toast your bread slice or boil water to make tea, you can start with these tasks and then switch to either washing your face or changing your clothes. This will save you time that you spend waiting for the bread to toast or for the water to boil. Note that you are the one coordinating and managing yourself between the two tasks. You are not doing both tasks at the exact same time but you have broken down the main tasks into individual independent tasks which allow you to switch back and forth between them. Also, you need signals from the toaster and the boiler that they are done so you can resume the ‘Preparing breakfast’ task. This implies that a certain kind of communication needs to exist between the two tasks currently in progress. By synchronizing and communicating between these two tasks, you are using concurrency to solve your problem and making progress on both tasks simultaneously instead of doing them sequentially.

Furthermore, we can also use the concurrent approach for step 3 and step 4. Notice that step 2 is a pre-requisite to step 3. You cannot eat your breakfast if you haven’t prepared it. Thus step 3 will have to follow step 2 in our current scenario. The same goes for step 4. You obviously can not go to the office without getting ready and having your breakfast (some people can still manage it but it is a very unhealthy thing to do)!

Coming back to designing our routine: you can make progress on both step 3 as well as step 4 by eating while walking or driving to the office. Obviously, it will be difficult to eat this way but the coordination and management of these two tasks are totally up to you. This is where you will need to come up with a concurrent design, i.e., you can either wait until traffic signals to take a bite of your breakfast while driving or you can walk for a certain distance, stop and eat.

In summary, the concurrent approach is all about you designing and structuring your problem in a way that suits you while making the process more efficient.

###### Parallel Approach
Let’s discuss the parallel aspect of the problem now. To make step 1 and step 2 completely parallel, the ‘Getting Ready’ and ‘Prepare breakfast’ tasks have to run in parallel. Think of how it is possible. As you cannot simultaneously handle this yourself, let’s make these tasks completely independent. This can happen if you have a ready-made breakfast delivered to you by a food-delivery service or maybe your roommate was nice enough to prepare yours while making their breakfast. In this way, you only have to worry about yourself getting ready while the breakfast preparation will be going on in parallel.

Regarding using parallelism in step 3 and step 4: if you use public transport you can eat your breakfast while sitting on a bus or train. The bus or train will take you towards your office in parallel to you eating your breakfast.

###### Concurrent and Parallel
You can also use both approaches to solve your problem. For example, you can handle step 1 and step 2 concurrently while step 3 and step 4 can be executed using the parallel approach.

Hope things make sense and you are with me so far!

Again, let’s reiterate that concurrency is about composing a solution to a problem while parallelism is solving the problem by running things in parallel. Remember concurrency does not imply parallelism. It is just a way to structure and design tasks independently so that we can use parallelism to make them efficient.

###### Example: Coffee Machine
Let’s look at another example to make things more clear. In the illustration below, two queues are lined up to get coffee from the coffee machines. Concurrency will decide how the two queues will coordinate and manage themselves to get coffee from one coffee machine. The idea is to add a design which will ensure the independence of subtasks such that if they run in parallel, our problem can be more efficiently solved. On the other hand, in the parallelism approach, each queue has its own coffee machine and the two queues are completely independent of each other.

https://blog.golang.org/waza-talk

---
### Communicating Sequential Processes
For a concurrent program, concurrent processes have to operate individually but with a shared data source. However, this leads to problems such as race conditions, which we will discuss in the next lesson. Hence, Tony Hoare came up with an effective solution in 1978, i.e. communication between concurrent processes. He put forth the idea of communication in concurrency in a paper titled **Communicating Sequential Processes**. Have a look at it here. This communication allows us to give a better structure to our concurrent approach and is a simpler solution than using locks, semaphores, etc.

According to this paper, processes have been conceptualized as individual blocks of logic which take in some input and give out some output.

Think of this concept in terms of concurrency. We can say that concurrent processes can synchronize and coordinate with each other by communicating about their input and output. This is what is suggested in the paper. The paper covers two main concepts:
1. Synchronization
2. Dijkstra’s Guarded Commands

The paper proposes a formal language for carrying out communication between concurrent processes. If you want to go in more detail regarding the syntax of the language for patterns of interaction between concurrent processes, you should definitely read the paper.

> "Don't communicate by sharing memory".
"share memory by communicating".

Go, as well as Erlang and Limbo, has been highly inspired by the concept of communicating sequential processes. Golang makes use of **channels** to achieve communication between concurrent processes. We’ll cover channels in detail in the next chapter.

Furthermore, CSP made a breakthrough in Computer Science especially in the field of concurrency. The paper is a must-read for any Computer Science enthusiast.

---
### Data Races and Race Conditions
##### Data Race
A data race happens when processes have to access the same variable concur­rently i.e. one process reads from a memory location while another simultaneously writes to the exact same memory location.
```go
package main
import "fmt"

func main() {
    number := 0;
    go func(){
      number++ //reading and modifying the value of 'number'
    }()
    fmt.Println(number) //reading the value of 'number'
}
```
We increment the value of the variable number i.e. we first access the value, add 1 to it and then write the new value back to the memory. number++ takes place using an anonymous go routine. In the next step, we read the value of number and print it onto the console. However, the output of the code above turns out to be 0 because the main routine finishes itself before the goroutine has a chance to execute itself completely. We’ll explore more about this concept in the second chapter.

The point to note in the above example is that number++ and fmt.Println(number) are participating in a data race as number++ is reading from and writing to the same memory location that fmt.Println(number) is reading from.

This will get us in trouble if these operations execute at the same time which is a possibility when it comes to executing code with goroutines as they are concurrent operations.

While writing concurrent code, you need to be careful about data races and avoid the temptation to think sequentially. Instead, keep in mind all possible timings of your concurrent operations while designing your solution. This is because some data races are benign whereas some lead to race conditions.

##### Race Condition
A race condition is a flaw in a program regarding the timing/ordering of operations which disrupts the logic of the program and leads to erroneous results.
```go
package main
import "fmt"

func deposit(balance *int,amount int){
    *balance += amount //add amount to balance
}

func withdraw(balance *int, amount int){
    *balance -= amount //subtract amount from balance
}

func main() {
    balance := 100 
    go deposit(&balance,10) //depositing 10
    withdraw(&balance, 50) //withdrawing 50
    fmt.Println(balance) 
}
```
In the code above, we have a balance of 100. We first execute the deposit() operation using a goroutine and deposit 10 to our balance. Next, we withdraw 50 from our balance which makes the final balance 60. However, if you run the code, the final value of balance will come out to be 50. This is as a result of a race condition which has compromised the correctness of the program due to an incorrect order of execution of operations.

##### Data Race Detector
Amazingly, Go has its own in-built data race detector which you can learn more about here. The code below runs the data race detector on our previous example. 
```go
package main
import "fmt"

func deposit(balance *int,amount int){
    *balance += amount //add amount to balance
}

func withdraw(balance *int, amount int){
    *balance -= amount //subtract amount from balance
}

func main() {
    balance := 100 
    go deposit(&balance,10) //depositing 10
    withdraw(&balance, 50) //withdrawing 50
    fmt.Println(balance) 
}
```

##### How to avoid data races?
In Go, we can avoid data races by using channels or locks. They will allow us to synchronize memory access to all shared mutable data. You haven’t been introduced to channels yet but we’ll explore them in detail in the next chapter. Wait until then!

---
### Deadlocks
##### What is a deadlock?
A deadlock occurs when all processes are blocked while waiting for each other and the program cannot proceed further.

##### Coffman Conditions
There are four conditions, known as the Coffman Conditions, that must be present simultaneously for a deadlock to occur:

###### Mutual Exclusion
A concurrent process holds at least one resource at any one time making it non-sharable.

###### Hold And Wait
A concurrent process holds a resource and is waiting for an additional resource.

###### No Preemption
A resource held by a concurrent process cannot be taken away by the system. It can only be freed by the process holding it.

###### Circular Wait
A concurrent process must be waiting on a chain of other concurrent processes such that P1 is waiting on P2, P2 on P3, and so on, and there exists a Pn which is waiting on P1. This forms a circular loop.

In order to prevent deadlocks, we need to make sure that at least one of the conditions stated above should not hold. The good news is that Go is able to detect deadlocks at runtime.

Here is an example of how Go detects deadlocks:
```go
package main
import "fmt"

func main() {
	mychannel := make(chan int)
	mychannel <- 10
	fmt.Println(<-mychannel)
}
```
It will throw error. This is because the program is stuck on sending a value to the channel: mychannel <- 10. The sending operation is a blocking operation and requires the receive channel to be ready before sending data to the channel. We’ll learn more about this when we’ll study channels in the next chapter!

Note that we can avoid this deadlock if we put the send operation in a goroutine such that both the send/receive operations are ready for each other simultaneously.
```go
package main
import "fmt"

func main() {
	mychannel := make(chan int)
	go func(){
		mychannel <- 10
	}()
	fmt.Println(<-mychannel)
}
```

Bear in mind that Go only detects deadlocks when the program is stuck as a whole and not when a few of the goroutines are blocked. Also, goroutines are mostly blocked while waiting for a channel operation or for the locks which belong to the sync package. Have a look at an example below:
```go
package main
import "fmt"

func main() {
	mychannel1 := make(chan int)
	mychannel2 := make(chan int)
	mychannel3 := make(chan int)
	go func(){
		<-mychannel1
	}()

	go func(){
		mychannel2 <- 20
	}()

	go func(){
		<-mychannel3 
  }()
  
	fmt.Println(<-mychannel2)
}
```

As you can see from the code above, the first and the third goroutine are blocked because there is no send operation that sends to these channels. Still, the program executes successfully and we don’t get any deadlock error as it only occurs when the program is stuck as a whole. Now that you have a sense of what deadlocks are, we’ll learn about starvation in the next lesson.

---
### Starvation
##### What is starvation?
Starvation happens when a process is deprived of necessary resources and is unable to complete its function.

Starvation can happen because of deadlocks or inefficient scheduling algorithms for processes. Also, sometimes some greedy concurrent processes deny resources to other processes or adequate resources simply do not exist. Hence, in order to solve starvation, you should either have an independent entity as a resource manager or employ better resource-allotment algorithms which make sure that every process gets its fair share of resources.

---



