# Next.js Example with MongoDB

- [**How to Integrate Vercel & MongoDB Step-by-Step** :YouTube](https://www.youtube.com/watch?v=JIlYroSsInU)
- [**Getting Started with MongoDB Atlas - A Modern Database!** :YouTube](https://youtu.be/bBA9rUdqmgY)
- <https://www.mongodb.com/docs/atlas/api/data-api/#when-to-use-the-data-api>
- <https://www.mongodb.com/docs/atlas/reference/partner-integrations/vercel/#std-label-vercel-access-lists>

## Result

Start the development server, visit hte following URLs in the browser and watch the servers console output.

- <http://localhost:3000/api/wrong>
- <http://localhost:3000/api/right>
- <http://localhost:3000/api/right-with-module>

## Setup

### Deploy

```bash
mkdir exc-nextjs-2023-with-mongodb-example
cd exc-nextjs-2023-with-mongodb-example
npx create-next-app@latest --example with-mongodb .
```

### MongoDB Atlas connect to Vercel

Watch the video linked above for more details...

### Vercel CLI

```bash
npm -i vercel
```

Deploy to Vercel

```bash
npx vercel # --help
```

Pull the (already created) environment variables locally.

```bash
npx vercel env pull
```

This will generate [`.env.local`](./.env.local.example) file.

## Atlas CLI

- <https://www.mongodb.com/docs/atlas/atlas-cli/>
- <https://www.mongodb.com/docs/atlas/cli/stable/install-atlas-cli/>

### Setup **MongoDB Community Edition** `apt` repository on Ubuntu

```bash
wget -qO - https://pgp.mongodb.com/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
```

At this poin (20.06.2023) we need to convert the MongoDB's repository GPG key to to mitigate the `apt` warning message...

```bash
APP="MongoDB"
LIST="/etc/apt/sources.list.d/mongodb-org-6.0.list"
KEY=$(sudo apt-key list 2>/dev/null | grep -i "$APP" -B1 | head -n1 | awk '{print $(NF-1)$NF}')

sudo apt-key export "$KEY" | sudo gpg --dearmour -o "/usr/share/keyrings/${APP}.gpg"
sudo sed -i.bak "s#]# signed-by=/usr/share/keyrings/${APP}.gpg]#" "$LIST"
sudo apt update
sudo apt-key del "$KEY" 
sudo rm "${LIST}.bak"
```

```bash
sudo apt update
```

### Install the Atlas CLI and `mongosh` (optional)

Invoke the following apt command to install both the Atlas CLI and mongosh:

```bash
sudo apt install mongodb-atlas
```

If you don't want to install `mongosh`, invoke the following apt command instead to install the Atlas CLI only:

```bash
sudo apt install mongodb-atlas-cli
```

### Configure the Atlas CLI

```bash
atlas setup
```

Follow the steps in the setup wizard to configure the Atlas CLI and the Browser. And finally connect to your Atlas project.

Alternatively you can use the `atlas auth login` as it is described in the [video tutorial [at 8:02]](https://youtu.be/JIlYroSsInU?t=482):

```bash
atlas auth login
atlas clusters loadSampleData Cluster0
```

- You can load sample data via the Web UI as well.

- Assuming `Cluster0` is the cluster you want to load sample data into.

- Note: Command `loadSampleData` is deprecated, use `atlas clusters sampleData load` instead.

### Test the connection locally by running the app

```bash
npm run dev
```

## Example app using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-mongodb with-mongodb-app
```

```bash
yarn create next-app --example with-mongodb with-mongodb-app
```

```bash
pnpm create next-app --example with-mongodb with-mongodb-app
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

### Deploy from Our Template

Alternatively, you can deploy using our template by clicking on the Deploy button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)
