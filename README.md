# StrongMind Pizzeria

## Overview

**StrongMind Pizzeria** is a full-stack application that allows users to explore and manage pizza offerings. This repository contains both the server-side API and the client-side frontend.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Running Unit Tests](#running-unit-tests)
- [Building the Application](#building-the-application)
- [Prerequisite Technologies](#prerequisite-technologies)
- [Overview and Thought Process](#overview-and-thought-process)

## Installation

Before installing the project, ensure you have the necessary [prerequisite technologies](#prerequisite-technologies) installed on your machine.

### Steps to Install

1. Clone the repository using HTTPS or SSH:

```bash
   git clone <repository-url>
```

2. Navigate to the root directory and install both server and client dependencies:

```bash
   npm install
```

## Development

To start the local development environment:

1. After installation, run the following command:

```bash
    npm run dev
```

2. Access the client at [http://localhost:5173](http://localhost:5173).

3. Ensure the server is running by sending a GET request to the following endpoint:  
   [http://localhost:3000/health](http://localhost:3000/health)

## Running Unit Tests

To run the unit tests, ensure you have MongoDB running locally.

Navigate to the root directory of the project and run the following command to execute the unit tests:

```bash
    npm run test
```

## Building the Application

To build the application for production, run:

```bash
    npm run build
```

This will generate the production-ready files for both the client and server.

## Prerequisite Technologies

Ensure the following technologies are installed before running the application:

- **Node.js**:  
  The project relies on Node.js for both the server and client. Install Node.js [here](https://nodejs.org/en/download/).

- **MongoDB**:  
  MongoDB is used as the database for this project. You need to install MongoDB Community Edition and have MongoShell running. Follow the official guides for installation:
  - [MacOS Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
  - [Windows Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

## Overview and Thought Process

TDD red, green approach

### Server

Deleting Pizzas should not delete associated toppings.
Deleting a topping should delete any pizza that utilizes it.

### Client

Responsive layout using TailwindCSS's grid system

Validations

component library

### Infrastructure
