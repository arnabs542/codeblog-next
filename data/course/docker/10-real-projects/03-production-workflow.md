---
title: Production Workflow
type: 'topic'
section: Real Projects
course: 'Docker'
tags:
- docker
---
###### Flow
- Development
- Testing
- Deployment

#### WorkFlow Steps
- Create Github repository with 2 branches: master and feature
- The feature branch is a development branch where we will do code changes or whatever it is needed to update our application.
- The master branch represents clean working copy of our codebase. Any changes we make to this master branch are going to be eventually automatically deployed out to our hosting provider.
- Pull latest code from feature branch.
- Make code changes and push to feature branch.
- Create pull request from feature to master branch.
- After merging to master:
    1. CI: Travis CI will pull latest code and run tests
    2. CD: AWS Hosting will deploy code (eg, AWS Elastic Beanstalk)

###### React App
- **npm run start**: Starts up a development server. For development use only.
- **npm run test**: Runs tests associated with the project.
- **npm run build**: Builds a production version of the application.

###### Use custom Docker file
- `docker build -f Dockerfile.dev .`

###### Duplicate Dependencies
- Delete `node_modules` folder inside project before running docker build.

#### Docker Volumes
- With Docker Volume we essentially set up a placeholder inside our docker container. So no need to copy over the entire `src` folder or entire `public` directory. Instead we can put a **reference** in docker container instead.
- The volume will set up a reference that will point to our local machine and gives access to the files and folders on the local machine.
- It is similar to the port mapping.

###### Mapping Volumes
`docker run -p 3000:3000 -v $(pwd):/app <image_id>`

###### Bookmarking Volumes
`docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app <image_id>`

###### Volums with Docker Compose
user `volumes` field in docekr-compose.yml

---
#### Executing Tests
To hook up STDIN, use `-it` flag
- `docker build -f Dockerfile.dev .`
- `docker run -it <container-id> npm run test`

###### Live updating tests
Method 1:
- get id of running container using `docker ps`
- execute `docker exec -it <container-id> npm run test`

Method 2:
- `docker-compose up --build`

#### Ngnix

#### Multi-step Builds
- 

---