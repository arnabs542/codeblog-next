---
title: Docker Volumes
type: topic
section: Using Docker
course: Docker
tags:
- docker
---
## Volumes
- Virtual "discs" to store and share data.
- 2 main varieties
    1. Persistent: Permanent, even though container is deleted
    2. Ephemeral: Temporary, exists as long as container is using it
- They are not part of images.

**Example**
```
$ ashish.ranjan$ mkdir example
$ ashish.ranjan$ pwd
/Users/ashish.ranjan
$ ashish.ranjan$ docker run -ti -v /Users/ashish.ranjan/example:/shared-folder ubuntu bash
root@299b7b6643ef:/# ls /shared-folder/
root@299b7b6643ef:/# touch /shared-folder/mydata
root@299b7b6643ef:/# ls /shared-folder/
mydata
root@299b7b6643ef:/# exit
$ ashish.ranjan$ ls example/
mydata
$ ashish.ranjan$ 
```

---
## Sharing data between containers
- `volumes-from`
- Shared "discs" that exists only as long as they are being used

**Example**
```
// Terminal 1
docker run -ti -v /shared-data ubuntu bash
echo hello > /shared-data/data-file

// Terminal 2
docker ps -l       // copy name of last container
docker run -ti --volumes-from funny_goldberg ubuntu bash
ls /shared-data/
echo more > /shared-data/more-data

// Terminal 1
ls /shared-data/

// Terminal 3
docker ps -l
docker run -ti --volumes-from nifty_hamilton ubuntu bash
ls /shared-data/

```

---