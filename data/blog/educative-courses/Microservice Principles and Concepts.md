---
title: Microservice Principles and Concepts
date: 2020-05-21
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
## What is Microservice?
Microservices are independently deployable modules.

For example, an e-commerce system can be divided into modules for: ordering, registration, product search.

Normally, all of these modules would be implemented together in one application. In this case, a change in one of the modules can only be brought into production by bringing a new version of the entire application with all its modules into production. However, when the modules are implemented as microservices, the ordering process cannot only be changed independently of the other modules, but it can even be brought into production independently.

This speeds up deployment and reduces the number of necessary tests since only a single module needs to be deployed. Due to this greater level of decoupling, a large project can turn into a number of smaller projects. Each project is in charge of an individual microservice.

To achieve this at the technical level, every microservice has to be an independent process. A better solution for decoupling microservices is to provide an independent virtual machine or Docker container for each microservice.

In that case, a deployment will replace the **Docker container** of an individual microservice with a new Docker container, which starts the new version and its direct requests. The other microservices will not be affected if such an approach is used.

#### Deployment monolith
A system that is not made up of microservices can only be deployed in its entirety. Therefore, it is called a deployment monolith. Of course, a deployment monolith can be divided into modules. The term deployment monolith does not make a statement about the internal structure of the system.

#### Size of a microservice
Microservices can vary hugely in size. Some microservices keep an entire team busy, while others comprise only a few hundred lines of code. Thus, the size of microservices is ill-suited to be part of the definition.

---
## Advantages
#### 1. Microservices for scaling development
One reason for the use of microservices is the easy scalability of development. Large teams often have to work together on complex projects. With the help of microservices, the projects can be divided into smaller units that can work independently of each other.

#### 2. Replacing legacy systems
Microservices help when working with legacy systems since the existing code does not necessarily have to be changed. Instead, new microservices can replace parts of the old system. This requires integration between the old system and the new microservices, for example, via data replication, REST, messaging, or at the level of UI. Besides, problems such as a uniform single sign-on for the old system and the new microservices have to be solved.

But then the microservices are very much like a greenfield project. No pre-existing codebase has to be used. In addition, developers can employ a completely different technology stack. This immensely facilitates work compared to having to modify the legacy code itself.

#### 3. Sustainable development
- An important reason for this is the **replaceability of microservices**. When a microservice can no longer be maintained, it can be rewritten. Compared to changing a deployment monolith, this entails less effort because the microservices are much smaller. However, it is difficult to replace a microservice, on which numerous other microservices depend since changes might affect the other microservices. Thus, to achieve replaceability, the dependencies between microservices have to be managed appropriately.
- To achieve maintainability, the dependencies between the microservices have to be managed in the long term. The architecture at the level of dependencies between microservices also remains maintainable. Developers cannot unintentionally add dependencies between microservices. Therefore, microservices can ensure a high architecture quality in the long term both inside each microservice and between the microservices.

#### 4. Continuous Delivery
Continuous delivery is an approach where software is continuously brought into production with the help of a **continuous delivery pipeline**. The pipeline brings the software into production via different phases.

Microservices represent independently deployable modules. Therefore each microservice has its own continuous delivery pipeline.

**Phases**
- Typically, the software compilation, unit tests, and static code analysis are performed in the commit phase.
- In the acceptance test phase, automated tests assure the correctness of the software regarding domain logic.
- Capacity tests check the performance at the expected load.
- Explorative tests serve to perform not-yet-considered tests or to examine new functionalities. In this manner, explorative tests can analyze aspects that are not yet covered by automated tests.
- In the end, the software is brought into production.

**Deployment must be automated**
- Microservice architectures can only work when the deployment is automated! Microservices substantially increase the number of deployable units compared to a deployment monolith. This is only feasible when the deployment processes are automated.
- Independent deployment means that the continuous delivery pipelines have to be completely independent. Integration tests conflict with this independence. They introduce dependencies between the continuous delivery pipelines of the individual microservices. Therefore, integration tests must be reduced to the minimum. Depending on the type of communication, there are different approaches to achieve this for synchronous and asynchronous communication.

#### 5. Robustness
- Microservice systems are more robust.
- When a memory leak exists in a microservice, only this microservice is affected and crashes. The other microservices keep running. Of course, they have to compensate for the failure of the crashed microservice; this is called **resilience**.
- To achieve resilience, microservices can cache values and use them in case of a problem. Alternatively, there might be a fallback to a simplified algorithm.
- Without resilience, the availability of a microservice system might be a problem. It is likely that a microservice will fail for any reason.

