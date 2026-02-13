// outputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <div className="pipeline-node node-accent-output">
      <Handle type="target" position={Position.Left} id={`${id}-value`} />
      <div className="node-header">
        <div className="node-icon">📤</div>
        <span className="node-title">Output</span>
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
            placeholder="Enter output name..."
          />
        </div>
        <div className="node-field">
          <label className="node-field-label">Type</label>
          <select className="node-field-select nodrag" value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
      </div>
    </div>
  );
}
