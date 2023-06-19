
# Lani Blog Platform

A Blog Platform build on Elixir Phoenix and Nextjs.

## Features
Provide the list of basic features for a blog platform
-  **Authentication:**
  - Sign in
	- Sign up
-  **Anonymous users:**
	- View list of latest posts
	- View post detail
	
- **Membership users:**
  - Create a new post
  - Update their posts
  - Delete their posts
  - View their created posts
 
 ## Technologies
 - Phoenix framework
 - Pow-Auth
 - Ecto
 - Next.js
 - NextAuth.js
 - Tailwind Css
 - MySQL
 - Docker

## Up & Running

### Docker

#### Prerequisite: 
- Install Docker Engine (https://docs.docker.com/engine/install/)
- Make sure the Docker Compose plugin is installed (https://docs.docker.com/compose/install/)

#### Steps:
1. Up Database first:  `docker-compose -f docker-compose.yml up db`
2. Run `seed.sql` script from `/lani_blog/priv/repo/seed.sql` into your database
3. Up api and web service: `docker-compose -f docker-compose.yml up`

Now you can visit [`localhost:4000`](http://localhost:3000) from your browser.

### Set up local environment

#### Prerequisite: 
- Phoenix Framework Installation (https://hexdocs.pm/phoenix/installation.html)
- MySQL installation (https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/installing.html)
-  [Node.js 16.8](https://nodejs.org/)  or later.

 
#### Backend Steps:

1. `cd lani_blog`
2. `mix deps.get`
3. From the file `/config/dev.exs` update the DB information from line 5 to line 8:
	```
	config :lani_blog, LaniBlog.Repo,
	username: "db_user_name",
	password: "db_user_name",
	hostname: "db_user_hostname",
	database: "lani_blog_dev",stacktrace: true,
	show_sensitive_data_on_connection_error: true,
	pool_size: 10
	```
4. `mix ecto.create`
5. `mix ecto.migrate`
6. `mix run priv/repo/seeds.exs`
7. `mix phx.server`

#### Frontend Steps:
1. cd `lani_blog_web`
2. `cp .env.example .env.local`
3. `yarn install` or `npm install`
4. `yarn dev` or `npm run dev`

Now you can visit [`localhost:4000`](http://localhost:3000) from your browser.
