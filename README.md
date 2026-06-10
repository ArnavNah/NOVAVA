# Vortex UI - Volumetric Dynamics

Vortex UI is a high-performance, visually stunning landing page template designed for creative engineering studios and agencies. It showcases real-time WebGL-driven spatial user interfaces using a combination of custom GLSL vertex shaders, three.js, and GSAP-driven ScrollTrigger animations.

## Key Features

- **WebGL Background Canvas**: An iridescent wave shader background powered by Three.js, responding dynamically to cursor movement for interactive parallax effects.
- **GSAP ScrollTrigger Animations**: Fluid word-level reveals, section fade-ins, and scroll-bound animations.
- **Glassmorphism Design System**: Harmonious color palettes, glass membranes, custom gradients, and dynamic interactive hover states.
- **Interactive Component Demos**:
  - **Architecture Tabs**: An interactive tab-switcher showing different WebGL visualization states (Quantum Materials, Ray-Traced Physics, Volumetric Pipeline).
  - **Typewriter Code Block**: An intersection-observed typewriter animation showing code syntax highlighting in real-time.
  - **Flexible Pricing Toggle**: A interactive monthly/annual billing switcher with smooth pop transitions.
- **Responsive Layout**: Designed mobile-first, adhering to strict layout grids and typography tokens.

## Tech Stack

- **Core**: HTML5, Vanilla JavaScript (ES Modules)
- **Styling**: Tailwind CSS (via CDN) & Custom Vanilla CSS (`style.css`)
- **Graphics**: [Three.js](https://threejs.org/) (WebGL2 shader material compiler)
- **Animation**: [GSAP](https://gsap.com/) & [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- **Icons**: [Lucide Icons](https://lucide.dev/) (Client-side custom svg instantiator)
- **Build Tool**: [Vite](https://vitejs.dev/)

## Project Structure

```bash
├── dist/               # Compiled production bundle
├── index.html          # Main HTML markup
├── main.js             # Core application logic, shaders & animations
├── style.css           # Custom stylesheets and animation rules
├── package.json        # Node dependencies and scripts
└── vite.config.js      # Vite dev and build configuration
```

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (recommended: v18+).

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd nova-ui-spatial
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the local server URL (usually `http://localhost:3000` or `http://localhost:5173`).

### Production Build

Compile the production-ready build:
```bash
npm run build
```
This will compile, minify, and output the static site assets inside the `dist/` directory.

### Preview Build

Preview the compiled production build locally:
```bash
npm run preview
```

## Core Implementation Notes

- **Shader Redefinition Fixed**: The GLSL custom vertex shader was adjusted to remove duplicate `attribute vec2 uv;` declarations to support WebGL2 (`#version 300 es`) contexts smoothly.
- **Vite Dev ReadyState Fixed**: Background initialization now correctly checks the document's `readyState` before attaching to `DOMContentLoaded` to guarantee canvas loading on fast dynamic asset reloads.
- **Bundler Integration**: Removed conflicting global CDN tags in `index.html` to allow direct module registration via local npm dependencies, ensuring unified animation states.

---
Built with passion bycreative technologists.
