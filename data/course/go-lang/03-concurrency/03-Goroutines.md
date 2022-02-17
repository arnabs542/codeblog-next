---
title: Goroutines
type: topic
section: Concurrency
course: Go Lang
tags:
- design
- system design
- ElasticSearch
---
#### What is Goroutine?
A **goroutine** is a function or a method which is executed concurrently with the rest of the program.

#### Syntax
```go
go function/method(input parameters)
```

The current goroutine evaluates the input parameters to the functions/methods which are executed in the new goroutines. Even our `main()` function is a goroutine which was invoked by the implicitly created goroutine managed by Go runtime.
```go
package main
import "fmt"

func WelcomeMessage(){
    fmt.Println("Welcome to Simplify Codes!")
}

func main() {
  go WelcomeMessage()
  fmt.Println("Hello World!")
}
```
You can never be sure about the output of the above program. Sometimes it is just `Hello World!` while at other times the output may show both the strings `Welcome to Simplify Codes!` and `Hello World!` but in a different order.

**What is actually happening?** 

On line 9, we create a goroutine which executes the function `WelcomeMessage()` concurrently. The program then moves to line 10 and executes `fmt.Println("Hello World!")`. Remember here that the goroutine executing `WelcomeMessage()` was also running concurrently so whether you see `Hello World!` first or `Welcome to Simplify Codes!` depends on which code finishes first. But what happens when we only have `Hello World!` as the output?

Recall that the main function is also a kind of goroutine, so when f`mt.Println("Hello World!")` executes, the main goroutine finishes and we exit the program regardless of what other goroutines might be doing in the background. Hence, we don’t see the output from the `WelcomeMessage()` goroutine as the program exits even before the `WelcomeMessage()` function has finished.

```go
package main
import "fmt"

func WelcomeMessage(){
    fmt.Println("Welcome to Educative!")
}

func main() {
  go WelcomeMessage()
  go func(){  
    fmt.Println("Hello World!")
  }()
}
```

So no output, huh? If you try to figure it out, you’ll realize that the main goroutine again finished causing the program to exit before we could get the results from the goroutines on line 9 and line 10. Let us now pause our main goroutine and give the other goroutines time to finish as shown in the example below.
```go
package main
import (
  "fmt"
  "time"
)

func WelcomeMessage(){
    fmt.Println("Welcome to Educative!")
}

func main() {
  go WelcomeMessage()
  go func(){  
    fmt.Println("Hello World!")
  }()

  time.Sleep(time.Millisecond*200)
}
```
Now you can see the results from both goroutines we created in the `main` because we used the `time.Sleep()` function to cause a time delay which allows other goroutines to finish before we exit the program.

You might have realized that this is not an efficient solution but we will solve this problem by using **wait groups** from the **sync** package in the upcoming lessons.

So far, we already know that the go statement runs a func­tion in a sepa­rate thread of execu­tion. The simplicity of the `go` command to create concurrent processes is what sets the Golang apart from other languages. Previously, developers used threads to implement concurrency in C++/Java which made it a bit complicated. But with Golang, you simply type `go function/method` and the program creates a goroutine which will execute **concurrently** and **immediately** return to the next line of the code in the parent routine. In doing so, the program will ignore any return values from the goroutine. This ease with which concurrency can be implemented using Go has made it popular in the concurrent programming world.

## The Fork-Join Model
The **fork-join** model essentially implies that a child thread/process splits from its parent thread/process to run concurrently with the parent process. After completing its execution, the child process merges back into the parent process. The point where it joins back is called the **join point**. Goroutines work in a similar fashion. Sometimes you won’t have a join point in your program, for example, in cases where goroutines only print onto the console and exit. On the other hand, if you’ll have a join point, you’ll have to synchronize your goroutine with the rest of the program.

<img src="https://pegasuswang.github.io/booknotes/golang/concurrency-in-go/join_point.png" style="width: 400px;"></img>
<img src="https://rogerwelin.github.io/assets/images/flow.png" style="width: 600px;"></img>

#### Goroutines are not necessarily running in parallel!
Goroutines don’t necessarily run in parallel. They can be running sequentially in the background or can start running at different times. On the other hand, parallelism really depends on the underlying processors and CPUs available. Therefore, goroutines might give the illusion of running in parallel while just executing concurrently.
```go
package main
import "fmt"

func WelcomeMessage(){
    fmt.Println("Welcome to Educative!")
}

func main() {
  go WelcomeMessage()

  fmt.Println("Hello World!")
}
```
Prints from the goroutine and the main routine are printed at separate times and not at the same time. Sometimes, the goroutine waits for the main routine to print first while at other times the main routine completes its execution and exits without waiting for the goroutine to complete itself.

#### All goroutines have the same "address space"
You might have realized this by yourself but let me iterate again that all goroutines in a single program share the same address space. Hence, it is the programmer’s job to make sure that they implement concurrency while keeping in mind the prevention of race conditions and the handling of synchronization issues between concurrent operations.

#### Goroutines as light-weight threads
###### What are threads?
> Threads are chunks of code which can be executed separately by the processor.

Goroutines can be thought of as **light-weight threads**, though bear in mind that they are not actual OS threads. A single thread may run thousands of goroutines in them using the **Go runtime scheduler** which uses **cooperative scheduling**. This implies that if the current goroutine is blocked or has been completed, the scheduler will move the other goroutines to another OS thread. Hence, we achieve efficiency in scheduling where no routine is blocked forever.

Additionally, goroutines are less costly than threads as they take up only a few kilobytes of memory.

Besides, **goroutines have their own call stack** which can grow and shrink dynamically. This also gives us an edge over threads as the size of the threads have to be specified earlier.

As a result, a goroutine uses far fewer resources than threads. Combining this with the clean API provided by the Go runtime for the programmer, it is easier to implement concurrency in Go than in C++/Java.




---