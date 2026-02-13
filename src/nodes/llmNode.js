// llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {

  return (
    <div className="pipeline-node node-accent-llm">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        style={{ top: '33%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '66%' }}
      />

      <div className="node-header">
        <div className="node-icon">🧠</div>
        <span className="node-title">LLM Engine</span>
        <span className="node-subtitle">{id}</span>
      </div>
      <div className="node-body">
        <div className="node-info-row">
          <span style={{ fontSize: '13px' }}>⚙️</span>
          <span className="node-info-text">Large Language Model</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
          <div style={{
            fontSize: '9px',
            padding: '2px 8px',
            borderRadius: '20px',
            background: 'rgba(139, 92, 246, 0.12)',
            color: '#a78bfa',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            system
          </div>
          <div style={{
            fontSize: '9px',
            padding: '2px 8px',
            borderRadius: '20px',
            background: 'rgba(139, 92, 246, 0.12)',
            color: '#a78bfa',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            prompt
          </div>
          <div style={{
            fontSize: '9px',
            padding: '2px 8px',
            borderRadius: '20px',
            background: 'rgba(139, 92, 246, 0.08)',
            color: '#7c3aed',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            → response
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
}
