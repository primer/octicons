#!/usr/bin/env node

const Octokit = require('@octokit/rest')

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`
})

// create deployment
octokit.repos
  .createDeployment({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    ref: process.env.GITHUB_REF
  })
  .then(result => {
    console.log(result)
  })
