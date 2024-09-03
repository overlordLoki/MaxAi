# MaxAi

# AI Chat and Image Generator App

This project is a React-based web application that allows users to interact with an AI chat system and generate images via an API. The app features a tabbed interface where users can switch between the chat and image generation modes.

This project is still in development. I am making this for my own personal. if runnning your own server you will need to download the backend. (middleware)

Link to current Development: [MaxAi](https://dev.overlord-loki.com/)

## Features

- **AI Chat**: Communicate with an AI assistant. The conversation history is retained in the chat window. The chatbox is resizable by dragging the bottom-right corner.
- **Image Generation**: Generate images via an API using text prompts.
- **Tab Bar Navigation**: Easily switch between the Chat and Image Generator modes.
- **Resizable Chatbox**: Users can adjust the chatbox size to suit their preferences.

## Technologies Used

- **React**: The UI is built using React components.
- **TypeScript**: TypeScript is used for type safety and improved developer experience.
- **Vite**: The app is bundled using Vite for fast development and optimized builds.
- **Tailwind CSS**: Tailwind CSS is used for styling the application.
- **Bun**: Bun is used as the runtime environment.
- **Gin**: For the backend server (if applicable).

## Getting Started

### Prerequisites

- Node.js
- Bun (optional if not using Bun for development)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-chat-image-app.git
   cd ai-chat-image-app
   ```

2. Install the dependencies:

   If using Bun:

   ```bash
   bun install
   ```

   If using npm:

   ```bash
   npm install
   ```

3. Start the development server:

   If using Bun:

   ```bash
   bun run dev
   ```

   If using npm:

   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:3000`.

### Building for Production

To create a production build of the app, run:

```bash
bun run build
```

Or if using npm:

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Running the Production Build

To preview the production build locally:

```bash
bun run serve
```

Or if using npm:

```bash
npm run preview
```

## Project Structure

The project is organized as follows:

```
.
├── src
│   ├── assets               # Static assets such as images
│   ├── components           # React components
│   │   ├── AIChat.tsx       # AI Chat component
│   │   ├── AIImage.tsx      # Image Generator component
│   │   ├── TabBar.tsx       # Tab Bar component for navigation
│   └── App.tsx              # Main App component
├── public                   # Public folder for static files
│   └── index.html
├── styles                   # Global styles
├── package.json             # Project dependencies and scripts
└── README.md                # This file
```

## Resizable Chatbox

The chatbox is resizable by dragging the bottom-right corner. The resize logic is managed in the `App.tsx` component, and the new size is passed as inline styles to the `AIChat` component.

To adjust the chatbox size:

1. Hover over the bottom-right corner of the chatbox.
2. Click and drag to resize.

## Future Enhancements

- Add support for more AI-driven features.
- Improve the image generation model with more customization options.
- Add user authentication and profile management.
- Add support for saving and loading chat history.

