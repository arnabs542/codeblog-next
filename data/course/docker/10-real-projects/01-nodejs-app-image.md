---
title: NodeJS App Image
type: 'topic'
section: Real Projects
course: 'Docker'
tags:
- docker
---
#### NodeJS App
###### Install dependencies before running app
- `npm install` (Assumes npm is installed)

###### Run a command to startup server
- `npm start` (Assumes npm is installed)

> `alpine` version of any image is its stipped down version.

###### Copy Build Files
`COPY <from-local-path> <to-container-path>`

Eg, `COPY ./ ./`

###### Port Mapping
`docker run -p <localhost-port>:<container-port> <image-name>`

###### Specify Working Directory
`WORKDIR /usr/app`

###### Unnecessary Rebuilds
