workflow "Lint and test" {
  on = "push"
  resolves = [
    "npm test",
  ]
}

action "npm install" {
  uses = "actions/npm@94e6933"
  args = "ci"
}

action "npm test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["npm install"]
  args = "test"
}
