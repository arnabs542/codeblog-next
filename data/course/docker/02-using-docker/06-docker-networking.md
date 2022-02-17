---
title: Docker Networking
type: topic
section: Using Docker
course: Docker
tags:
- docker
---
#### Container networking
###### Exposing Ports
- Programs in containers are isolated from the internet by default
- You can group your containers into "private" networks

`docker run --rm -ti -p <outside-port>:<inside-port> -p <outside-port>:<inside-port> --name echo-server ubuntu:14.04 bash`

`docker run --rm -ti -p 45678:45678 -p 45679:45679 --name echo-server ubuntu:14.04 bash`
- inside container => `nc -lp 45678 | nc -lp 45679`
- 2nd terminal => `nc localhost 45678`
- 3rd terminal => `nc localhost 45679`
- type text in 2nd terminal, it will print same text in 3rd terminal

`nc` = Netcat
`-lp` = listen to port
`|` = pipe to send data to other program
`host.docker.internal` = 

###### Exposing Ports dynamically
- The port inside the container is fixed. The port on the host is chosen from unused ports
- This allows many containers running programs with same ports.
- This often is used with a service discovery program
- If we don't specify outside port, it will be chosed automatically

`docker run --rm -ti -p 45678 -p 45679 --name echo-server ubuntu:14.04 bash`
- inside container => `nc -lp 45678 | nc -lp 45679`
- 2nd terminal => `docker port echo-server` => it will give assigned external ports
- 2nd terminal => `nc localhost 59146`
- 3rd terminal => `nc localhost 59147`
- type text in 2nd terminal, it will print same text in 3rd terminal

`docker port echo-server` = tells which ports it is connected to

###### Exposing UDP ports
`docker run -p outside-port:inside-port/protocol (tcp/udp)`

`docker run -p 1234:1234/udp`

Example, 
`docker run --rm -ti -p 45678/udp --name echo-server ubuntu:14.04 bash`
- inside container => `nc -ulp 45678`
- 2nd terminal => `docker port echo-server` => it will give assigned external ports
- 2nd terminal => `nc -u localhost 49626`
- type text in 2nd terminal, it will print same text in 1st terminal

---
#### Connecting between containers
###### Connecting directly between containers

###### List of networks
- `docker network ls`

**Default networks:**
```
NETWORK ID     NAME      DRIVER    SCOPE
d895de23eda8   bridge    bridge    local
47dfc25b4f10   host      host      local
647b66d4a10b   none      null      local
```

###### Create new network
- `docker network create <network-name>`

###### Create server using a network
- `docker run --rm -ti --net <network-name> --name <server-name> ubuntu:14.04 bash`

**Example:**
```
// Terminal 1 (CAT SERVER)
docker run --rm -ti --net learning --name catserver ubuntu:14.04 bash
ping catserver
ping dogserver

// Terminal 2 (DOG SERVER)
docker run --rm -ti --net learning --name dogserver ubuntu:14.04 bash
ping dogserver
ping catserver

// Now both servers are connected as they are using same network

// Terminal 2 (DOG SERVER)
nc -lp 1234

// Terminal 1 (CAT SERVER)
nc dogserver 1234

// Now we can do 2 way communication

// Terminal 3
docker network create catsonly
docker network connect catsonly catserver

// Terminal 4 (BOB CAT SERVER)
docker run --rm -ti --net catsonly --name bobcatserver ubuntu:14.04 bash
ping catserver      // allowed
ping dogserver      // not allowed

// Terminal 1 (CAT SERVER)
ping dogserver      // allowed
ping bobcatserver   // allowed

// Terminal 2 (DOG SERVER)
ping catserver      // allowed
ping bobcatserver   // not allowed

```

---
## Legacy Linking 
- Links app ports, though only one way
- Secret environment variables are shared only one way
- Depends on startup order (Orchestration becomes hard)
- Restarts only sometimes break the links

**Example:**
```
// TERMINAL 1 (CAT SERVER)
docker run --rm -ti -e SECRET=internetlovescats --name catserver ubuntu:14.04 bash

// TERMINAL 2 (DOG SERVER)
docker run --rm -ti --link catserver --name dogserver ubuntu:14.04 bash

// TERMINAL 1 (CAT SERVER)
nc -lp 1234

// TERMINAL 2 (DOG SERVER)
nc catserver 1234

// both servers are connected

// TERMINAL 2 (DOG SERVER)
nc -lp 1234

// TERMINAL 1 (CAT SERVER)
nc catserver 1234

// gets error, Name or service not known

// TERMINAL 1 (CAT SERVER)
env         //SECRET=internetlovescats

// TERMINAL 2 (DOG SERVER)
env         //CATSERVER_ENV_SECRET=internetlovescats

```

---