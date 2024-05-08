# Gemini_Api_Text_Input_Output

## Description

This repository contains a Node.js script that interacts with the Google Generative AI API, specifically the Gemini model, to generate text responses based on input prompts. The script is designed to demonstrate how to utilize the Gemini API for text generation tasks.

## Installation

1. Clone this repository to your local machine.
2. Install dependencies by running npm install.
3. Create a .env file in the root directory of the project and add your Gemini API key as `GEMINI_API_KEY=YOUR_API_KEY_HERE`.

## Usage

To use the script, follow these steps:

1. Open the index.js file.
2. Modify the Prompt variable to specify your desired input prompt.
3. Run the script using the command node index.js.
4. The generated text response will be logged to the console.

## Configuration

The script allows for some configuration options:

- `maxOutputTokens`: Maximum number of tokens to generate in the output.
- `temperature`: Controls the randomness of the output. Ranges from 0 to 1, with higher values resulting in more random output.
- `topP`: A parameter for nucleus sampling, controlling the diversity of the output.
- `topK`: Another parameter for diversity control.
    These options can be adjusted within the generationConfig object in the index.js file.

## Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
