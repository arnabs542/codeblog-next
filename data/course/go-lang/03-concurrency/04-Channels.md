---
title: Channels
type: topic
section: Concurrency
course: Go Lang
tags:
- design
- system design
- ElasticSearch
---
### What is a Channel?
A channel is a pipe between goroutines to synchronize execution and communicate by sending/receiving data.

Channels are based on the idea of [**Communicating Sequential Processes (CSP)**](https://en.wikipedia.org/wiki/Communicating_sequential_processes) put forward by Hoare in 1978.

##### Creating a Channel
```go
channelName := make(chan datatype)
```
The `datatype` is the type of data that you will pass on your channel. For example, to create a channel named `result` of type `int`, you can write:
```go
result := make (chan int)
```

##### Sending on a Channel
```go
channelName <- data
```
If you want to send `2` on `result`, you can do so using the following code:
```go
result <- 2
```

The sending of data over the channel will block the code from proceeding further until the receive operation receives the data sent on to the channel.

The same goes for receiving data on a channel. The receive operation blocks the code until and unless some data is sent by the send operation.

##### Receiving on a Channel
```go
data := <- channelName
```
Hence, in order to receive and store the value 2 sent on the result channel, we’ll do the following:
```go
value := <- result
```
We can also receive by using `<-` as a unary operator as shown below:
```go
<- result
```

###### Example
```go
package main
import "fmt"
func sendValues(myIntChannel chan int){

  for i:=0; i<5; i++ {
    myIntChannel <- i //sending value 
  }

}

func main() {
  myIntChannel := make(chan int)

  go sendValues(myIntChannel)

  for i:=0; i<5; i++ {
    fmt.Println(<-myIntChannel) //receiving value
  }
}
```

In a goroutine created on line 14, the function `sendValues` was sending values over `myIntChannel` by using a for-loop. On the other hand, on line 17, `myIntChannel` was receiving values and the program was printing them onto the console. The most important point to note is that both the following statements were blocking operations:
- `myIntChannel <- i`
- `<-myIntChannel`

Hence, the program when blocked on `myIntChannel <- i` was unblocked by the `<-myIntChannel` statement. This was only possible as they were running concurrently.

```go
package main
import "fmt"
func sendValues(myIntChannel chan int){

  for i:=0; i<5; i++ {
    myIntChannel <- i //sending value 
  }

}

func main() {
  myIntChannel := make(chan int)

  go sendValues(myIntChannel)

  for i:=0; i<6; i++ {
    fmt.Println(<-myIntChannel) //receiving value
  }
}
```

So I just changed the for loop condition in the main loop from `i < 5` to `i < 6`. As a result, the main routine is blocked on `<-myIntChannel` because the sending operation has sent only 5 values which were received by the 5 iterations of the loop. However, for the 6th iteration, there is no sending operation that will send value on the channel. Therefore, the program is blocked on the receiving operation resulting in a deadlock.

##### Closing a Channel
```go
close(channelName)
```
Closing a channel means that you can no longer communicate on it. Please note that it only makes sense for a sender, not a receiver, to close a channel because the receiver does not know if it has received everything or not. Now let’s try closing the channel:
```go
package main
import "fmt"
func sendValues(myIntChannel chan int){

  for i:=0; i<5; i++ {
    myIntChannel <- i //sending value 
  }
  close(myIntChannel)
}

func main() {
  myIntChannel := make(chan int)

  go sendValues(myIntChannel)

  for i:=0; i<6; i++ {
    fmt.Println(<-myIntChannel) //receiving value
  }
}
```
You can see that when we close the channel after all our send operations, the receive operation returns 0 without blocking on the 6th iteration.

Additionally, the receive operation returns another value with the data to indicate whether the channel is open or not. Let’s see how we can use it to solve our problem:
```go
package main
import "fmt"
func sendValues(myIntChannel chan int){

  for i:=0; i<5; i++ {
    myIntChannel <- i //sending value 
  }
  close(myIntChannel)
}

func main() {
  myIntChannel := make(chan int)

  go sendValues(myIntChannel)

  for i:=0; i<6; i++ {
    value, open := <-myIntChannel
    if !open {
       break;
    }
    fmt.Println(value) //receiving value
  }
}
```
Here, we check if the channel is open or not using `open` and break the loop if the channel is closed.

Another way to implement the same functionality as above is by using the range.
```go
package main
import "fmt"
func sendValues(myIntChannel chan int){

  for i:=0; i<5; i++ {
    myIntChannel <- i //sending value 
  }
  close(myIntChannel)
}

func main() {
  myIntChannel := make(chan int)

  go sendValues(myIntChannel)

  for value := range myIntChannel {
    fmt.Println(value) //receiving value
  }
}
```

##### Deferring the closing of a Channel
The `defer` function defers the execution of a function until the end of the surrounding function.
```go
package main
import "fmt"
func sendValues(myIntChannel chan int){

  for i:=0; i<5; i++ {
    myIntChannel <- i //sending value 
  }
  
}

func main() {
  myIntChannel := make(chan int)
  defer close(myIntChannel)
  go sendValues(myIntChannel)

  for i:=0; i<5; i++ {
    fmt.Println(<-myIntChannel) //receiving value
  }
}
```
In general, it is good practice to defer the closing of channels in the main program so that we clean up everything ourselves.

---
### Buffered Channels
**Code Snippet**
```go
package main
import "fmt"

func main() {
	mychannel := make(chan int)
	mychannel <- 10
	fmt.Println(<-mychannel)
}
```
Above code didn’t work. This is because of the sending and receiving operations which are blocking the code. When we wrap one of them in a goroutine such that they are ready to unblock each other, the program executes successfully.
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
Alternatively, we can also use **buffered channels** to solve this issue.

##### Creating A Buffered Channel
Buffered Channels are channels with a **capacity/buffer**.
```go
channelName := make(chan datatype, capacity)
```
**Example**
```go
package main
import "fmt"

func main() {
	mychannel := make(chan int, 2)
	mychannel <- 10
	fmt.Println(<-mychannel)
}
```
As you can see, we don’t get a deadlock as before. This is because the send operation on line 6 does not block the code until we have reached our capacity. 
```go
package main
import "fmt"

func main() {
	mychannel := make(chan int, 2)
	mychannel <- 10
	mychannel <- 20
	mychannel <- 30
	fmt.Println(<-mychannel)
}
```
The code above generates an error as `mychannel` has a capacity of `2` and we already sent the data two times over the channel. Hence `mychannel <- 30` on line 8 blocks the code resulting in a deadlock because it is our third attempt to send data over the channel which has a capacity of `2`.

Also, note that the receive operation will block the code if it finds the buffer to be empty.
```go
package main
import "fmt"

func main() {
	mychannel := make(chan int, 2)

	fmt.Println(<-mychannel)
}
```
In conclusion, we can say that if there are no receive operations for a channel, a goroutine can still perform `c` sending operations, where `c` is the capacity of the buffered channel. So you can see that **buffered channels remove synchronization**. They work in a way similar to **mailboxes** and their usage depends on the type of problem you have to solve.







---