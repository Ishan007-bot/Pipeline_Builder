// App.js

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ToastContainer } from './toast';

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">⚡</div>
          <span className="app-logo-text">Pipeline Builder</span>
          <span className="app-logo-badge">Pro</span>
        </div>
        <div className="app-header-actions">
          {/* Future: settings, export, etc. */}
        </div>
      </header>

      {/* Toolbar */}
      <PipelineToolbar />

      {/* Canvas */}
      <PipelineUI />

      {/* Submit */}
      <SubmitButton />

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
