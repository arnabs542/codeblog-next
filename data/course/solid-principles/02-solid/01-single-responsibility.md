---
title: 'Single Responsibility Principle'
type: 'topic'
section: '02 SOLID'
course: 'SOLID Principles'
tags:
- design
- system design
- solid principles
---
#####SRP: Single responsibility principle
- Every function, class or module should have one and only one reason to change.
- Reason to change here means responsibility.
- Always identify the reasons to change that your components have and reduce them to a single one.
- This principle is often termed as subjective

#####Examples of Responsibility
- Business logic
- User interface
- Persistence
- Logging
- Orchestration
- Users

#####Identify multiple reasons to change
- `if` **statements:** If `if` and `else` blocks have different reaosns to change (different logic), this violates SRP. We should move logic of these blocks to different methods.
- `switch` **statements:** Same goes for `switch` statements.
- **Monster Methods:** `Monster methods` contain too many lines of code and do a lot of things. We need to identify responsibilities and split it into multiple methods or even classes that are more manageable and do just one thing.
- **God Class:** A `God Class` is an object that controls way too many other objects in the system and has grown beyond all logic to become The Class That Does Everything. We should have a class that just handles 1 thing and give it a meaningful name. 

#####Symptoms of not using SRP
- Code is more difficult to read and reason about
- Decreased quality due to testing difficulty
- Side effects
- High Coupling

> Note: Coupling is inter-dependency between various software components.

#####Conclusion
- If Module A knows too much about Module B, changes to Module B may break functionality in Module A. This would introduce technical debt.
- We should always pay attention to the dependencies of a particular component and try to extract them and abstract them as much as possible.
