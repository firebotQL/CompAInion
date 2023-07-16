# CompAInion

CompAInion is an open-source project that comprises a ChatGPT Chrome Extension - Chat UI. The extension allows you to leverage the capabilities of the ChatGPT model on any website and use it in Chat/Messaging manner to prompt anything you see. This repository also includes a backend service built with Next.js Edge Functions that streamlines the ChatGPT response, deployed on Vercel.

## Contents

- [CompAInion](#compainion)
  - [Contents](#contents)
  - [Getting Started](#getting-started)
  - [Project Structure](#project-structure)
  - [Current Limitations](#current-limitations)
  - [Contributions](#contributions)
  - [Upcoming Tasks](#upcoming-tasks)

## Getting Started

To use this extension, you'll need a ChatGPT API Key. Follow the instructions provided [here](https://beta.openai.com/docs/developer-quickstart/) to get the key.

To deploy your own instance of the backend service, click on the "Deploy to Vercel" button. Set the following environment variables:

- `PASSWORD`: Protects the endpoint and will be sent as an Authorization Header from the Chrome extension.
- `OPENAI_API_KEY`: Your ChatGPT API Key.

> **Note**: Currently, we only support the ChatGPT 3.5 model. We will add support for other models in the future as they become available.

## Project Structure

- `backend`: The deployable Next.js service on Vercel, used for utilizing Edge Functions.
- `extension`: Contains the Chrome extension's core files, including the `manifest.json` configuration.
- `ui`: A React app using Tailwind and ShadeCN for the chat-based system and a context menu for text selection on the page where it's loaded.
- `ui-popup`: A popup for configuring your server URL and authorization password. These should come from the deployed 'backend' instance.

## Current Limitations

- Only supports ChatGPT 3.5 model.
- No option to persist/load chat history.
- No option to select predefined prompt templates.
- No dark mode available.

## Contributions

We welcome contributions to help improve CompAInion. Whether it's bug reports, feature requests, or pull requests - all are appreciated.

## Upcoming Tasks

Here are the tasks that we are currently working on:

1. Isolate CSS from extension and domain. (Working on a shadow-dom solution)
2. Add option to select different ChatGPT models (not just 3.5).
3. Add feature to persist/load chat history.
   - 3.a. Option to switch between global or tab/website-specific history.
4. Add features like summarizing, explain-like-I-am-5, and more.
5. Add option to select predefined prompt templates.
   - 5.a. Option to manually create or upload prompt templates.
6. Implement dark mode.
7. Add authentication to support task 3.

Feel free to pick any of these tasks and submit a pull request.
