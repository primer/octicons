#!/usr/bin/env node

const Octokit = require('@octokit/rest')
const pkg = require('../package.json')

const octokit = new Octokit({
  auth: `token ${process.env.GITHUB_TOKEN}`
})

// create deployment
octokit.repos
  .createDeployment({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    ref: process.env.GITHUB_REF,
    required_contexts: [],
    environment: `npm`,
    description: `@${pkg.version}`
  })
  .then(result => {
    console.log(result.data)
  })
