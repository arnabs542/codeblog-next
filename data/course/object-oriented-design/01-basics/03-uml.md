---
title: 'UML'
type: 'topic'
section: '01 Basics'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## UML
- UML stands for Unified Modeling Language and is used to model the Object-Oriented Analysis of a software system.
- UML is a way of visualizing and documenting a software system by using a collection of diagrams, which helps engineers, businesspeople, and system architects understand the behavior and structure of the system being designed.

#### Benefits of using UML:
1. Helps develop a quick understanding of a software system.
2. UML modeling helps in breaking a complex system into discrete pieces that can be easily understood.
3. UML’s graphical notations can be used to communicate design decisions.
4. Since UML is independent of any specific platform or language or technology, it is easier to abstract out concepts.
5. It becomes easier to hand the system over to a new team.

---
## Types of UML Diagrams
The current UML standards call for 14 different kinds of diagrams. These diagrams are organized into two distinct groups:
1. Structural diagrams
2. Behavioral or Interaction diagrams

As the names suggest, some UML diagrams analyze and depict the structure of a system or process, whereas others describe the behavior of the system, its actors, and its building components. The different types are broken down as follows:

#### Structural UML diagrams
- Class diagram
- Object diagram
- Package diagram
- Component diagram
- Composite structure diagram
- Deployment diagram
- Profile diagram

#### Behavioral UML diagrams
- Use case diagram
- Activity diagram
- Sequence diagram
- State diagram
- Communication diagram
- Interaction overview diagram
- Timing diagram

---
## Use Case Diagram
-  Used to describe a set of user scenarios, this diagram, illustrates the functionality provided by the system.
- The different components of the use case diagram are:
  1. **System boundary:** A system boundary defines the scope and limits of the system. It is shown as a rectangle that spans all use cases of the system.
  1. **Actors:** An actor is an entity who performs specific actions. These roles are the actual business roles of the users in a given system. An actor interacts with a use case of the system. For example, in a banking system, the customer is one of the actors.
  1. **Use Case:** Every business functionality is a potential use case. The use case should list the discrete business functionality specified in the problem statement.
  1. **Include:** Include relationship represents an invocation of one use case by another use case. From a coding perspective, it is like one function being called by another function.
  1. **Extend:** This relationship signifies that the extended use case will work exactly like the base use case, except that some new steps will be inserted in the extended use case.

---
## Class Diagram
- Class diagram is the backbone of object-oriented modeling - it shows how different entities (people, things, and data) relate to each other.
-  It is used to describe structure and behavior in the use cases, this diagram provides a conceptual model of the system in terms of entities and their relationships.
- A class diagram describes the attributes and operations of a class and also the constraints imposed on the system.

The purpose of the class diagram can be summarized as:

1. Analysis and design of the static view of an application;
1. To describe the responsibilities of a system;
1. To provide a base for component and deployment diagrams; and,
1. Forward and reverse engineering.

A class is depicted in the class diagram as a rectangle with three horizontal sections. The upper section shows the class’s name, the middle section contains the properties of the class, and the lower section contains the class’s operations (or “methods”).

These are the different types of relationships between classes:

#### Association
If two classes in a model need to communicate with each other, there must be a link between them. This link can be represented by an association. Associations can be represented in a class diagram by a line between these classes with an arrow indicating the navigation direction.
- By default, associations are always assumed to be bi-directional; this means that both classes are aware of each other and their relationship.
- By contrast, in a uni-directional association, two classes are related - but only one class knows that the relationship exists.

#### Multiplicity
Multiplicity indicates how many instances of a class participate in the relationship. It is a constraint that specifies the range of permitted cardinalities between two classes. A ranged multiplicity can be expressed as “0…*” which means “zero to many" or as “2…4” which means “two to four”.

#### Aggregation
Aggregation is a special type of association used to model a “whole to its parts” relationship. In a basic aggregation relationship, the lifecycle of a PART class is independent of the WHOLE class’s lifecycle. In other words, aggregation implies a relationship where the child can exist independently of the parent.

#### Composition
The composition aggregation relationship is just another form of the aggregation relationship, but the child class’s instance lifecycle is dependent on the parent class’s instance lifecycle. In other words, Composition implies a relationship where the child cannot exist independent of the parent.

#### Generalization
Generalization is the mechanism for combining similar classes of objects into a single, more general class. Generalization identifies commonalities among a set of entities.

#### Dependency
A dependency relationship is a relationship in which one class, the client, uses or depends on another class, the supplier. 

#### Abstract class
An abstract class is identified by specifying its name in italics.

---
## Activity Diagram
- It is used to model the functional flow-of-control between two or more class objects. it emphasizes the condition of flow and the sequence in which it happens.
- We can also use an activity diagram to refer to the steps involved in the execution of a use case.
- Activity diagrams illustrate the dynamic nature of a system by modeling the flow of control from activity to activity.
- An activity represents an operation on some class in the system that results in a change in the state of the system.
- Typically, activity diagrams are used to model workflow or business processes and internal operations.

---
## Sequence Diagram
- It is used to describe interactions among classes in terms of an exchange of messages over time.
- It is used to explore the logic of complex operations, functions or procedures.
- they show the calls between the different objects in their sequence and can explain, at a detailed level, different calls to various objects.
- A sequence diagram has two dimensions:
  1. The vertical dimension shows the sequence of messages in the chronological order that they occur;
  2. the horizontal dimension shows the object instances to which the messages are sent.

---
#### What is the difference between Activity diagram and Sequence diagram?
**Activity diagram** captures the process flow. It is used for **functional modeling**. A functional model represents the flow of values from external inputs, through operations and internal data stores, to external outputs.

**Sequence diagram** tracks the interaction between the objects. It is used for **dynamic modeling**, which is represented by tracking states, transitions between states, and the events that trigger these transitions.

---