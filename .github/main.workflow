workflow "New workflow" {
  on = "push"
  resolves = ["Hello World"]
}

action "Hello World" {
  uses = "./figma-asset-action"
  secrets = [
    "MY_NAME"
  ]

  args = "\"Hello world, I'm $MY_NAME!\""
}
