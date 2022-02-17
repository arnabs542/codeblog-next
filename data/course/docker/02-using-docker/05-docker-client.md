---
title: 'Docker Client'
type: 'topic'
section: 'Using Docker'
course: 'Docker'
tags:
- docker
---

|Docker Command|Description|
|-|-|
|`docker info`|Docker info|
|`docker ps`|List of running dockers|
|`docker ps -a`|List all containers ever created|
|`docker ps -l`|Recently stopped container|
|`docker build -t hello-world .`|Building an image|
|`docker run <image-name>`|Creating and Running a Container from an Image|
|`docker run <image-name> <command>`|Overriding Default Commands|
|`docker run -d hello-world`|Detach and run container (in Background)|
|`docker attach <container name>`|Attach to a running container|
|`docker run -it -p 9000:3000 hello-world`|Exposing port|
|`docker run -it -p 9000:3000 -v $(pwd):/app hello-world`|Exposing port|
|`docker stop <container-id>`|Stop runnnig container: does some cleanup before shutting down|
|`docker kill <container-id>`|Kill runnnig container: shutdowns right now|
|`docker rm <container id>`|Delete Docker container|
|`docker system prune`|Removing stopped containers|
|`docker volume prune`|Remove all unused containers|
|`docker logs <container-id>`|Retrieving log outputs from a container|
|`docker exec -it <container-id> <command>`|Executing additional command in running containers|
|||


##### `docker run <image-name>`
- It creates a contaiiner and starts it using the specified command.
- `docker run` = `docker create` + `docker start`

**Creating a container:**
- `docker create <image-name>`
- Copying File system snapshot

**Starting a container:**
- `docker start <container-id>` : It will not show output information in terminal
- `docker start -a <container-id>` : It will print output also
- Executing startup command

---
###### Example:
- To start redis server `docker run redis`
- To start redic-cli inside container `docker exec -it <container-id> redis-cli`

###### `-it` or `-ti` flag
- Every process we create in Linux environment has 3 communication channels attached to it.
- These channels are used to communicate information either into the process or out of the process.
    1. `STDIN`: used to communicate information into the process
    2. `STDOUT`: used to communicate information out of the process
    3. `STDERR`: used to communicate information about errors
- `-it` is 2 separate flags:
    1. `-i`: to attached `STDIN` to new process
    2. `-t`: to make output in formatted manner

##### Get Terminal access in a container
`docker exec -it <container-id> sh`
- `sh` is command processor or a shell.
- It allows us to type commands in and have them be executed inside that container.

**Command Processors** (Use the one that in present in the container)
- bash, powershell, zsh, sh

##### Starting container with a shell
`docker run -it <image-name> sh`

---
#### Container Isolation
If we run same image in 2 different terminals, 2 containers will be created which are completely isolated from each other.

---
#### Run processes in container
`docker run <image name> <process name>`
- Containers have one main process
- The container stops when that process stops

`docker run --rm -ti <image name> sleep 5`
- `--rm` deletes the container when it stops

`docker run --rm -ti <image name> bash -c "sleep 5; echo all done"`
- `-c` arguments passed separated by `;`

---
#### Detached containers

###### Run detached container
`docker run -d -ti <image name> <process name>`

`docker run -d -ti ubuntu bash`


###### Detach from a container and leave it running
`ctrl + p`, `ctrl + q`

---
#### Running more things in container
`docker exec`
- Starts another process in an existing container
- Great for debugging and DB administration
- Can't add ports, volumes, and so on

ex, `docker exec <container name> <process name>`

#### Container output
`docker logs <container name>`
- keeps the output of container

eg, `docker run --name example -d ubuntu bash -c "lose /etc/password"`
- `"lose /etc/password"` is a wrong command

`docker logs example`

> Don't let the output get too large

#### Resource constraints
###### Memory limits
`docker run --memory maximum-allowed-memory <image-name> <command>`

###### CPU limits
`docker run -cpu-shares`

`docker run -cpu-quota`

###### Orchestration
Generally requires resource limiting

#### Tips
- Don't let your container fetch dependencies when they start
- Don't let important things in unnamed stopped containers

