---
title: Exercise
type: topic
section: Concurrency
course: Go Lang
tags:
- design
- system design
- ElasticSearch
---
### Merge Sort
Write a concurrent solution to the Merge Sort problem using `goroutines` and `channels`.

The gist of the Merge Sort Algorithm can be found below :
```go
func MergeSort(data [] int) [] int {
  if len(data) <= 1 {
    return data
  }
 
  mid := len(data)/2
  left := MergeSort(data[:mid])
  right := MergeSort(data[mid:])
  return Merge(left,right)
}
```

Think about the steps that can be executed independently and be synchronized to get the correct final outcome.

The MergeSort has already been implemented **sequentially**:
```go
package main
import "fmt"
         

func Merge(left, right [] int) [] int{
  merged := make([] int, 0, len(left) + len(right))
  for len(left) > 0 || len(right) > 0{
    if len(left) == 0 {
      return append(merged,right...)
    }else if len(right) == 0 {
      return append(merged,left...)
    }else if left[0] < right[0] {
      merged = append(merged, left[0])
      left = left[1:]
    }else{
      merged = append(merged, right [0])
      right = right[1:]
    }
  }
  return merged
}

func MergeSort(data [] int) [] int {
  if len(data) <= 1 {
    return data
  }

  mid := len(data)/2
  left := MergeSort(data[:mid])
  right := MergeSort(data[mid:])
  return Merge(left,right)

}

func main(){
  data := [] int{9,4,3,6,1,2,10,5,7,8}
  fmt.Printf("%v\n%v\n", data, MergeSort(data))
}
```
###### Solution
```go
package main
import "fmt"

func Merge(left, right [] int) [] int{
  merged := make([] int, 0, len(left) + len(right))
  for len(left) > 0 || len(right) > 0{
    if len(left) == 0 {
      return append(merged,right...)
    }else if len(right) == 0 {
      return append(merged,left...)
    }else if left[0] < right[0] {
      merged = append(merged, left[0])
      left = left[1:]
    }else{
      merged = append(merged, right [0])
      right = right[1:]
    }
  }
  return merged
}

func MergeSort(data [] int) [] int {
  if len(data) <= 1 {
    return data
  }
  done := make(chan bool)
  mid := len(data)/2
  var left [] int
  
  go func(){
    left = MergeSort(data[:mid])
    done <- true
  }()
  right := MergeSort(data[mid:])
  <-done
  return Merge(left,right)

}

func main(){
  data := [] int{9,4,3,6,1,2,10,5,7,8}
  fmt.Printf("%v\n%v\n", data, MergeSort(data))

}
```
Firstly, in merge sort, we keep dividing our array recursively into the `right` side and the `left` side and call the `MergeSort` function on both sides from line 30 to line 34. You will note that these two calls can be made independently and we can execute one of them in a goroutine:

Now we have to make sure that `Merge(left,right)` is executed only once we get the return values from both the recursive calls, i.e. both the `left` and `right` have been updated before `Merge(left,right)` has to execute. Hence, we introduce a channel of type `bool` on line 26 and send `true` on it as soon as `left = MergeSort(data[:mid])` is executed (line 32). The `<-done` operation blocks the code on line 35 before the statement `Merge(left,right)` so that it does not proceed until our goroutine has finished. After the goroutine has finished and we receive `true` on the `done` channel, the code proceeds forward to `Merge(left,right)` statement on line 36.

---
### Buzz Game
In the code below, you will find two goroutines which represent our players and send messages over channels signaling `Buzz` to the main routine. Now the problem with the code below is that `channel1` blocks the code, which implies that we can’t receive any message from `channel2` until we receive a message from `channel1`. Therefore, if player 2, i.e. the second goroutine buzzes before player 1, we’ll never be able to know!

Your job is to rectify the game provided to you in the code snippet below and make it fair such that we know which player buzzed first.
```go
package main

import (
  "fmt"
  "time"
  "math/rand"
)

func main() {
  channel1 := make(chan string)
  channel2 := make(chan string)

  go func() {
    rand.Seed(time.Now().UnixNano())
    time.Sleep(time.Duration(rand.Intn(500)+500) * time.Millisecond)
    channel1 <- "Player 1 Buzzed"
  }()

  go func() {
     rand.Seed(time.Now().UnixNano())
     time.Sleep(time.Duration(rand.Intn(500)+500) * time.Millisecond)
     channel2 <- "Player 2 Buzzed"
  }()
  
  fmt.Println(<-channel1)
  fmt.Println(<-channel2)    

}
```
###### Solution
```go
package main

import (
  "fmt"
  "time"
  "math/rand"
)

func main() {
  channel1 := make(chan string)
  channel2 := make(chan string)

  go func() {
    rand.Seed(time.Now().UnixNano())
    time.Sleep(time.Duration(rand.Intn(500)+500) * time.Millisecond)
    channel1 <- "Player 1 Buzzed"
  }()

  go func() {
     rand.Seed(time.Now().UnixNano())
     time.Sleep(time.Duration(rand.Intn(500)+500) * time.Millisecond)
     channel2 <- "Player 2 Buzzed"
  }()

  select{
    case message1 := <-channel1:
      fmt.Println(message1)
    case message2 := <-channel2:
      fmt.Println(message2)
  }
}
```
You can see that we unblocked the channel receiving operations by using a `select` statement 

