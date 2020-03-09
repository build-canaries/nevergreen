workflow "Test and eventually deploy" {
  on = "push"
  resolves = [
    "Lint Json"    
  ]
}

action "Install dependencies" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "install"
}

action "Lint Json" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Install dependencies"]
  args = "run lint"
}

action "Build app" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Lint Json"]
  args = "run build:prod"
}

