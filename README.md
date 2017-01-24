# Wool js

A wrapper for AWS Lambda functions adding an async handler for better function structure, 
a customizable logger, and better exception handling. More to come soon!

Works great with [shep!](https://github.com/bustlelabs/shep)

## Why do you need this?

[AWS Lambda](https://aws.amazon.com/lambda/) is growing in popularity as a way to build
functions for anything from serving web applications to moving massive amounts of logs
between amazon services. Wool lets you build those functions without having to
add logic for the features Wool covers every time you build an API or a custom
lambda function.

Note: Wool does not run or build your functions or enable local testing. See [shep](https://github.com/bustlelabs/shep) for details on building and running functions!

## Getting Started

### Prerequisites

It will be helpful to have some existing experience with API gateway and Lambda. If you have never used either of these tools before, it is recommended to setup a function manually to see how things are done. Please refer to Amazon's own [getting started guide](http://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html)

### Installation

```bash
npm install wooljs
```

Wooljs uses async/await functions. You will need to install a babel-preset that enables these functions, like `babel-preset-stage-3` or a plugin for async/await

## Features

### Logger

your-lambda-function.js
```
import { log } from 'wooljs'

log.info('wool is cool!')
```

will log:

```
{"time":"2014-05-18T23:47:06.545Z","functionName":"your-lambda-function","functionVersion":27374,"level":"info","name":"mymodule","message":"Starting mymodule#handler()"}
```

Wool's logger uses the log level declared in `process.env.LOG_LEVEL` (defaults to `info`), one of 4 levels with corresponding methods: `log.debug(), log.info(), log.warn(), log.error()`

For more details see the [shep-logger repo](https://github.com/bustlelabs/shep-logger)

### Async handler

your-lambda-function.js
```
import { asyncHandler } from 'wooljs'

export const handler = asyncHandler(

  // context and callback optional, asyncHandler takes care of the callback
  async (event, /* context, callback */) => {

    const foo = 'bar'

    return foo
  }
)
```

The benefit of the `asyncHandler` is to remove the overhead of managing callbacks, promise chains, and the context object in a typical AWS Lambda handler function. Simply write the code you need the function to execute, declare its return value and move on with your life.

The `asyncHandler` function wrapper will also log every event sent through your handler.

### Exception handling and notifications

Currently, Wool will throw an error and write the error message to `stdout` with `log.error()`, and return `callback(error)` from the `asyncHandler`. 

#### Airbrake

To add error notifications via airbrake, simply add `AIRBRAKE_PROJECT_KEY` and `AIRBRAKE_PROJECT_ID` to `process.env` and configure your Airbrake settings for that project. Wool will take care of the rest.

#### Sentry

To add error notifications with Sentry, simply add the DSN found at `https://sentry.io/<organization>/<project>/settings/keys/` to process.env as `SENTRY_DSN` and configure your settings for that project in the Sentry web UI.

### Timeouts

AWS Lambda does not have the best logging when it comes to timeouts. Your functions will fail after your configured timeout setting, but lambda does not log any recent stack trace or helpful error.

*Coming soon!* Wool wraps Lambda's default timeout handling and throws an exception with a helpful stack trace and Wool's normal exception logging/notification.

## Why the name 'wool'?

Wool is named as a wrapper for *lamb*da functions, keeping with the theme established by [shep](https://github.com/bustlelabs/shep)

## Development

Pull requests welcome!

Compile: `npm run compile`

Publish: `npm run pub` "publish" is reserved by npm

Linter: We use `standard` to lint our projects. Travis will run `npm run lint` for PRs and pushes in lieu of tests for now