The `select` statement chooses operations which are ready from the other end. This solution eliminates the blocking of receiving operations by channels. Hence, whichever channel will be the first to send the `Buzz` signal, the `select` statement will execute the corresponding case.

---
### Multiplication Table
In this exercise, you have been provided with a code which prints out the multiplication table from 1 to 12. It creates goroutines in a for-loop which also run another for-loop for each number from 1 to 12. However, nothing is printed out as the main routine exits before the goroutines are able to print.

You are required to solve this problem using `WaitGroup` from the `sync` package and output all the tables on to the console.

Now the output in the illustration above is very organized but since we are printing our table in goroutines which run concurrently, our output will be all over the place. This means that the following statement will execute in no specific order:

`fmt.Printf("%d x %d = %d\n", i, n, n*i)`

Here, you are required to maintain order with at least the variable `i`. For example, you can print all the calculations with the same value of `i` and then move on to the next value of `i`. Good Luck!

###### Solution:
```go
package main
import ( "fmt"
          "sync"
          "time")
          
func printTable(n int, wg *sync.WaitGroup) {
  for i := 1; i <= 12; i++ {
    fmt.Printf("%d x %d = %d\n", i, n, n*i)
    time.Sleep(50 * time.Millisecond)
  }
  wg.Done()
}

func main() {
  var wg sync.WaitGroup
  
  for number := 2; number <= 12; number++ {
    wg.Add(1)
    go printTable(number,&wg)
  }

  wg.Wait()
}
```

So we added a `WaitGroup` from the `sync` package on line 15 named `wg`. At every iteration in the for-loop in the main routine, we increment the counter of `wg` on line 18. In the next step on line 19, we execute the `printTable` function in a goroutine and pass `number` and `wg` as input arguments. After launching all the goroutines for `number = 2` to `number = 12` in the for-loop which sets the counter of `wg` to `11`, we proceed to line 22 and call `Wait()` on `wg`. This blocks the main routine until the counter of `wg` equals `0`. Hence, our main routine cannot exit until and unless we are done with the printing inside the `printTable` functions.

Let’s see what’s happening in the `printTable` function:
```go
func printTable(n int, wg *sync.WaitGroup) {
  for i := 1; i <= 12; i++ {
    fmt.Printf("%d x %d = %d\n", i, n, n*i)
    time.Sleep(50 * time.Millisecond)
  }
  wg.Done()
}
```
We cause a delay of 50ms in each iteration of the for-loop on line 9. This implies that all the goroutines, when running concurrently, will print out their first iteration where `i` equals `1` before moving on to the next iteration. This ensures an order where all the prints with `i` equal 1 will be printed before `i` equals `2` and so on. Finally, we call `Done` on `wg` as we get done with the goroutine to decrement the counter of `wg` (line 11).

---
### Prefix Sum Problem
The Prefix Sum of an array `arr` of length n is another array `prefixSum_arr` of the same length such that the value of the `i`th index in `prefixSum_arr` is the sum of all values from `arr[0], arr[1]...arr[i]`.
```go
package main 
import "fmt"

func PrefixSum(my_array,my_output []int ,parent chan int) {
	if len(my_array)<2{
		parent<-my_array[0]
		my_output[0] = my_array[0] + <-parent
		
	}else if len(my_array)<1{
		parent<-0
		<-parent
	}else  {
		mid:=len(my_array)/2
		left:= make(chan int)
		right:=make(chan int)
		go PrefixSum(my_array[:mid],my_output[:mid],left)
		go PrefixSum(my_array[mid:],my_output[mid:],right)
		leftsum:=<-left
		parent<- leftsum +<-right
		fromleft:= <-parent
		left<-fromleft
		right<-fromleft + leftsum
		<-left
		<-right

	}
	parent<-0
}

func main () {
	data:= []int{1,2,3,4}
	output:= make([]int,len(data))
	parent :=make(chan int)
	go PrefixSum(data,output,parent)
	sum:= <-parent
	fromleft:=0
	parent<-fromleft
	donezero:=<-parent
	fmt.Println(data,output,sum,donezero)
}
```

---
### Quiz
###### Q: Newly created goroutines are executed with independent address space.
**Ans:** False, Newly created goroutines are executed within the shared address space.

###### Q: What is the output of the following program?
```go
func main(){
    var count int
    go func(){
        count++
        fmt.Println(count)
    }()
   go func(){
        count=2
        fmt.Println(count)
 }()
}
```
**Ans:** No Output

###### Q: The WaitGroups from the sync package help us in communicating between concurrent operations.
**Ans:** False

###### Q: WaitGroups and Mutex are imported from which of the following packages?
**Ans:** The `sync` Package

###### Q: What is the output of the following program?
```go
func main() {  
    channel1 := make(chan string)
    select {
    case <-channel1:
    default:
        fmt.Println("this is the default case.")
    }
}
```
**Ans:** this is the default case.


---