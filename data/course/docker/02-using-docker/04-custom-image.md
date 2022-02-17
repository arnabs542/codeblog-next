---
title: Custom images
type: 'topic'
section: 'Using Docker'
course: 'Docker'
tags:
- docker
---
##### Steps:
1. **Clone:** Clone a repository by running Git in a container.
2. **Build:** Build docker image.
3. **Run:** Start a container based on the image you built in the previous step. Running a container launches your application with **private resources**, **securely isolated** from the rest of your machine.

##### Quick start example

```
docker run --name repo alpine/git clone https://github.com/docker/getting-started.git
docker cp repo:/git/getting-started/ .
cd getting-started
docker build -t docker101tutorial .
docker run -d -p 80:80 --name docker-tutorial docker101tutorial
docker tag docker101tutorial ashishnitw/docker101tutorial
docker push ashishnitw/docker101tutorial
```

#### Docker Flow

###### IMAGE -> docker run -> RUNNING CONTAINER -> exit-> STOPPED CONTAINER -> docker commit -> NEW IMAGE

```
docker images
docker run -ti ubuntu:latest bash
docker ps -a
docker commit <container-id>
docker tag <image-id> <new-image-name>
docker images
docker run -ti <new-image-name>

```

- `ubuntu:latest` or `ubuntu` = image name
- `bash` = program to run
- `-ti` = terminal interactive
- `exit` or `ctrl+d` = exit terminal

> Images don't change if we make some changes in container

---
#### Creating Docker Image

###### Build Image
`docker build .`
- It takes a Dockerfile and generates an image out of it.
- An intermediate image is created and removed in each step of Dockerfile.

###### Run Container
`docker run <container-id>`

##### Tagging an image
`docker build -t <username>/<image-name>:<tag> <path>`

Eg, `docker build -t asxplicit/redis-image:latest .`

##### Run tagged image
`docker run asxplicit/redis-image`

##### Manual image generation with Docker Commit
- `docker run -it alpine sh`: Run alpine image and open shell command
- `apk add --update redis`: Install redis manually
- `docker commit -c 'CMD ["redis-server"]' <container-id>`: Run default commands manually

---