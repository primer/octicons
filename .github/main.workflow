workflow "New workflow" {
  on = "push"
  resolves = ["install", "Figma Export Assets"]
}

action "install" {
  uses = "actions/npm@94e6933"
  args = "ci"
}

action "Figma Export Assets" {
  uses = "./figma-asset-action"
  secrets = [
    "FIGMA_TOKEN"
  ]
  env = {
    "FIGMA_FILE_KEY": "FP7lqd1V00LUaT5zvdklkkZr",
    "BUILD_DIR": "./build"
  }
  args = ""
}
