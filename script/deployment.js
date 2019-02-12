#!/usr/bin/env node

const octokit = require('@octokit/rest')()

octokit.authenticate({
  type: 'integration',
  token: process.env.GITHUB_TOKEN
})

// create deployment
octokit.repos
  .createDeployment({
    process.env.GITHUB_REPOSITORY.split('/')[0],
    process.env.GITHUB_REPOSITORY.split('/')[1],
    process.env.GITHUB_SHA
  })
  .then(result => {
    console.log(result)
  })
