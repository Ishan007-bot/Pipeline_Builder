// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <div className="pipeline-node node-accent-input">
      <div className="node-header">
        <div className="node-icon">📥</div>
        <span className="node-title">Input</span>
        <span className="node-subtitle">{id}</span>
      </div>
      <div className="node-body">
        <div className="node-field">
          <label className="node-field-label">Name</label>
          <input
            type="text"
            className="node-field-input nodrag"
            value={currName}
            onChange={handleNameChange}
            placeholder="Enter input name..."
          />
        </div>
        <div className="node-field">
          <label className="node-field-label">Type</label>
          <select className="node-field-select nodrag" value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id={`${id}-value`} />
    </div>
  );
}
