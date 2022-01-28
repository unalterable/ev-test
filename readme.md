# EValue Full-stack Technical Test

To run the project simply run: `DOCKER_USER=$(id -u):$(id -g) docker-compose up`.
No need to install deps or run development servers, or databases on your local machine. Docker will handle all that for you.

* Unfortunately `vite` (the frontend dev server) has issues with permissions because it edits `node_modules` on start - so `DOCKER_USER=$(id -u):$(id -g)` is needed

- Once running visit: `http://localhost:3000/`.
- The backend can be reached on: `http://localhost:3001/` - however `vite` will proxy requests to `http://localhost:3000/` to the backend, via the internal docker network. (just like `webpack-dev-server` or `create-react-app`)

# Test:

This test is designed to help us understand how you would tackle common front-end and back-end problem. **Fork this mono-repo** and use the scaffold to build a mini full-stack application with the following requirements:

## Back-end Requirements

Develop a simple rest or graphql api using NodeJS to fetch and create clients. The client model should simply store the name, email, createdDate & company fields. It's up to you how you decide to store the data on the back-end. The data storage should be persitent and scaleable.

## Front-end Requirements

Use the react scaffolded app to:

- Create relevant components to fetch and display a list of clients using your endpoints. Any dates should be displayed in a human readable format.
- Create relevant components to create a new client using your endpoints.
- Create a simple search functionality to search for clients by their name.

It's up to you to decide how you store state on the front-end. Design isn't important but it would be good to see some effort around it. Feel free to use any third-party packages or libraries to help you build the application.

We suggest you time box this test to 3 hours. We don't expect you to finish all of the test. We're interested in seeing how you architect both front-end and back-end applications. The focus will be on your approach to the problem, quality of code, as well as the use DRY and SOLID design principles where necessary.

## Prerequisites

- Node 12+
- Code editor of your choice

## Sending us the project

Once you've completed the test. Send us the link to your forked
