---
title: From Microservices to Distributed Systems
type: blog
date: 2020-06-06
authors: ['Ashish']
image: ../cover.jpg
tags:
- node
---
The key idea with microservices is supporting their independence from the rest of the application landscape and quick evolvability. Additionally, they should scale independently and require fewer resources than application server-based applications. In a world with constantly changing business requirements and a growing number of application clients, centralized infrastructures are getting way too expensive to operate and scale towards unpredictable load or load peaks. If we were stuck with application servers, we wouldn't have Netflix, Twitter, or Amazon.

##### Microservices Are Distributed Systems
The original definition of a distributed system is: ***"A distributed system is a model in which components located on networked computers communicate and coordinate their actions by passing messages."*** (Wikipedia) And this is exactly what happens in microservices-based architectures.

The individual services are deployed to cloud instances, physically running somewhere as they exchange messages. This is a big difference to how we used to build centralized applications. Instead of having a bunch of servers in our datacenter that handle all kinds of synchronization, transactions, and failover scenarios on our behalf, we now have individual services that evolve independently and aren't tied to each other.

There are some fundamental challenges that are unique to distributed computing like **fault tolerance**, **synchronization**, **self-healing**, **backpressure**, **network splits**, and much more.

##### What are Reactive Systems?
To build an application or system out of individual microservices, you need to use a set of design principles to make them **reactive**, **resilient**, **elastic**, and **message-driven**. If that sounds familiar, you are probably right. That's the definition from the Reactive Manifesto. A distributed system that implements the four traits of the Reactive Manifesto is what should be called a Reactive System.

<img src="https://microservices.io/i/PatternsRelatedToMicroservices.jpg"></img>


