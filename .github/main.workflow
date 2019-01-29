workflow "Build Octicons" {
  on = "push"
  resolves = [
    "Main npm install",
    "Figma Action",
    "test",
    "octicons_node npm install"
  ]
}

action "Figma Action" {
  needs = ["Main npm install"]
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

action "Main npm install" {
  uses = "./.github/actions/npm"
  args = ["./", "ci"]
}

action "octicons_node npm install" {
  uses = "./.github/actions/npm"
  args = ["./lib/octicons_node", "ci"]
}

action "test" {
  needs = ["Figma Action"]
  uses = "actions/npm@master"
  args = "test"
}
