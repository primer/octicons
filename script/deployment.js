#!/usr/bin/env node

const Octokit = require('@octokit/rest')
const pkg2 = require(`../lib/${process.argv0}/package.json`)

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
    description: `npm ${pkg2.name}@${pkg2.version}`
  })
  .then(result => {
    console.log(result.data)
  })
