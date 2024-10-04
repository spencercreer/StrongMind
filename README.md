# TopThat Pizzeria

## Overview

**TopThat Pizzeria** is a full-stack application that allows users to explore and manage pizza offerings. This repository contains both the server-side API and the client-side frontend.

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

You can run tests for both the server and client with the following commands:

- **To test the server**:

```bash
  npm run test:server
```

- **To test the client**:

```bash
  npm run test:client
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
  The project relies on Node.js for both the server and client. Install Node.js [here](https://nodejs.org/en/download/). This application was developed using Node v20.10.0.

- **MongoDB**:  
  MongoDB is used as the database for this project. You need to install MongoDB Community Edition and have MongoShell running. Follow the official guides for installation:
  - [MacOS Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
  - [Windows Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

## Overview and Thought Process

### Test-Driven Development (TDD)

In this project, I adopted a **Test-Driven Development (TDD) Red-Green-Refactor** approach to ensure that every piece of functionality is thoroughly tested before implementation. This ensures that code fulfills the specific requirements and that each feature behaves as expected.

To maintain code quality, both server and client tests are executed when a pull request is made to the main branch. This setup helps to catch any breaking changes early, ensuring that the main branch remains stable.

### Database

For this project, I chose **MongoDB**, a NoSQL database, due to its flexibility in handling non-relational data. Since the data for this application has minimal relationships and does not require the strong ACID transactions provided by SQL databases, MongoDB is a suitable choice. However, if the data model evolves to include more complex relationships, then transitioning to an SQL database should be considered.

#### Data Deletion Strategy

The deletion strategy focuses on maintaining the integrity between pizzas and their toppings.

- **Deleting a Topping**: If a topping is deleted, all pizzas using that topping are also deleted. This ensures that pizzas with unavailable toppings cannot be ordered.
- **Deleting a Pizza**: Deleting a pizza does not affect its associated toppings, which remain available for other pizzas.

This approach ensures that the pizza-topping relationship is always valid based on the available toppings.

### Server

The server is built using Node.js and Express, allowing for both the server and client to be written in TypeScript.

### Client

The client is built using React with a mobile-first responsive layout utilizing Tailwind CSS's grid system. It incorporates form validations written using TDD and leverages Headless UI for a component library, ensuring a consistent user interface.

### Infrastructure

The application leverages the following AWS components:

**Amazon S3**: Hosts the static React client. It serves static assets and is backed by **CloudFront**, a CDN that provides fast global delivery and SSL/TLS encryption.

**EC2 with Elastic IP**: The Node.js server runs on an EC2 instance, offering full control over the environment. An **Application Load Balancer (ALB)** Distributes incoming traffic to a target group.

I chose AWS for its scalability, efficiency, and complete control over cloud infrastructure.

Future improvements could include using **Terraform** for Infrastructure as Code to enhance deployment automation and switching to a **serverless architecture** with Lambda and API Gateway to reduce costs and improve scalability.
