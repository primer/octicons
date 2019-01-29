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

action "lerna bootstrap" {
  uses = "docker://starefossen/ruby-node"
  needs = ["npm install"]
  runs = "npm"
  args = "run bootstrap"
}


action "npm test" {
  uses = "docker://starefossen/ruby-node"
  needs = ["lerna bootstrap"]
  runs = "npm"
  args = "test"
}
