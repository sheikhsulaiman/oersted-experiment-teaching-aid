# Oersted's Experiment Teaching Aid

An interactive teaching aid for understanding electromagnetic phenomena, specifically Oersted's experiment and related concepts. Built with Vite, React, TypeScript, and shadcn/ui.

## Features

### 1. Interactive Oersted's Experiment

- Virtual compass with animated needle deflection
- Current on/off switch
- Reverse current direction button
- Wire visualization with animated electron flow
- Real-time compass deflection based on current direction
- Visual magnetic field indicators

### 2. Magnetic Field Visualizer

- Straight wire cross-section with circular field lines
- Animated iron filings pattern
- Adjustable current intensity slider (affects field strength)
- Optional 3D perspective view
- Field direction indicators
- Dynamic field strength visualization

### 3. Right-Hand Thumb Rule Helper

- Visual guide with animated hand demonstration
- Step-by-step instructions
- Interactive practice mode with quiz questions
- Real-time feedback and scoring
- Multiple practice scenarios

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Video Guide

Watch a quick video tutorial on how to use the application:

https://github.com/sheikhsulaiman/oersted-experiment-teaching-aid/assets/188737697/Oersted's%20Experiment%20Teaching%20Aid.mp4

## Usage

1. Open the application in your browser:
   - Local development: http://localhost:5173
   - Deployed version: http://localhost:5173/oersted-experiment-teaching-aid/
2. Navigate between three tabs:
   - **Oersted's Experiment**: Toggle current on/off and observe compass deflection
   - **Magnetic Field Visualizer**: Adjust current intensity and explore field patterns
   - **Right-Hand Rule**: Learn the rule and test your understanding

## Technologies Used

- **Vite**: Fast build tool and dev server
- **React 18**: UI framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React components
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── OerstedExperiment.tsx
│   ├── MagneticFieldVisualizer.tsx
│   └── RightHandRule.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main application with tab navigation
└── main.tsx             # Application entry point
```

## Educational Value

This teaching aid helps students understand:

- How electric current creates magnetic fields (Oersted's discovery)
- The circular nature of magnetic fields around current-carrying wires
- The right-hand thumb rule for determining field direction
- The relationship between current intensity and field strength
- Practical applications of electromagnetic principles

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
