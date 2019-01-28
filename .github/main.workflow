workflow "New workflow" {
  on = "push"
  resolves = ["Figma Export Assets"]
}

action "install" {
  uses = "actions/npm@94e6933"
  args = "ci"
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
