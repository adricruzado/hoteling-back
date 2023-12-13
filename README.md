# HOTELING

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=isdi-coders-2023_Adria-Cruzado-Final-Project-back-202309-bcn)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Adria-Cruzado-Final-Project-back-202309-bcn)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=isdi-coders-2023_Adria-Cruzado-Final-Project-back-202309-bcn&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=isdi-coders-2023_Adria-Cruzado-Final-Project-back-202309-bcn)

## Technologies Used

- **Git**: Version control system used to track changes in code and collaborate on software projects.

- **Node.js**: Server-side JavaScript runtime environment for scalable and high-performance applications.

- **Express.js**: Web framework for Node.js simplifying API and web application development.

- **TypeScript**: Language extending JavaScript with static types to prevent common errors during development.

- **MongoDB**: Highly flexible and scalable NoSQL database using document-based data storage.

- **Jest**: JavaScript testing framework useful for unit, integration, and end-to-end testing in Node.js and React applications.

<br/>

<div align="center">  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" /></a>  
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="50" /></a>  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" /></a>  
<a href="https://www.mongodb.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mongodb-original-wordmark.svg" alt="MongoDB" height="50" /></a>  
<a href="https://www.jestjs.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/jest.svg" alt="Jest" height="50" /></a>  
</div>

## Endpoints

### GET /

- Check the server response through the pingController.
- Sends the message "🏓" in the response body and status 200.

### GET / (wrong endpoint)

- Request to a wrong endpoint.
- Sends the message "Endopoint not found" in the response body and status 404.

### GET / hotels

- Request for a list of 10 hotels.
- Sends a collection of 10 hotels in the response body and status 200.

### GET / hotels / :id

- Request for a determinated hotel.
- Sends a the determinated hotel in the response body and status 200.

### DELETE / hotels / :id

- Request to delete a hotel by its id.
- Sends the message "The hotel has been deleted" in the response body and status 200.

### POST / hotels / create

- Request to create an hotel.
- Sends the message "The hotel has been created", the information of the hotel in the response body and status 201.

### PATCH / hotels / :id

- Request to modify a hotel.
- Sends the message "The hotel has been modified" in the response body and status 200.
