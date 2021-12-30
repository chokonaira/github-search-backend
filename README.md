## Github Search
A backend server with Node and Express with endpoints to search for repositories and fetch a single user repository leveraging on Gihub API

### Run App locally
- git clone https://github.com/chokonaira/github-search-backend.git
- Create a `.env` file in the root directory
- Copy the variables in `.env.example` file. 
- Provide an `personal access token` from [Github](https://github.com/settings/tokens/new), as the value. 
- Run `npm install`
- Run `npm start` 

#### Server Routes
- Search all repositories - `/repositories/:searchTerm/:page/:perPage`
- Fetch a specific repositories - `/repositories/:owner/:repo`

#### Github URL Base
- Search all repositories - `https://api.github.com/search/repositories`
- Fetch a specific repository details - `https://api.github.com/repos/`
