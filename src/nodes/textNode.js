// textNode.js
// Dynamic Text Node: Automatically creates input handles for {{variable}} patterns

import { useState, useEffect, useRef, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const extractVariables = useCallback((text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const vars = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!vars.includes(match[1])) {
        vars.push(match[1]);
      }
    }
    return vars;
  }, []);

  useEffect(() => {
    const newVars = extractVariables(currText);
    setVariables(newVars);
  }, [currText, extractVariables]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const spacing = 100 / (total + 1);
    return `${spacing * (index + 1)}%`;
  };

  return (
    <div className="pipeline-node node-accent-text">
      {/* Dynamic input handles */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: getHandleTop(index, variables.length) }}
        />
      ))}

      <div className="node-header">
        <div className="node-icon">📝</div>
        <span className="node-title">Text</span>
        <span className="node-subtitle">{id}</span>
      </div>
      <div className="node-body">
        {/* Variable tags */}
        {variables.length > 0 && (
          <div className="variable-tags">
            {variables.map((v) => (
              <span key={v} className="variable-tag">{v}</span>
            ))}
          </div>
        )}

        <div className="node-field">
          <label className="node-field-label">Template</label>
          <textarea
            ref={textareaRef}
            className="node-field-textarea nodrag"
            value={currText}
            onChange={handleTextChange}
            placeholder="Use {{variables}} for dynamic inputs..."
          />
        </div>
      </div>

      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
}
