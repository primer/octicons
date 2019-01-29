workflow "Build Octicons" {
  on = "push"
  resolves = [
    "test",
    "Build octicons_node"
  ]
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

action "install" {
  uses = "./.github/actions/npm"
  args = ["./", "ci"]
}

action "test" {
  needs = ["Figma Action"]
  uses = "./.github/actions/npm"
  args = ["./", "test"]
}

action "Build octicons_node" {
  needs = ["Figma Action"]
  uses = "./.github/actions/octicons_node"
}

action "Build octicons_gem" {
  needs = ["Figma Action"]
  uses = "./.github/actions/octicons_gem"
}
