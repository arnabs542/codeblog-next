---
title: Kafka Security
type: topic
section: Kafka in Enterprise
course: Kafka
tags:
- kafka
---
#### Kafka Security
- Currently, any client can access your Kafka cluster (authentication)
- The clients can publish / consume any topic data (authorisation)
- All the data being sent is fully visible on the network (encryption)

###### Encryption in Kafka
- Encryption in Kafka ensures that the data exchanged between clients and brokers is secret to routers on the way.
- This is similar concept to an HTTPS website.

###### Authentication in Kafka
- Authentication in Kafka ensures that only clients that can prove their identity can connect to our Kafka Cluster.
- This is similar concept to a login (username/password)
- Types:
    - SSL Authentication: Clients authenticate to Kafka using SSL certificates
    - SASL Authentication: 
        - PLAIN: clients authenticate using username / password (weak - easy to setup)
        - Kerberos: such as Microsoft Active Directory (strong - hard to setup)
        - SCRAM: username / password (strong - medium to setup)

###### Authorisation in Kafka
- Once a client is authenticated, Kafka can verify its identity.
- It still needs to be combined with authorisation, so that Kafka knows that
- ACL (Access Control Lists) have to be maintained by administration and onboard new users

---