#!/usr/bin/env node

const Octokit = require('@octokit/rest')
const pkg = require(`../package.json`)
const pkg2 = require(`../lib/${process.argv.pop()}/package.json`)

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
    environment: `npm:${pkg2.name}`,
    description: `${pkg2.name}@${pkg.version}`
})
  .then(result => {
    octokit.repos
      .createDeploymentStatus({
        owner: process.env.GITHUB_REPOSITORY.split('/')[0],
        repo: process.env.GITHUB_REPOSITORY.split('/')[1],
        deployment_id: result.data.id,
        state: 'success',
        environment_url: `https://unpkg.com/${pkg2.name}@${pkg.version}/`,
        description: `${pkg2.name}@${pkg.version}`
      })
      .then(result => {
        console.log(result)
      })
  })
