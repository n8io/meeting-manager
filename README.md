# meeting-manager

Execute a series of tasks when a virtual meeting starts/ends

```shell
Usage: meeting-manager [options]

Options:
  -V, --version                      output the version number
  -apoi --audio-post-meeting-in      The input audio device to switch to after a meeting. Use "SwitchAudioSource -a" to list available audio devices
  -apoo --audio-post-meeting-out     The ouput audio device to switch to after a meeting. Use "SwitchAudioSource -a" to list available audio devices
  -apri --audio-pre-meeting-in       The input audio device to switch to during a meeting. Use "SwitchAudioSource -a" to list available audio devices
  -apro --audio-pre-meeting-out      The ouput audio device to switch to during a meeting. Use "SwitchAudioSource -a" to list available audio devices
  -g --google-calendar-id            Your Google Calendar id to log your meetings
  -i --ifttt-key                     Your IFTTT maker key to use
  -k --slack-key                     Your Slack api key
  -s --start                         Flag to start a meeting. Otherwise end a meeting
  -t --meeting-type <zoom or tuple>  The type of meeting. Either zoom or tuple values are accepted
  -v --verbose                       Flag for verbose logging
  -h, --help                         output usage information
```

## Prerequisites

All of these are opt in...
1. Audio
   1. `SwitchAudioSource` [installaion details](https://github.com/deweller/switchaudio-osx)
1. Slack
   1. Grab your [legacy API token](https://api.slack.com/custom-integrations/legacy-tokens)
   1. Put it in your `.env` file
1. IFTTT
   1. Maker key from [here](https://ifttt.com/maker_webhooks)
1. Google Calendar
   1. Enable your api token [here](https://developers.google.com/calendar/quickstart/nodejs)

## Getting started

1. Setup
   `yarn install && cat .env.example > .env`
1. Fill out `.env` accordingly
1. Development
   `yarn build && meeting-manager -h`
