---
title: Docker Compose
type: 'topic'
section: Real Projects
course: 'Docker'
tags:
- docker
---
#### Problem
###### NodeJS Redis App
- If NodeJS app is using redis server, then we need to start redis server also.
- If we start redis server in separate container, it won't be able to communicate with node container because both containers are completely **isolated**.

###### Ways to connect 2 containers
1. Use Docker CLI's Networking feature: We have to write few commands every time we start server.
2. Use Docker Compose

#### Docker Compose
- It is a separate CLI tool that gets installed along with Docker.
- It is used to start up **multiple Docker containers** at the same time.
- It **automates** some of the long-winded arguments we were passing to `docker run`.
- It uses a special file `docker-compose.yml` to encode multiple docker commands.
- We use this file in docker-compose CLI to parse it and create different containers with the correct configuration that we specified.

#### Docker Compose YAML fields
- `version`: 
- `services`: 
- `<service-name>`
- `image`
- `build`
- `ports`

#### Networking with Docker Compose
- By defining services inside docker-compose.yml, it is going to automatically create both these containers on essentially the same network and they are going to have free access to communicate to each other in any way that they please. We don't have to do any port declaration for this.
- We can connect to other container by referring to it by its name as mentioned in docker-compose.yml

###### Build Docker Compose Image
`docker-compose build`

###### Start Docker Compose
`docker-compose up`

###### Build and start Docker Compose
`docker-compose up --build`

###### Docker Compose Status
`docker-compose ps`
- Run this command in same directory where docker-compose.yml is present, otherwise it will show error.

###### Launch Docker Compose in background
`docker-compose up -d`

###### Stop Docker Compose - all containers
`docker-compose down`

#### Automatic Restart Container
###### Restart Policies
1. **"no"**: Never attempt to restart this container if it stops or crashes
2. **always**: If this container stops for any reason always attempt to restart it
3. **on-failure**: Only restart if the container stops with an error code
4. **unless-stopped**: Always restart unless we (developers) forcibly stop it

