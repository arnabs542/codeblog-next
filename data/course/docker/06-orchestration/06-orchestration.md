---
title: Orchestration
type: topic
section: Orchestration
course: Docker
tags:
- docker
---
## Orchestration


---
## Docker compose
- Single machine coordination
- Designed for testing and development
- Brings up all your containers, volumes, networks, etc. with one command. `docker-compose up`



---
## Kubernetes
- Containers run programs
- Pods group containers together
- Services make pods available to others
- Labels are used for very advanced service discovery
- Makes scripting large operations possible with the `kubectl` command
- very flexible overlay networking
- Runs equally well on your hardware or a cloud provider
- Built-in service discovery


---
## EC2 Container service (ECS)
- **Task definitions:**
- **Tasks:**
- **Services and exposes it to the Net:**
- Connects load balancers (ELBs) to services
- Can create your own host instances in AWS
- Make your instances start the agent and join the cluster
- Pass the docker control socket into the agent
- Provices docker repos - and its easy to run your own repo
- Note that containers (tasks) can be part of CloudFormation stacks



