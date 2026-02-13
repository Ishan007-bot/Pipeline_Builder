# ⚡ Pipeline Builder Pro

A **professional-grade visual workflow/pipeline builder** built with React and React Flow. Drag-and-drop nodes, connect them with animated edges, and validate your pipeline as a DAG — all in a stunning dark glassmorphism UI.

---

## ✨ Features

### 🔲 9 Node Types

| Node | Description | Inputs | Outputs |
|------|-------------|--------|---------|
| **📥 Input** | Data entry point | — | 1 (value) |
| **📤 Output** | Data exit point | 1 (value) | — |
| **🧠 LLM** | Large Language Model | 2 (system, prompt) | 1 (response) |
| **📝 Text** | Dynamic text template | Dynamic (from `{{variables}}`) | 1 (output) |
| **🔍 Filter** | Conditional filtering | 1 (input) | 2 (true, false) |
| **🔗 Merge** | Combine multiple inputs | 2 (input1, input2) | 1 (output) |
| **🌐 API Call** | HTTP request node | 2 (body, params) | 2 (response, error) |
| **🔀 Condition** | If/Else branching | 1 (input) | 2 (true, false) |
| **⏱️ Timer** | Delay/debounce/throttle | 1 (input) | 1 (output) |

### 📝 Dynamic Text Node
The **Text node** automatically detects `{{variable}}` patterns and generates input handles for each unique variable in real-time:
- `{{name}}` → creates a "name" input handle
- `Hello {{firstName}} {{lastName}}` → creates two handles: "firstName", "lastName"
- Duplicate variables are deduplicated

### 🚀 Pipeline Submission & DAG Validation
- Sends pipeline data to `POST http://localhost:8000/pipelines/parse`
- Falls back to **client-side DAG validation** (Kahn's Topological Sort) if backend is unavailable
- Displays results in an animated modal: node count, edge count, and DAG validity

### 🔒 Connection Validation
- Prevents **self-loop** connections
- Prevents **duplicate** edges
- Shows toast notifications for invalid connections

### ⌨️ Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Delete` / `Backspace` | Delete selected nodes (smart — disabled while typing in inputs) |

### 🔔 Toast Notifications
- 4 types: success, error, warning, info
- Auto-dismiss after 3 seconds
- Slide-in animation from the right

---

## 🎨 Design

- **Dark glassmorphism** theme with `backdrop-filter: blur()`
- **Google Fonts**: Inter (UI) + JetBrains Mono (code/labels)
- **9 unique accent colors** — one per node type, applied to headers, icons, and handles
- **Animated edges** with smooth-step connections
- **Color-coded MiniMap** for pipeline overview
- **Micro-animations**: hover effects, modal slide-up, toast slide-in, loading spinner

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework |
| **React Flow** (v11.8) | Visual node editor |
| **Zustand** (v4.4) | State management |
| **CSS Custom Properties** | Design system tokens |
| **Kahn's Algorithm** | Client-side DAG validation |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Ishan007-bot/Pipeline_Builder.git
cd Pipeline_Builder

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Backend (Optional)

The submit button sends data to `http://localhost:8000/pipelines/parse`. If the backend is not running, the app falls back to client-side DAG validation.

---

## 📁 Project Structure

```
src/
├── App.js              # Root component with header layout
├── index.js            # React entry point
├── index.css           # Complete design system (1000+ lines)
├── store.js            # Zustand store with validation logic
├── ui.js               # React Flow canvas with keyboard shortcuts
├── toolbar.js          # Categorized node palette (I/O, AI, Logic, Integration)
├── submit.js           # Submit button with modal results
├── draggableNode.js    # Reusable draggable toolbar item
├── toast.js            # Global toast notification system
└── nodes/
    ├── inputNode.js    # Input node
    ├── outputNode.js   # Output node
    ├── llmNode.js      # LLM node
    ├── textNode.js     # Dynamic text node with {{variable}} parsing
    ├── filterNode.js   # Filter/condition node
    ├── mergeNode.js    # Merge/combine node
    ├── apiNode.js      # API call node
    ├── conditionNode.js # If/Else branching node
    └── timerNode.js    # Timer/delay node
```

---

## 📄 License

This project is private and part of an assessment.
