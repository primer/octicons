workflow "Lint and test" {
  on = "push"
  resolves = [
    "npm test",
  ]
}

action "npm install" {
  uses = "docker://starefossen/ruby-node"
  runs = "npm"
  args = "install"
}

action "lerna postinstall" {
  uses = "docker://starefossen/ruby-node"
  needs = ["npm install"]
  runs = "npx"
  args = "lerna run postinstall"
}


action "lerna bootstrap" {
  uses = "docker://starefossen/ruby-node"
  needs = ["lerna postinstall"]
  runs = "npm"
  args = "run bootstrap"
}


action "npm test" {
  uses = "docker://starefossen/ruby-node"
  needs = ["lerna bootstrap"]
  runs = "npm"
  args = "test"
}
