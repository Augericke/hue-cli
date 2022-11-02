## Basic Hue CLI

<img src="https://i.imgur.com/wfREJvB.gif" width="700">

## About

I am a big fan of the [Hue Philips smart lights ecosystem](https://www.philips-hue.com/en-us/explore-hue/propositions/entertainment) and have consequently filled my apartment with their lightbulbs, lamps, light strips.... you get the picture. And while I really enjoy their app (both mobile and desktop), I also really enjoy never having to leave VS Code if it can be avoided. So instead I decided to make this bare bones CLI tool that can be used to control my lights via the command line.

## Basic Functionality

Currently, the CLI only has a couple basic commands (which functionality covers the majority of my day-to-day use). Those commands being:

<ul>
  <li>
    <b>connect</b> | initial setup to connect to your Hue Philips bridge
  </li>
  <br>
  <li>
    <b>light</b> | control an individual light
    <ul>
      <li>turn on / off</li>
      <li>adjust brightness</li>
    </ul>
  </li>
  <br>
  <li>
    <b>room</b> | control all lights in a specific room
    <ul>
      <li>turn on / off</li>
      <li>adjust brightness</li>
      <li>change scene</li>
    </ul>
  </li>
</ul>

## Running Locally

The CLI can be ran locally using the below command in the root directory:

```bash
npm run hue -- help  # will return a list of usable commands
```

or can be ran globally by first linking the CLI in the root directory:

```bash
npm link

# now the below command will be available globally to use
hue -- help
```

## Set up

In order to use the CLI you will have to first link it with your hue bridge by following the prompts via:

```bash
npm run hue -- connect  # will kick off the connection process with your hue bridge
```

## Feedback

Any and all feedback is welcome - you can either create a PR for this repo or connect with me over twitter [@augericke](https://twitter.com/augericke). I really appreciate those who stop by to take a look at the things I make and even more so those who try to help me improve - so truly thank you in advance!

For those looking for more information on Hue Philips' External API - you can find the documentation [here](https://developers.meethue.com/develop/hue-api/).
