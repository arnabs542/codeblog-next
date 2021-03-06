---
title: 'Design LinkedIn'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## LinkedIn
- LinkedIn is a social network for professionals. The main goal of the site is to enable its members to connect with people they know and trust professionally, as well as to find new opportunities to grow their careers.
- A LinkedIn member’s profile page, which emphasizes their skills, employment history, and education, has professional network news feeds with customizable modules.
- LinkedIn is very similar to Facebook in terms of its layout and design. These features are more specialized because they cater to professionals, but in general, if you know how to use Facebook or any other similar social network, LinkedIn is somewhat comparable.

## System Requirements
1. Each member should be able to add information about their basic profile, experiences, education, skills, and accomplishments.
1. Any user of our system should be able to search for other members or companies by their name.
1. Members should be able to send or accept connection requests from other members.
1. Any member will be able to request a recommendation from other members.
1. The system should be able to show basic stats about a profile, like the number of profile views, the total number of connections, and the total number of search appearances of the profile.
1. Members should be able to create new posts to share with their connections.
1. Members should be able to add comments to posts, as well as like or share a post or comment.
1. Any member should be able to send messages to other members.
1. The system should send a notification to a member whenever there is a new message, connection invitation or a comment on their post.
1. Members will be able to create a page for a Company and add job postings.
1. Members should be able to create groups and join any group they like.
1. Members should be able to follow other members or companies.

## Use case diagram
We have three main Actors in our system:
- **Member:** All members can search for other members, companies or jobs, as well as send requests for connection, create posts, etc.
- **Admin:** Mainly responsible for admin functions such as blocking and unblocking a member, etc.
- **System:** Mainly responsible for sending notifications for new messages, connections invites, etc.

Here are the top use cases of our system:
- **Add/update profile:** Any member should be able to create their profile to reflect their experiences, education, skills, and accomplishments.
- **Search:** Members can search other members, companies or jobs. Members can send a connection request to other members.
- **Follow or Unfollow member or company:** Any member can follow or unfollow any other member or a company.
- **Send message:** Any member can send a message to any of their connections.
- **Create post:** Any member can create a post to share with their connections, as well as like other posts or add comments to any post.
- **Send notifications:** The system will be able to send notifications for new messages, connection invites, etc.

## Class diagram
- **Member:** This will be the main component of our system. Each member will have a profile which includes their Experiences, Education, Skills, Accomplishments, and Recommendations. Members will be connected to other members and they can follow companies and members. Members will also have suggestions to make connections with other members.
- **Search:** Our system will support searching for other members and companies by their names, and jobs by their titles.
- **Message:** Members can send messages to other members with text and media.
- **Post:** Members can create posts containing text and media.
- **Comment:** Members can add comments to posts as well as like them.
- **Group:** Members can create and join groups.
- **Company:** Company will store all the information about a company’s page.
- **JobPosting:** Companies can create a job posting. This class will handle all information about a job.
- **Notification:** Will take care of sending notifications to members.

## Activity diagrams
- Add experience to profile: Any LinkedIn member can perform this activity. 
- Send message: Any Member can perform this activity. After sending a message, the system needs to send a notification to all the requested members.

## Code

---

