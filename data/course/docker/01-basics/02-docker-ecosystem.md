---
title: Docker Ecosystem
type: topic
section: Basics
course: Docker
tags:
- docker
---
### Docker Ecosystem has following components:
1. Docker client
2. Docker server
3. Docker machine
4. Docker hub
5. Docker compose

#### Docker Client (Docker CLI)
- Tool that we are going to issue commands to

#### Docker Server (Daemon Docker)
- Tool that is responsible for creating images, running containers, etc.

#### Docker Machine

#### Docker Hub

#### Docker Compose


---
## Docker Registeries
- Registeries manage and distribute images
- Docker (the company) offers these for free
- You can run your own, as well

#### Finding images
- `docker search <image-name>`

Login to docker account from terminal
- `docker login`

**Example**
```
docker pull debian:sid
docker tag debian:sid ashishnitw/test-image:v99.9
docker push ashishnitw/test-image:v99.9
```


---