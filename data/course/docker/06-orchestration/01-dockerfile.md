---
title: Dockerfile
type: topic
section: Orchestration
course: Docker
tags:
- docker
---
#### Dockerfile
- A small program to create an image
- You run this program with:
    - `docker build -t <name-of-result> .`
    - `-t` means tag, `.` means location of Dockerfile
- When it finished, the result will be in your local docker registry.
- Each line in Dockerfile creates a new image. 
- Each line takes the image from previous line and makes another image. The previous image is unchanged.
- Docker uses caching and skip lines that have not changed since last build.
- The parts that change the most belong at the end of the Dockerfile.
- Dockerfiles look like shell scripts, but they are not. Processed you start on one line will not be running on the next line.
- Environment variables you set will be set on the next line.

**Example:**
```
FROM busybox

RUN echo "building simple docker image"

CMD echo "Hello container"
```

`docker build -t hello .`

`docker run --rm hello`

###### Create a Dockerfile
1. **Create a file named "Dockerfile" without any extension**
2. **FROM statement:**
    - Specifies a base image to download and start from
    - Must be first command in Dockerfile
    - `FROM <image-name>:<version>`
3. **MAINTAINER statement:**
    - Defines the author of this Dockerfile
    - `MAINTAINER first_name last_name <email-id>`
4. **RUN statement:**
    - Runs the command line, waits for it to finish, and saves the result
    - `RUN unzip install.zip /opt/install/`
5. **ADD statement:**
    - Adds local files
    - `ADD run.sh /run.sh`
    - Adds the contents of tar archives
    - `ADD project.tar.gz /install/`
    - Works with URLs as well
    - `ADD https://project.example.com/download/1.0/project.rpm /project/`
6. **ENV statement:**
    - Sets environment variables both for the build and when running the result
    - `ENV DB_HOST=db.prod.example.com`
7. **ENTRYPOINT**
    -  Specifies the start of the command to run
8. **CMD statement:**
    - Specifies the whole command to run on container setup
9. **EXPOSE statement:**
    - Maps a port into the container
    - `EXPOSE 8080`
10. **VOLUME statement:**
    - Defines shared or ephemeral volumes
    - `VOLUME ["/host/path/" "/container/path/"]`
    - `VOLUME ["/shared-data"]`
    - Avoid defining shared folders in Dockerfiles
11. **WORKDIR statement:**
    - Sets the directory the container starts in
    - `WORKDIR /install/`
12. **USER statement:**
    - Sets which user the container will run as
    - `USER arthur`
    - `USER 1000`


**Note:**
- If you have both ENTRYPOINT and CMD, they are combined together
- If your container acts like a command-line program, you can use ENTRYPOINT
- If you are unsure, use CMD
- ENTRYPOINT and CMD can use either of 2 forms:
    1. Shell form: `nano notes.txt`
    2. Exec form: `["/bin/nano", "notes.txt"]`


```
# Use an existing docker image as base
FROM alpine

# Download and install dependencies
RUN apk add --update redis

# Tell the image what to do when it starts
CMD ["redis-server"]
```