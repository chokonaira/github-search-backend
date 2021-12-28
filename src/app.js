const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

dotenv.config();

const config = {
  headers: {'Authorization': `token ${process.env.GITHUB_ACCESS_TOKEN}`}
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint to search for all repositories that rythms with the search term, and passing pagination attributes
app.get("/repositories/:searchTerm/:page/:perPage", (req, res) => {
  const { searchTerm, page, perPage } = req.params;

  return axios.get(`https://api.github.com/search/repositories?q=${searchTerm}&page=${page}&per_page=${perPage}`, config)
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((err) => {
      return res.status(500).send(err.response.data);
    });
});

// Endpoint to fetch a specific repository by ownwer's username and repository name
app.get("/repositories/:owner/:repo", (req, res) => {
  const { owner, repo } = req.params;

  return axios.get(`https://api.github.com/repos/${owner}/${repo}`, config)
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((err) => {
      return res.status(500).send(err.response.data);
    });
});

// Root path
app.use("/", function (req, res) {
  const successRes = { status: 'success' };
  successRes.message = "Welcome to Henry Git Search API";
  res.status(200).send(successRes);
});
// Wild card
app.use("*", function (req, res) {
  const errorRes = { status: "error" };
  errorRes.message = "Page not found";
  res.status(404).send(errorRes);
});


app.listen(process.env.PORT, () => {
  console.log(`Application running on port ${process.env.PORT}`);
});
