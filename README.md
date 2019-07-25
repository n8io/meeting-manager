# meeting-manager

Execute a series of tasks when a virtual meeting starts/ends

```shell
Usage: meeting-manager [options]

Options:
  -h, --help                         output usage information
  -i --ifttt-key                     Your IFTTT maker key to use
  -k --slack-key                     Your Slack api key
  -s --start                         Flag to start a meeting. Otherwise end a meeting
  -t --meeting-type <zoom or tuple>  The type of meeting. Either "zoom" or "tuple" values are accepted
  -v --verbose                       Flag for verbose logging
  -V, --version                      output the version number
```

## Getting started

1. Setup
   `yarn install && cat .env.example > .env`
2. Development
   `yarn build && meeting-manager -h`
