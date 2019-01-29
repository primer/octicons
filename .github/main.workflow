workflow "New workflow" {
  on = "push"
  resolves = ["install", "Figma Action", "test"]
}

action "install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "test" {
  needs = ["install", "Figma Action"]
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
    "BUILD_DIR" = "./lib/build"
  }
  args = "format=svg"
}
