# node-js-take-home-traxion

This is a Node.js project for Traxion. It is a [Node.js](https://nodejs.org/) application built with [Express](https://expressjs.com/) and [TypeScript](https://www.typescriptlang.org/).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Linting](#linting)
- [Contributing](#contributing)

## Installation

To install the project dependencies, run:

```bash
npm install
```

## Setup

1. Make a copy of the `.env.example` file and rename it to `.env`.

2. Open the `.env` file and add the following values:

   - `OPEN_WEATHER_BASE_URL`: The base URL for the OpenWeather API.

   - `OPEN_WEATHER_API_KEY`: The API key for the OpenWeather API.

   For example:
   OPEN_WEATHER_BASE_URL=https://api.openweathermap.org OPEN_WEATHER_API_KEY=your-api-key-here

3. Save the `.env` file.

4. Run the following command to start the application:

```bash
npm start
```

This will start the application on port 3000.

## Test

To run the tests, run:

```bash
npm test
```

This will run all the tests in the project.

## Linting

To lint the code, run:

```bash
npm run lint
```

This will run the linter on all the TypeScript files in the project.
