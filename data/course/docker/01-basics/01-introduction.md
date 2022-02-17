---
title: 'Introduction'
type: 'topic'
section: 'Basics'
course: 'Docker'
tags:
- docker
---
## What is Docker?
- Docker is a platform or ecosystem around creating and running containers.
- It carves up a computer into sealed containers that run your code.
- Docker makes it easy and straightforward to install and run a software without worrying about setup or dependencies.

---
#### Docker Image
- A Docker image is a single file that contains all the dependencies and configurations required to run a very specific program.

#### Docker Container
- A Docker container is the running instance (program) of a Docker image.
- These containers hold the complete package.
- They are sealed units of software. Contains everything required to run the code.

---
## How Operating System works?
- Each OS has a Kernel, which is a running process that governs access between all the programs that are running on your computer and all the physical hardware that is connected to your computer.
- Processes running on your computer issues request to kernal to interact with a piece of hardware. This interactions are called System calls. These are like function invocation
- Let's say, Chrome needs Python v2 and NodeJS needs Python v3 to run. In hard disk, we only have Python v2. So, NodeJS will not work properly. We can use **namespacing** to isolate resources per process (or group of processes).
- A **container** is a process or a set of processes that have a grouping of resources specifically assigned to it.
- An **image** is consists of a **File System Snapshot** and a **startup command**.

#### What Kernels do?
- Responds to messages from the hardware.
- Start and schedule programs
- Control and organize storage
- Pass messages between programs
- Allocate resources, memory, CPU, network, and so on.
- Create containers by Docker configuring the kernel

#### What docker does?
- Program written in Go.
- Manages Kernel features.
- Uses "cgroups" to contain processes.
- Uses "namespaces" to contain networks.
- Uses "copy-on-write" filesystems to build images.
- Makes scripting distributed systems "easy"

#### Docker Control Socket
- Docker is 2 programs: 1. client 2. server
- The server receives commands over a socket (either over a network or through a "file")
- The client can even run inside docker itself
- 
