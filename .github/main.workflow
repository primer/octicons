workflow "Octicons" {
  on = "push"
  resolves = [
    "Build & Deploy octicons_gem"
  ]
}

action "install" {
  uses = "actions/npm@master"
  args = "install"
}

action "version" {
  needs = ["install"]
  uses = "./.github/actions/version"
}

action "lint" {
  needs = ["install"]
  uses = "actions/npm@master"
  args = "run lint"
}

action "test" {
  needs = ["lint", "Figma Action"]
  uses = "actions/npm@master"
  args = "test"
}

action "Figma Action" {
  needs = ["version"]
  uses = "primer/figma-action@master"
  secrets = [
    "FIGMA_TOKEN"
  ]
  env = {
    "FIGMA_FILE_URL" = "https://www.figma.com/file/FP7lqd1V00LUaT5zvdklkkZr/Octicons"
  }
  args = [
    "format=svg",
    "dir=./lib/build"
  ]
}

action "Build octicons_node" {
  needs = ["test"]
  uses = "./.github/actions/build_node"
  args = "octicons_node"
  secrets = [
    "NPM_AUTH_TOKEN"
  ]
}

action "Build octicons_react" {
  needs = ["test"]
  uses = "./.github/actions/build_node"
  args = "octicons_react"
  secrets = [
    "NPM_AUTH_TOKEN"
  ]
}

action "Build & Deploy octicons_gem" {
  needs = ["test"]
  uses = "./.github/actions/build_ruby"
  args = "octicons_gem"
  secrets = [
    "RUBYGEMS_TOKEN"
  ]
}
