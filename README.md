<div align="center">
  <img src="./chrome-extension/core/images/icon48.png" alt="Icon Image">
  <h1>CompAInion: Your ChatGPT Assistant</h1>
</div>

Welcome to CompAInion, my contribution to the open-source community. This project is a practical implementation of a Chrome Extension, designed to seamlessly integrate ChatGPT into your day-to-day browsing experience.

The main feature of CompAInion is its intuitive chat interface that allows you to converse with ChatGPT in a manner as natural as chatting with a friend. The experience is further enriched with an additional feature that enables you to select any text on a webpage, which can then be directly included in your chat discussion via a context menu. This feature alleviates the need for manual copy-pasting and provides a seamless flow to your interactions.

On the front end I used React + TailwindCSS + ShadeCN + Twind + Shadow Dom to build the UI with some chrome extension specific code.

On the backend, I decided to use Next.js + Edge Functions + Vercel AI SDK to build API which can be deployed to Vercel. This was the only solution with which I could overcome 10s timeout on Vercel as it's uses streaming and longer responses could be streamed back for longer than that.

I hope CompAInion proves to be a useful tool in your browsing toolkit, enhancing your interactions and experiences online.

**NOTE: Project is still in early stages, and many bugs needs weeding out, feel free to see some of them on the very bottom of this readme**

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Deploying the Backend Service](#deploying-the-backend-service)
- [Understanding the Project Structure](#understanding-the-project-structure)
- [Installing and Using the Chrome Extension](#installing-and-using-the-chrome-extension)
  - [Preparing Your Project](#preparing-your-project)
  - [Installing the Extension in Chrome](#installing-the-extension-in-chrome)
- [Known Limitations](#known-limitations)
- [Contributing to CompAInion](#contributing-to-compainion)
- [Upcoming Tasks/Todos](#upcoming-taskstodos)

## Getting Started

To make use of this extension, first ensure you have a ChatGPT API Key. If you don't have one, follow the instructions provided [here](https://beta.openai.com/docs/developer-quickstart/) to acquire it.

## Deploying the Backend Service

You can deploy your own instance of the backend service by clicking on the "Deploy to Vercel" button. Make sure to set the following environment variables:

- `PASSWORD`: Protects the endpoint, and is sent as an Authorization Header from the Chrome extension.
- `OPENAI_API_KEY`: Your unique ChatGPT API Key.

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FfirebotQL%2FCompAInion&env=PASSWORD,OPENAI_API_KEY&envDescription=Refer%20to%20them%20what%20they%20are%20from%20the%20README.md">
    <img src="https://vercel.com/button" alt="Deploy with Vercel">
  </a>
</p>

## Understanding the Project Structure

- `backend`: The deployable Next.js service hosted on Vercel, making use of Edge Functions to handle large response timeouts.
- `chrome-extension/core`: Houses the core files for the Chrome extension, including the `manifest.json` configuration.
- `chrome-extension/content`: A React app utilizing Tailwind and ShadeCN for chat functionalities and a context menu for text selection on loaded pages.
- `chrome-extension/popup`: Provides a popup for configuring your server URL and authorization password. These should originate from the deployed 'backend' instance.

## Installing and Using the Chrome Extension

This process involves two key steps:

1. **Preparing Your Project**
2. **Installing the Extension in Chrome**

### Preparing Your Project

1. Navigate to your project's root directory and execute the following command to install the necessary dependencies and build the Chrome extension:

   ```
   yarn install && yarn build:chrome
   ```

This action will create a `dist` folder, essential for the Chrome Extension.

### Installing the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`. Enable 'Developer mode' from the top right corner.

2. Click the 'Load unpacked' button and navigate to the `dist` folder in your project directory, which was created in the previous step. Click 'Select' and your Chrome Extension should now be installed and ready for use.

## Known Limitations

- Only supports ChatGPT 3.5 model.
- Does not provide an option to preserve or load chat history.
- Lacks an option for selecting predefined prompt templates.
- Does not have a dark mode available.

## Contributing to CompAInion

Your contributions are invaluable to us! We welcome bug reports, feature requests, and pull requests to help us improve CompAInion.

## Upcoming Tasks/Todos

Here are some tasks/todos on my radar that you might be interested in:

1. Isolating CSS from the extension and the domain. As there is a bleed between current webpages and chrome extension atm. (Looking into complete a shadow-dom solution)
2. Enabling the selection of different ChatGPT models (not restricted to 3.5).
3. Implementing a feature to save and load chat history.
   - 3.a. An option to switch between global or tab/website-specific history.
4. Introducing features like summarizing, explaining in layman terms, and more for selected text/context menu.
5. Providing an option to select predefined prompt templates.
   - 5.a. An option to manually create or upload prompt templates.
6. Adding a dark mode.
7. Introducting authentication to support task 3.
8. Fix if any website waits on the input when modal is open/popped up it should disable all other inputs on the page.

Feel free to tackle any of these tasks and submit a pull request. Or raise any feedback in the issues section. I appreciate your collaboration!
