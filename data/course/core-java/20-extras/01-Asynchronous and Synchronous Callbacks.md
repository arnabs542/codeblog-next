---
title: Asynchronous and Synchronous Callbacks
type: topic
section: Extras
course: Core Java
tags:
- java
---
#### CallBack Function
A CallBack Function is a function that is passed into another function as an argument and is expected to execute after some kind of event. The purpose of the callback function is to inform a class Sync/Async if some work in another class is done. This is very useful when working with Asynchronous tasks.

In Java, Callbacks can be implemented using an interface. The general procedure for implementation is given below.
1. Define the methods in an interface that we want to invoke after callback.
2. Define a class that will implement the callback methods of the interface.
3. Define a reference in other class to register the callback interface.
4. Use that reference to invoke the callback method.

#### Synchronous Callback
The code execution will block or wait for the event before continuing. Until your event returns a response, your program will not execute any further. So Basically, the callback performs all its work before returning to the call statement. The problem with synchronous callbacks are that they appear to lag.

```java
```

#### Asynchronous Callback


```java
```