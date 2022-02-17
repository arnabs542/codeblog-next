---
title: 10 Common Software Architectural Patterns
type: blog
date: 2020-06-07
authors: ['Ashish']
image: ../cover.jpg
tags:
- system design
---
Ever wondered how large enterprise scale systems are designed? Before major software development starts, we have to choose a suitable architecture that will provide us with the desired functionality and quality attributes. Hence, we should understand different architectures, before applying them to our design.


#### What is an Architectural Pattern?
> An **architectural pattern** is a general, reusable solution to a commonly occurring problem in software architecture within a given context. Architectural patterns are similar to software design pattern but have a broader scope. - Wikipedia

In this article, I will be briefly explaining the following 10 common architectural patterns with their usage, pros and cons.

#### 1. Layered pattern
This pattern can be used to structure programs that can be decomposed into groups of subtasks, each of which is at a particular level of abstraction. Each layer provides services to the next higher layer.
The most commonly found 4 layers of a general information system are as follows.
- **Presentation layer** (also known as **UI layer**)
- **Application layer** (also known as **service layer**)
- **Business logic layer** (also known as **domain layer**)
- **Data access layer** (also known as **persistence layer**)

##### Usage
1. General desktop applications.
2. E commerce web applications.

<img src="https://miro.medium.com/max/376/1*jMWk_JqqyyloVPhTs_Zd1A.png"></img>

#### 2. Client-server pattern
This pattern consists of two parties; **one server** and **multiple clients**. The server component will provide services to multiple client components. Clients request services from the server and the server provides relevant services to those clients. Furthermore, the server continues to listen to client requests.

##### Usage
1. Online applications such as email, document sharing and banking.

<img src="https://miro.medium.com/max/568/1*4xX_WQQuD2u0PMK5bcWFkQ.png"></img>

#### 3. Master-slave pattern
This pattern consists of two parties; **master** and **slaves**. The master component distributes the work among identical slave components, and computes a final result from the results which the slaves return.

##### Usage
1. In database replication, the master database is regarded as the authoritative source, and the slave databases are synchronized to it.
2. Peripherals connected to a bus in a computer system (master and slave drives).

<img src="https://miro.medium.com/max/1084/1*lsK9QntZl2d5oLojwRGXDg.png"></img>

#### 4. Pipe-filter pattern
This pattern can be used to structure systems which produce and process a stream of data. Each processing step is enclosed within a filter component. Data to be processed is passed through pipes. These pipes can be used for buffering or for synchronization purposes.

##### Usage
1. Compilers. The consecutive filters perform lexical analysis, parsing, semantic analysis, and code generation.
2. Workflows in bioinformatics.

<img src="https://miro.medium.com/max/1400/1*qikehZcDhhl_wWsqeI_nvg.png"></img>

#### 5. Broker pattern
This pattern is used to structure distributed systems with decoupled components. These components can interact with each other by remote service invocations. A **broker** component is responsible for the coordination of communication among components.

Servers publish their capabilities (services and characteristics) to a broker. Clients request a service from the broker, and the broker then redirects the client to a suitable service from its registry.

##### Usage
1. Message broker software such as Apache ActiveMQ, Apache Kafka, RabbitMQ and JBoss Messaging.

<img src="https://miro.medium.com/max/1400/1*1qRQZjLRAd0yY_T9p2OgBw.png"></img>

#### 6. Peer-to-peer pattern
In this pattern, individual components are known as peers. Peers may function both as a client, requesting services from other peers, and as a server, providing services to other peers. A peer may act as a client or as a server or as both, and it can change its role dynamically with time.

##### Usage
1. File-sharing networks such as Gnutella and G2)
2. Multimedia protocols such as P2PTV and PDTP.

<img src="https://miro.medium.com/max/520/1*ROvkckSTw1UncrbQSmUJUQ.png"></img>

#### 7. Event-bus pattern
This pattern primarily deals with events and has 4 major components; **event source**, **event listener**, **channel** and **event bus**. Sources publish messages to particular channels on an event bus. Listeners subscribe to particular channels. Listeners are notified of messages that are published to a channel to which they have subscribed before.

##### Usage
1. Android development
2. Notification services

<img src="https://miro.medium.com/max/1264/1*DOZ4nVR9zkJm-EnXT3KOGQ.png"></img>

#### 8. Model-view-controller pattern
This pattern, also known as MVC pattern, divides an interactive application in to 3 parts as,
1. **model** — contains the core functionality and data
2. **view** — displays the information to the user (more than one view may be defined)
3. **controller** — handles the input from the user

This is done to separate internal representations of information from the ways information is presented to, and accepted from, the user. It decouples components and allows efficient code reuse.

##### Usage
1. Architecture for World Wide Web applications in major programming languages.
2. Web frameworks such as Django and Rails.

<img src="https://miro.medium.com/max/1400/1*OP0CS6O5Sb66jpc-H-IuRQ.png"></img>

#### 9. Blackboard pattern
This pattern is useful for problems for which no deterministic solution strategies are known. The blackboard pattern consists of 3 main components.
- **blackboard** — a structured global memory containing objects from the solution space
- **knowledge source** — specialized modules with their own representation
- **control component** — selects, configures and executes modules.

All the components have access to the blackboard. Components may produce new data objects that are added to the blackboard. Components look for particular kinds of data on the blackboard, and may find these by pattern matching with the existing knowledge source.

##### Usage
1. Speech recognition
1. Vehicle identification and tracking
1. Protein structure identification
1. Sonar signals interpretation.

<img src="https://miro.medium.com/max/1060/1*ArbMx7A21I47llvwUTiSDg.png"></img>

#### 10. Interpreter pattern
This pattern is used for designing a component that interprets programs written in a dedicated language. It mainly specifies how to evaluate lines of programs, known as sentences or expressions written in a particular language. The basic idea is to have a class for each symbol of the language.

##### Usage
1. Database query languages such as SQL.
2. Languages used to describe communication protocols.

<img src="https://miro.medium.com/max/1320/1*DrC3T5R4SsdcQY6aXLCRZA.png"></img>

---
#### Comparison of Architectural Patterns
The table given below summarizes the pros and cons of each architectural pattern.

<img src="https://miro.medium.com/max/2000/1*Z9dKeyf6yi0nFMaUZF1P3Q.png"></img>

