# 📖 Storyloom

> In progress...

## ✨ What is Storyloom?

StoryLoom can generate bedtime stories using AI based on the child's age, likings, behaviors, and more. We use generative TTS to read the stories to the child.

## 🏗️ Project Structure

```zsh
storyloom/
├── apps/
│   ├── python/                   # Python backend application
│   └── web/                      # Next.js web application
├── package.json                  # Root package configuration
├── pnpm-workspace.yaml           # pnpm workspace configuration
└── turbo.json                    # Turbo monorepo configuration
```

## ⚙️ Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later)
- **pnpm** (v8 or later)
- **Python** (v3.8 or later)

### 1. Fork the repository

### 2. Clone your forked repository

```bash
git clone https://github.com/<your-username>/storyloom.git
cd storyloom
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Variables

Make a copy of the `.env.example` file and name it `.env` for each application under the `apps/` directory.

```bash
cp apps/web/.env.example apps/web/.env
cp apps/python/.env.example apps/python/.env
```

Make sure to fill in the values for the environment variables.

Make sure your AWS credentials has the following managed policies:

- AmazonDynamoDBFullAccess
- AmazonAPIGatewayAdministrator
- AmazonS3FullAccess
- AWSCloudFormationFullAccess
- AWSLambda_FullAccess

### 4. Database Setup

1. Create a two tables called `storyloom-users` and `storyloom-auth` in DynamoDB
2. Setup auth table to have partition key as `pk` and sort key as `sk`. You may also create a global secondary index on the `email` attribute.
3. Setup user table to have partition key as `email`.

### 5. Run the Development Server

```bash
turbo dev
```

### 6. Verify Setup

- Open [http://localhost:3000](http://localhost:3000) in your browser
- You should see the Storyloom homepage
- Try signing in to test authentication

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute

- Report bugs or request features by [creating an issue](https://github.com/tiluckdave/storyloom/issues)
- Submit code changes by making a pull request to solve existing issues

### Development Workflow

1. Fork this repository
2. Clone your fork
3. Add the upstream remote: `git remote add upstream https://github.com/tiluckdave/storyloom.git`
4. Create a feature branch: `git checkout -b feature/amazing-feature`
5. Make your changes and test them
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Style

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write meaningful commit messages

Make sure to run `turbo lint` and `turbo check-types` to check for any errors.
