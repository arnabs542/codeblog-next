---
title: Service Discovery and Service Registry
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
How does the client of an RPI-based service discover the network location of a service instance?
- **Client-side discovery** - client queries a service registry to discover the locations of service instances
- **Server-side discovery** - router queries a service registry to discover the locations of service instances
- **Service registry** - a database of service instance locations
- **Self registration** - service instance registers itself with the service registry
- **3rd party registration** - a 3rd party registers a service instance with the service registry

---
## Client-side and Server-side service discovery
Services typically need to call one another.
 - In a monolithic application, services invoke one another through language-level method or procedure calls.
 - In a traditional distributed system deployment, services run at fixed, well known locations (hosts and ports) and so can easily call one another using HTTP/REST or some RPC mechanism.
 - However, a modern microservice-based application typically runs in a virtualized or containerized environments where the number of instances of a service and their locations changes dynamically.

#### Problem
How does the client of a service - the API gateway or another service - discover the location of a dynamically changing set of ephemeral service instances?
- Each instance of a service exposes a remote API such as HTTP/REST, or Thrift etc. at a particular location (host and port)
- The number of services instances and their locations changes dynamically.
- Virtual machines and containers are usually assigned dynamic IP addresses.
- The number of services instances might vary dynamically. For example, an EC2 Autoscaling Group adjusts the number of instances based on load.

#### Implementation
When making a request to a service, the client obtains the location of a service instance by querying a **Service Registry**, which knows the locations of all service instances.


---
## Service registry
Clients of a service use either Client-side discovery or Server-side discovery to determine the location of a service instance to which to send requests.

#### Problem
How do clients of a service (in the case of Client-side discovery) and/or routers (in the case of Server-side discovery) know about the available instances of a service?

#### Implementation
Implement a service registry, which is a database of services, their instances and their locations. Service instances are registered with the service registry on startup and deregistered on shutdown. Client of the service and/or routers query the service registry to find the available instances of a service. A service registry might invoke a service instance’s health check API to verify that it is able to handle requests

---
## Self Registration and 3rd Party Registration
You have applied either the Client-side Service Discovery pattern or the Server-side Service Discovery pattern. Service instances must be registered with the service registry on startup so that they can be discovered and unregistered on shutdown.

#### Problem
How are service instances registered with and unregistered from the service registry?
- Service instances must be registered with the service registry on startup and unregistered on shutdown
- Service instances that crash must be unregistered from the service registry
- Service instances that are running but incapable of handling requests must be unregistered from the service registry

#### Implementation
A service instance is responsible for registering itself with the service registry. On startup the service instance registers itself (host and IP address) with the service registry and makes itself available for discovery. The client must typically periodically renew its registration so that the registry knows it is still alive. On shutdown, the service instance unregisters itself from the service registry.

This is typically handled by a **Microservice chassis framework**

A 3rd party registrar is responsible for registering and unregistering a service instance with the service registry. When the service instance starts up, the registrar registers the service instance with the service registry. When the service instance shuts downs, the registrar unregisters the service instance from the service registry.

Examples of the 3rd Party Registration pattern include:
- Netflix Prana - a “side car” application that runs along side a non-JVM application and registers the application with Eureka.
- AWS Autoscaling Groups automatically (un)registers EC2 instances with Elastic Load Balancer
- Joyent’s Container buddy runs in a Docker container as the parent process for the service and registers it with the registry
- Registrator - registers and unregisters Docker containers with various service registries
- Clustering frameworks such as Kubernetes and Marathon (un)register service instances with the built-in/implicit registry

---