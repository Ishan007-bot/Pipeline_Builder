// textNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>Text</span>
      </div>
      <div>
        <label>
          Text:
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
          />
        </label>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
