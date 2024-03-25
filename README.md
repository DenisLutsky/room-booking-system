# Room Booking System

RBS is a venue and open space booking platform designed for event hosting. It offers administrators tools for creating and managing spaces, as well as setting up and controlling time slots and their pricing. Clients have access to a user-friendly API, which provides a catalog for browsing available venues, booking them for specific times, and managing bookings and payments.

## Core Features

- **Venues management:** Administrators can create and manage venues, including setting up time slots, pricing, and availability.
- **Booking management:** Clients can browse available venues, book them for specific times, and manage their bookings and payments.
- **User authentication:** Secure user authentication and authorization for both administrators and clients.

_RBS is continually evolving, enhancing its capabilities to meet the growing and changing needs of its users._

## Installation guide

### Requirements

Please pay attention to application requirements and all warnings during installation process.

- [Node.js][node] version 20.x
- [Postgres][postgres] 14.x
- [Redis Server][redis-stack] version 6.2
- Ubuntu 22.04 or another system listed in Redis installation guide (for RSALv2 license compatibility)

### Node installation

Make sure to have Node.js 20.x installed. If you have a different version, please change it to 20.x by reinstalling Node.js or using [nvm](https://github.com/nvm-sh/nvm) by running the following commands:

```sh
nvm install 20
nvm use 20
```

Also, ensure that you have latest npm version (releases history you can find [here](https://nodejs.org/en/download/releases)).

```sh
npm install -g npm@^10.2.4
```

In the `package.json` file, restrictions have been set for both Node.js and the package manager versions. The configuration in `.npmrc` amd `preinstall.js` ensures that the installation will fail if these versions don't match. Additionally, using the `--force` flag during installation is also restricted and will lead to a failed preinstall if attempted.

You can ensure that the correct versions are installed by running the following commands:

```sh
node -v
npm -v
```

### Install dependencies

While in the root directory, run the following command to install all dependencies:

```sh
npm install
```

### Database Setup and Migrations

To setup the database, you need to have PostgreSQL installed. You can find the installation instructions [here](https://www.postgresql.org/download/).

**Quick Installation (Ubuntu/Debian):**
If you're using Ubuntu or a Debian-based system and prefer a quick setup, follow these steps to install PostgreSQL directly from the package manager:

Update your package list:

```sh
sudo apt-get update
```

Install PostgreSQL:

```sh
 sudo apt-get install postgresql postgresql-contrib
```

Check the PostgreSQL version:

```sh
psql --version
```

Start the PostgreSQL service:

```sh
sudo service postgresql start
```

Application uses [MikroORM](https://mikro-orm.io/docs/installation) as ORM. You can find all configuration in `src/configs/mikro-orm.config.ts`.

To create a fresh database, you can use the following command:

```sh
npm run database:fresh
```

it will run all migrations and seeds.

If you need to create a new migration while developing, you can use the following command:

```sh
npm run migration:create
```

If you need to apply the migrations:

```sh
npm run migration:up
```

To rollback the last migration:

```sh
npm run migration:down
```

### Redis Setup

Install Redis Stack Server version 6.2 following the [guide](https://redis.io/docs/getting-started/install-stack/). For more information about RedisStack, licenses, and distributions, please visit [here][redis-stack].

To use RSALv2 license and a fresher code base, make sure to use the Ubuntu 22.04 distribution.

After the Redis server is installed make sure that the Redis settings set in `redis.conf` match with environment variables in `.env` file.

🚨 **Important Note for Production**: Ensure you've properly configured the `eviction policy` and `maxmemory` settings in `redis.conf`. Neglecting these configurations can lead to potential memory issues or data loss, impacting your application's performance and reliability.

## Development

Development is mainly carried out in the "develop" branch.

### Versioning and Continuous Integration

Before merging any changes to the `development` branch, ensure you increment the application version in the `package.json` file.

### Branching and Pull Requests

Always create a new branch for each feature you are working on and initiate a pull request once the feature is ready. Naming branches and pull requests should follow the git flow convention. Here are some examples:

Branch name:

> `feat/add_realtime_email_verifications`

Pull request name:

> `feat: add realtime email verifications`

**Pull Request Tags**
When creating a pull request, it's important to prefix your branch name and pull request title with one of the following tags to denote the type of change being made:

`feat`: Indicates a new feature or addition to the application.
`fix`: Used for bug fixes and corrections in the application.
`chore`: Refers to routine tasks or small changes that don't modify the application's functionality (e.g., updating dependencies).
`docs`: For changes and updates to documentation.
`refactor`: For code refactoring without adding features or fixing bugs.

More information on this convention can be found [here](https://www.conventionalcommits.org/en/v1.0.0/).

Adhering to this naming convention ensures a clean and readable git history. Pull requests should be reviewed by at least one other developer before merging. We use the 'Squash and merge' strategy when merging feature branches. This approach consolidates all branch commits into a single commit, ensuring a clean and descriptive commit history in the main branch. Crafting a comprehensive commit message during the squash is essential to maintaining context.

Remember to include meaningful descriptions in your commit messages. These help clarify the changes and additions made.

If the "development" branch receives new commits while you work on your feature, please rebase your branch on "development" before creating a pull request. Use the following commands for this:

```sh
git checkout development
git pull
git checkout {your-branch}
git rebase development
git push --force
```

You can find more information about rebasing [here](https://git-scm.com/docs/git-rebase).

🚨 **Important note on using** `git push --force`**:** Be cautious when using git push `--force`, especially after rebasing or amending commits. This command overwrites history on the remote repository, which can potentially lead to lost work for others if not coordinated properly. Always ensure that the branch is up to date with the base branch and communicate with team members before force-pushing to avoid conflicts or data loss.

Hotfixes can be committed directly to the master branch, but all other branches should then be updated with these changes.

**Applying Changes Across Branches with Git Cherry-Pick**
In cases where you need to transfer specific changes from one branch to another, for example, applying a _hotfix_ from the `master` branch to the `development` branch, it's recommended using the `git cherry-pick` command. This method allows you to select and apply individual commits from one branch to another without merging all the changes.

To apply a commit from one branch to another, use the following commands:

```sh
git checkout development
git cherry-pick [commit-hash]
git cherry-pick --continue
git push origin development
```

You can find more information about this command [here](https://git-scm.com/docs/git-cherry-pick).

⚠️ **Note:** Before pushing code to remote repository, double-check application version in `package.json` and run the linter to ensure that there are no errors or warnings in the code:

```sh
npm run lint
```

## Configurations and environment variables

All environment variables you need to provide (e.g. `ADMIN_EMAIL` and `ADMIN_PASSWORD` must be set before running migrations in order to seed default admin user) you have set to the `.env` file.
All variables used in application are provided in `.env.example` file with examples and additional information.

## Building for source

For production release:

```sh
npm run build
```

## License

No license. All rights reserved.
_Copyright © 2024 Denis Lutsky <denis.lutsky@outlook.com>._

This product and all associated materials are the property of Denis Lutsky. All rights reserved. Any use, copying, modification, distribution, public performance, or broadcasting without the prior written permission of Denis Lutsky is strictly prohibited. 🥴

**Third-Party Libraries Usage:**

This product includes and utilizes several open-source and proprietary third-party libraries. The use of each of these libraries is governed by their respective licenses. Users of this product must adhere to the terms of these licenses with regard to the respective libraries. A complete list of the used libraries and their licenses can be found in the accompanying documentation / `package.json` dependencies.

[node]: https://nodejs.org/en/
[postgres]: https://www.postgresql.org/
[redis-stack]: https://redis.io/docs/about/about-stack/
