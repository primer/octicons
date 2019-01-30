workflow "Build Octicons" {
  on = "push"
  resolves = [
    "test",
    "Build octicons_node",
    "Build octicons_gem",
    "Build octicons_helper",
    "Build octicons_jekyll"
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
  uses = "actions/npm@master"
  args = "install"
}

action "test" {
  needs = ["Figma Action"]
  uses = "actions/npm@master"
  args = "test"
}

action "Build octicons_node" {
  needs = ["Figma Action"]
  uses = "./.github/actions/build_node"
  args = "octicons_node"
}

action "Build octicons_gem" {
  needs = ["Figma Action"]
  uses = "./.github/actions/build_gem"
  args = "octicons_gem"
}

action "Build octicons_helper" {
  needs = ["Build octicons_gem"]
  uses = "./.github/actions/build_gem"
  args = "octicons_helper"
}

action "Build octicons_jekyll" {
  needs = ["Build octicons_gem"]
  uses = "./.github/actions/build_gem"
  args = "octicons_helper"
}
