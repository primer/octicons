workflow "Octicons" {
  on = "push"
  resolves = [
    "install"
  ]
}


action "install" {
  uses = "actions/npm@master"
  args = "install"
}
