```markdown
# GIF Blocker Extension

A simple browser extension to block GIFs (and related ads) on websites. The extension provides a toggle to enable or disable GIF blocking and supports a whitelist to prevent blocking on specific domains.

## Features

- **Block GIFs**: Automatically remove GIF images from web pages.
- **Whitelist**: Users can add domains to a whitelist to exclude them from blocking.
- **Toggle Switch**: Easily enable or disable the GIF blocking feature via a toggle switch.
- **Customizable**: The extension can be customized to block GIFs on specific pages or disable blocking on others.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/gif-blocker-extension.git
cd gif-blocker-extension
```

### 2. Load the extension in your browser

- **For Chrome**:
  1. Open Chrome and go to `chrome://extensions/`.
  2. Enable **Developer mode** in the top right.
  3. Click **Load unpacked** and select the project folder.

- **For Firefox**:
  1. Open Firefox and go to `about:debugging`.
  2. Click on **This Firefox** and then **Load Temporary Add-on**.
  3. Select the `manifest.json` file in the project folder.

## Usage

- After installing the extension, you can access it by clicking the extension icon in your browser toolbar.
- Use the toggle to enable or disable GIF blocking.
- Add domains to the whitelist to allow GIFs on those sites.

## How It Works

1. The extension checks the current page's domain against the whitelist stored in Chrome storage.
2. If the domain is not whitelisted, GIFs (and related ad elements) are removed from the page.
3. Users can add or remove domains from the whitelist via the extension popup.

## Code Explanation

### Main Features:
- **`blockGIFs`**: Main function to block GIF images on the page.
- **`scanAndRemoveGIFs`**: Scans the page and removes GIF images and any related ad elements.
- **`renderWhitelist`**: Renders the current whitelist on the popup.
- **Storage Handling**: Uses `chrome.storage.sync` to save settings such as the toggle state and whitelist.

## Contributing

If you’d like to contribute to this project, feel free to open an issue or submit a pull request. Here’s how you can get started:

1. Fork this repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/gif-blocker-extension.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
4. Make your changes, then commit and push:
   ```bash
   git commit -am "Add feature"
   git push origin feature-branch
   ```
5. Open a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the [Chrome Extensions documentation](https://developer.chrome.com/docs/extensions/) for providing great resources on building browser extensions.
```

### Explanation of Sections:
1. **Features**: A quick overview of the main features of your extension.
2. **Installation**: Instructions on how to set up the extension locally by cloning the repository and loading it into the browser.
3. **Usage**: A brief description of how users can interact with your extension.
4. **How It Works**: Explains how the extension operates (blocking GIFs and whitelist management).
5. **Code Explanation**: Provides insight into the main functions and components of your extension.
6. **Contributing**: A guide on how other developers can contribute to your project.
7. **License**: Specify the open-source license for your project (MIT in this case).
8. **Acknowledgments**: A space to thank any resources or contributors that helped you build the project.

This template will help you document your project effectively on GitHub. Let me know if you'd like to adjust anything!