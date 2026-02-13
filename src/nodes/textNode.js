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

  // Extract {{variable}} patterns from text
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

  // Update variables whenever text changes
  useEffect(() => {
    const newVars = extractVariables(currText);
    setVariables(newVars);
  }, [currText, extractVariables]);

  // Auto-resize textarea
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

  // Calculate handle positions evenly spaced on the left
  const getHandleTop = (index, total) => {
    if (total === 1) return '50%';
    const spacing = 100 / (total + 1);
    return `${spacing * (index + 1)}%`;
  };

  return (
    <div style={{
      width: 230,
      minHeight: 80,
      border: '1px solid black',
      padding: '8px',
      borderRadius: '4px',
      background: '#fff',
    }}>
      {/* Dynamic input handles for each {{variable}} */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{ top: getHandleTop(index, variables.length) }}
        />
      ))}

      <div>
        <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Text</span>
      </div>

      {/* Variable tags */}
      {variables.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          marginBottom: '6px',
          marginTop: '4px',
        }}>
          {variables.map((v) => (
            <span key={v} style={{
              fontSize: '10px',
              padding: '1px 6px',
              borderRadius: '10px',
              backgroundColor: '#e0edff',
              color: '#1a56db',
              border: '1px solid #bdd4f7',
            }}>
              {v}
            </span>
          ))}
        </div>
      )}

      <div>
        <label style={{ fontSize: '11px', color: '#555' }}>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              minHeight: '30px',
              maxHeight: '150px',
              resize: 'none',
              overflow: 'auto',
              fontSize: '12px',
              padding: '4px',
              borderRadius: '3px',
              border: '1px solid #ccc',
              fontFamily: 'monospace',
              boxSizing: 'border-box',
              marginTop: '4px',
            }}
            className="nodrag"
          />
        </label>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
