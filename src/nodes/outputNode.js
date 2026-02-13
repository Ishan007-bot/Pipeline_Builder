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
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />
      <div>
        <span>Output</span>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
}
