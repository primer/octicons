workflow "Octicons" {
  on = "push"
  resolves = [
    "test"
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
