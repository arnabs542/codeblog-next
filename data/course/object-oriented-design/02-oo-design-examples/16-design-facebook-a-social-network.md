---
title: 'Design Facebook - a social network'
type: 'topic'
section: 'OO Design Examples'
course: 'Object Oriented Design'
tags:
- Object Oriented Design
---
## Facebook - a social network
- Facebook is an online social networking service where users can connect with other users to post and read messages. Users access Facebook through their website interface or mobile apps.

## System Requirements
1. Each member should be able to add information about their basic profile, work experience, education, etc.
1. Any user of our system should be able to search other members, groups or pages by their name.
1. Members should be able to send and accept/reject friend requests from other members.
1. Members should be able to follow other members without becoming their friend.
1. Members should be able to create groups and pages, as well as join already created groups, and follow pages.
1. Members should be able to create new posts to share with their friends.
1. Members should be able to add comments to posts, as well as like or share a post or comment.
1. Members should be able to create privacy lists containing their friends. Members can link any post with a privacy list to make the post visible only to the members of that list.
1. Any member should be able to send messages to other members.
1. Any member should be able to add a recommendation for any page.
1. The system should send a notification to a member whenever there is a new message or friend request or comment on their post.
1. Members should be able to search through posts for a word.
1. Extended Requirement: Write a function to find a connection suggestion for a member.

## Use case diagram
We have three main Actors in our system:
- **Member:** All members can search for other members, groups, pages, or posts, as well as send friend requests, create posts, etc.
- **Admin:** Mainly responsible for admin functions like blocking and unblocking a member, etc.
- **System:** Mainly responsible for sending notifications for new messages, friend requests, etc.

Here are the top use cases of our system:
- **Add/update profile:** Any member should be able to create their profile to reflect their work experiences, education, etc.
- **Search:** Members can search for other members, groups or pages. Members can send a friend request to other members.
- **Follow or Unfollow a member or a page:** Any member can follow or unfollow any other member or page.
- **Send message:** Any member can send a message to any of their friends.
- **Create post:** Any member can create a post to share with their friends, as well as like or add comments to any post visible to them.
- **Send notification:** The system will be able to send notifications for new messages, friend requests, etc.

## Class diagram
Here are the main classes of the Facebook system:
- **Member:** This will be the main component of our system. Each member will have a profile which includes their Work Experiences, Education, etc. Members will be connected to other members and they can follow other members and pages. Members will also have suggestions to send friend requests to other members.
- **Search:** Our system will support searching for other members, groups and pages by their names, and through posts for any word.
- **Message:** Members can send messages to other members with text, photos, and videos.
- **Post:** Members can create posts containing text and media, as well as like and share a post.
- **Comment:** Members can add comments to posts as well as like any comment.
- **Group:** Members can create and join groups.
- **PrivacyList:** Members can create privacy lists containing their friends. Members can link any post with a privacy list, to make the post visible only to the members of that list.
- **Page:** Members can create pages that other members can follow, and share messages there.
- **Notification:** This class will take care of sending notifications to members. The system will be able to send a push notification or an email.


## Activity diagrams
- **Add work experience to profile:** Any Facebook member can perform this activity.
- **Create a new post:** Any Member can perform this activity.

## Code

## Extended requirement
Here is the code for finding connection suggestions for a member.

There can be many strategies to search for connection suggestions; we will do a two-level deep breadth-first search to find people who have the most connections with each other. These people could be good candidates for a connection suggestion, here is the sample Java code:
```java
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;
import static java.util.Collections.reverseOrder;

public class Member extends Person {
  private Integer memberId;
  private Date dateOfMembership;
  private String name;

  private Profile profile;
  private HashSet<Integer> memberFollows;
  private HashSet<Integer> memberConnections;
  private HashSet<Integer> pageFollows;
  private HashSet<Integer> memberSuggestions;
  private HashSet<ConnectionInvitation> connectionInvitations;
  private HashSet<Integer> groupFollows;

  public boolean sendMessage(Message message);
  public boolean createPost(Post post);
  public boolean sendConnectionInvitation(ConnectionInvitation invitation);

  private Map<Integer, Integer> searchMemberSuggestions() {
    Map<Integer, Integer> suggestions = new HashMap<>();
    for(Integer memberId : this.memberConnections) {
      HashSet<Integer> firstLevelConnections = new Member(memberId).getMemberConnections());
      for(Integer firstLevelConnectionId : firstLevelConnections) {
        this.findMemberSuggestion(suggestions, firstLevelConnectionId);
        HashSet<Integer> secondLevelConnections = new Member(firstLevelConnectionId).getMemberConnections());
        for(Integer secondLevelConnectionId : secondLevelConnections) {
          this.findMemberSuggestion(suggestions, secondLevelConnectionId);
        }
      }
	  }

    // sort by value (increasing count), i.e., by highest number of mutual connection count
    Map<Integer, Integer> result = new LinkedHashMap<>();
    suggestions.entrySet().stream()
        .sorted(reverseOrder(Map.Entry.comparingByValue()))
        .forEachOrdered(x -> result.put(x.getKey(), x.getValue()));

    return result;
  }

  private void findMemberSuggestion(Map<Integer, Integer> suggestions, Integer connectionId) {
    // return if the proposed suggestion is already a connection or if there is a
    // pending connection invitation
    if(this.memberConnections.contains(connectionId) ||
        this.connectionInvitations.contains(connectionId)) {
      return;
    }

    int count = suggestions.containsKey(connectionId) ? suggestions.get(connectionId) : 0;
    suggestions.put(connectionId, count + 1);
  }
}
```

---

