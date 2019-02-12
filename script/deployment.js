#!/usr/bin/env node

const octokit = require('@octokit/rest')()

octokit.authenticate({
  type: 'integration',
  token: process.env.GITHUB_TOKEN
})

// create deployment
octokit.repos
  .createDeployment({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    sha: process.env.GITHUB_SHA
  })
  .then(result => {
    console.log(result)
  })
