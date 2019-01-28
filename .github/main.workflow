workflow "New workflow" {
  on = "push"
  resolves = ["install", "Figma Export Assets", "test"]
}

action "install" {
  uses = "actions/npm@master"
  args = "ci"
}

action "test" {
  needs = ["install", "Figma Export Assets"]
  uses = "actions/npm@master"
  args = "ava tests/*.js"
}

action "Figma Export Assets" {
  needs = ["install"]
  uses = "./.github/actions/figma-asset-action"
  secrets = [
    "FIGMA_TOKEN"
  ]
  env = {
    "FIGMA_FILE_URL" = "https://www.figma.com/file/FP7lqd1V00LUaT5zvdklkkZr/Octicons"
    "BUILD_DIR" = "./build"
  }
  args = ""
}
