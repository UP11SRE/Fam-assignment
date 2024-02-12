# Fampay Assignment

This project, named `fampay-assignment`, is an Express application that utilizes Elasticsearch for full-text search capabilities. The main file, `app.js`, orchestrates the project, while `youtubescript.js` fetches and stores YouTube data into Elasticsearch. The project structure in the `src` directory includes components such as `client` for Elasticsearch connection, `routes`, `controller`, `services`, and `repository`.

## Getting Started

1. Navigate to the project directory:

   
    cd fampay-assignment or fampay_assignment 
   

2. Install dependencies:

  
    npm install
   

## Running the Project

To start the project, run:

npm start

## Docker
Alternatively, you can use Docker. The Docker image name is [raja110199/assignment4 ]. Run the following command to start the project through Docker:

docker pull raja110199/assignment4
docker run -p 3000:3000 -it --rm raja110199/assignment4



# Elasticsearch Configuration

This project utilizes Elasticsearch for full-text search. Make sure Elasticsearch is properly configured and running. The Elasticsearch connection details can be found in the client folder. we have used elastic cloud to host our elastic search for this project.

# Search API
The project exposes a search API at the following URL:

http://localhost:3000/search
Query Parameters
page: Page number for pagination.
pagesize: Number of results per page.
title: The title to be searched with fuzzy search capability.

Example:

http://localhost:3000/search?page=1&pagesize=10&title=example

# YouTube Script
The `youtubescript.js` fetches YouTube data and stores it in Elasticsearch. Five API keys are provided to ensure continuous data fetching. If one key fails, the script automatically switches to the next key. Data is retrieved in a paginated manner, and the script stores the last video time. This ensures that subsequent requests only fetch the latest videos.

# Notes
- Ensure that Elasticsearch is running and configured correctly before starting the application.
- Fuzzy search is implemented on the title using Elasticsearch's full-text search capabilities.

Feel free to explore the project, contribute, and provide feedback. If you encounter any issues or have questions, please open an issue in the repository.
