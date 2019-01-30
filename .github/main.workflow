workflow "Octicons" {
  on = "push"
  resolves = [
    "lint",
    "version"
  ]
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "lint" {
  needs = ["install"]
  uses = "actions/npm@master"
  args = "run lint"
}

action "version" {
  needs = ["install"]
  uses = "./.github/actions/version"
}
