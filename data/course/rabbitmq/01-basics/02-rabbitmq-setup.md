---
title: 'Rabbitmq Setup'
type: 'topic'
section: 'Basics'
course: 'Rabbitmq'
tags:
- python
---
#### Installation
##### 1. Mac
**Method 1: (Using Homebrew)**
  - brew install rabbitmq

##### 2. Windows
- Install Erlang
- Download and install (as Admin) from https://www.rabbitmq.com/install-windows.html
- Once both Erlang and RabbitMQ have been installed, a RabbitMQ node can be started as a Windows service. The RabbitMQ service starts automatically. RabbitMQ Windows service ca be managed from the Start menu.
- RabbitMQ nodes are often managed, inspected and operated using CLI Tools in PowerShell.
- Not able to open http://localhost:15672/ 
- start RabbitMQ server
- Open RabbitMQ command prompt and run `rabbitmq-plugins enable rabbitmq_management`
- Now, able to open http://localhost:15672/
- Login with credential guest/guest

---
#### Rabbitmq Management
- http://localhost:15672/

---