#### 6. Independent scaling
- Each microservice can be independently scaled. It is possible to start additional instances of a microservice and distribute the load of the microservice into the instances.
- It can be difficult to start more instances of a deployment monolith due to the required hardware. Besides, building up an environment for a deployment monolith can be complex. This can require additional services or a complex infrastructure with databases and additional software components.

#### 7. Free technology choice
- Each microservice can be implemented with an individual technology. This facilitates the migration to a new technology since each microservice can be migrated individually.
- In addition, it is simpler and less risky to gain experience with new technologies since they can initially be used for only a single microservice before they are employed in several microservices.

#### 8. Security
Microservices can be isolated from each other.
- For example, it is possible to introduce firewalls into the communication between microservices.
- Besides, the communication between microservices can be encrypted to guarantee that the communication really originates from another microservice and is authentic. This prevents the corruption of additional microservices if a hacker takes over one microservice.

#### In general: isolation
- Microservices can be deployed in isolation, which **facilitates continuous delivery**.
- They are isolated in respect to failures, which **improves robustness**.
- The same is true for **scalability**. Each microservice can be scaled independently of the other microservices.
- The employed technologies can be chosen for each microservice in isolation, which allows for **free technology choice**.
- The microservices are isolated in such a way that they can only communicate via the network. Therefore, communication can be safeguarded by firewalls, which **increases security**.
- Due to this strong isolation, the boundaries between modules cannot be violated by mistake. The **architecture is rarely violated**; this safeguards the architecture.
- In isolation, a microservice can be **replaced with a new microservice**. This enables the low-risk replacement of microservices and allows one to keep the architecture of the individual microservices clean. Thus, isolation facilitates the long-term maintainability of the software.
- **Decoupling** is an important feature of modules. With their isolation, microservices push it to the extremes. Modules are normally only decoupled in regard to code changes and architecture. The decoupling between microservices goes far beyond that. Thanks to decoupling, microservices are smaller. This serves many purposes:
  - Makes it easier to reason about them
  - The security of a microservice is easier to verify
  - The performance is easier to measure
  - It is easier to figure out whether they work correctly
  - That makes the design and also the development easier

---
## Challenges
#### 1. Increased operations effort
The operation of a microservice system requires more effort than running a deployment monolith.
- This is due to the fact that in a microservice system, many more deployable units exist that all have to be deployed and monitored.
- This is feasible only when the operation is largely automated and the correct functioning of the microservices is guaranteed via appropriate monitoring.

#### 2. Must Be Independently Deployable
- Microservices have to be independently deployable. For example, dividing them, into Docker containers is a prerequisite for this, but it is not enough on its own.
- Changes to interfaces must be implemented in such a way that an independent deployment of individual microservices is still possible.

#### 3. Testing must be independent
- Also, testing must be independent. When all microservices have to be tested together, one microservice can block the test stage and prevent the deployment of the other microservices making testing much harder.
- Due to the split into microservices, there are more interfaces to test, and testing has to be independent for both sides of the interface.

#### 4. Difficult to change multiple microservices
Changes that affect multiple microservices are more difficult to implement than the changes that concern several modules of a deployment monolith.
- In a microservice system, such changes require several deployments. These deployments must be coordinated.
- In the case of a deployment monolith, only one deployment would be necessary.

#### 5. Lost overview
In a microservice system, the overview of the microservices can get lost. However, experience teaches that in practice, a sound domain-based division can restrict changes to one or a few microservices. Therefore, the overview of the system is less important because the interaction between the microservices hardly influences development due to the high degree of independence.

#### 6. Increased latency and failures
Microservices communicate through the network. Compared to local communication,
- The latency is much higher.
- It is also more likely that communication will fail.

A microservices system cannot rely on the availability of other microservices. This makes the systems more complex.

---
## Weighing benefits and disadvantages
- The most important rule is that microservices should only be used if they represent the simplest solution in a certain scenario.
- The previously mentioned benefits should outweigh disadvantages resulting from the higher level of complexity for deployment and operation. Choosing a more complex solution is rarely a good idea.

The following approach helps to find the right recipe to divide a system into microservices.
1. Identify the problems in your current system (for example, resilience, development agility, too slow deployment, and so on).
1. For the projects that you’ve worked on, prioritize the benefits of using microservices.
1. Weigh which of the challenges in this project could pose a risk.
1. Look at the possible technical and architectural solutions in the following chapters to determine the most sensible solutions for their requirements.

---
## Micro and Macro Architecture
- The **micro architecture** comprises all decisions that can be made individually for each microservice.
- The **macro architecture** consists of all decisions that can be made at a global level and apply to all microservices.










---