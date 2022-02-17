---
title: Deployment Strategies
type: topic
section: Microservice Patterns
course: System Design
tags:
- System Design
---
#### Deployment Strategies

###### Goals
1. Scalability and throughput
2. Reliable and available
3. Isolation
4. Resource Limit
5. Monitor
6. Cost effective


#### Ways
###### 1. Multiple services per Host
- Effective resource utilization
- Fast deployment
- Poor isolation
- No resource limit
- Dependency conflict

###### 2. Single service per VM/container
- Isolation and secure
- Manageable
- Fast (Slow in case of VM)
- Autoscaling, Kubernetes/Docker
- Not secure in case of container

###### 3. Serverless
- Focus on code
- No worries about scaling
- Pay as you go
- Runtime support
- Expensive
- Vendor lock
- Debugging pain
- Stateless and short running process only

---