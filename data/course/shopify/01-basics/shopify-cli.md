---
title: Shopify CLI
type: topic
section: Basics
course: Shopify
tags:
- shopify
---
## Shopify CLI

#### 1. Install Shopify CLI
###### Windows
- `gem install shopify-cli`

###### MacOS
RubyGems.org
- `gem install shopify-cli`

Homebrew
- `brew tap shopify/shopify`

###### Linux
RubyGems.org
- `gem install shopify-cli`

apt (Debian, Ubuntu)
- `sudo apt install /path/to/download/shopify-cli-x.y.z.deb`

yum (CentOS 8+, Fedora, Red Hat, SUSE Linux)
- `sudo yum install /path/to/download/shopify-cli-x.y.z.rpm`

###### Verify installation
- `shopify version`

---
#### 2. Create a new project
- Go to directory
- `shopify node create`

#### 3. Start a local development server
- `shopify node serve`

###### Connect
- The connect command re-creates the project's .env and .shopify-cli.yml files if they don't exist, or updates the files if they do exist.
- `shopify node connect`

###### Open
- Opens your local development app in your default browser.
- `shopify node open`

---
###### Populate products
- `shopify populate products --count=15`

###### Populate orders
- `shopify populate orders --count=15`

---