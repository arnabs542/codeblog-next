---
title: Docker Images
type: topic
section: Using Docker
course: Docker
tags:
- docker
---
## Docker Images
###### Lists downloaded images
- `docker images`

###### Tagging images
- `docker commit <container-id> <tag-name>`
- `docker commit <container-id> <tag-name>:<version>`

###### Getting images
- `docker pull`
- Automatically run by `docker run`
- Useful for offline work

###### Cleaning up
- `docker rmi <image-name>:<tag>`
- `docker rmi <image-id>`




---