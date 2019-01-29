workflow "Build Octicons" {
  on = "push"
  resolves = [
    "Main npm install",
    "Figma Action",
    "Main npm test",

    # octicons_node
    "octicons_node copy",
    "octicons_node npm install",
    "octicons_node npm test",

    "octicons_gem copy",
    "octicons_gem bundle install"
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

action "Main npm test" {
  needs = ["Figma Action"]
  uses = "./.github/actions/npm"
  args = ["./", "test"]
}

# octicons_node

action "octicons_node copy" {
  needs = ["Figma Action"]
  uses = "./.github/actions/copy"
  args = [
    # from
    "./lib/build",
    # to
    "./lib/octicons_node"
  ]
}

action "octicons_node npm install" {
  uses = "./.github/actions/npm"
  args = ["./lib/octicons_node", "ci"]
}

action "octicons_node npm test" {
  needs = ["octicons_node copy", "octicons_node npm install"]
  uses = "./.github/actions/npm"
  args = ["./lib/octicons_node", "test"]
}

# octicons_gem

action "octicons_gem copy" {
  needs = ["Figma Action"]
  uses = "./.github/actions/copy"
  args = [
    # from
    "./lib/build",
    # to
    "./lib/octicons_gem"
  ]
}

action "octicons_gem bundle install" {
  uses = "./.github/actions/bundle"
  args = ["./lib/octicons_gem"]
}
