workflow "Octicons" {
  on = "push"
  resolves = [
    "Build octicons_node",
    "Build octicons_react"
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

action "test" {
  needs = ["lint", "Figma Action"]
  uses = "actions/npm@master"
  args = "test"
}

action "Figma Action" {
  needs = ["install"]
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
}

action "Build octicons_react" {
  needs = ["test"]
  uses = "./.github/actions/build_node"
  args = "octicons_react"
}
