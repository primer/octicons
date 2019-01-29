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

action "npm test" {
  uses = "docker://starefossen/ruby-node"
  needs = ["npm install"]
  runs = "npm"
  args = "test"
}
