---
title: Git Commands
type: topic
section: Basics
course: Git
tags:
- git
---
#### Commands:
- `git init`					: To initialize a Git repository. It converts local directory to a git repository and creates metadata files.
- `git branch` 					: list all branches
- `git branch --color`
- `git branch <branch-name>`	: create branch
- `git checkout <branch-name>`	: to switch to a branch
- `git checkout <file-name>`	: revert change which is not added in staging area.
- `git add <file-path>`			: to add a file in the staging area and start tracking changes made to octocat.txt
- `git add .`					: 
- `git add -A` 					: 
- `git rm --cached <file>`		: to unstage a file
- `git status`					: to see what the current state of our project is
- `git commit -m "<message>"`	: to commit (local commit)
- `git push`					: to synchronize back to origin server
- `git merge <branch-name>`		: to merge in master branch
- `git pull`					: gets latest code from master branch and does a merge locally.
- `git fetch`					: give me all objects from repository and store them in local database
- `git clean -n`				: 
- `git clean -f`				: 

---
#### GitHub
How to switch git user at terminal?
- USE KEYCHAIN ACCESS
- In addition to changing username and email from terminal using git config:
- $ git config --global user.name "Bob"
- $ git config --global user.email "bob@example.com"
- you'll need to remove authorization info from Keychain. This is something I've also struggled with until I found that I also had certificate in my Keychain.
- Delete them. Now try to push the repo and git will ask you to write password for the user and you will be good to go.

For Windows User:
- Control Panel >> User Account >> Credential Manager >> Windows Credential >> Generic Credential
- remove git credential.
- next time when you'll push repo it'll ask you for credential.
