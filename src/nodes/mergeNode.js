// mergeNode.js
// Merge node: Combines multiple inputs into a single output

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const MergeNode = ({ id, data }) => {
    const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concatenate');
    const [separator, setSeparator] = useState(data?.separator || '\\n');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleStrategyChange = (e) => {
        setMergeStrategy(e.target.value);
        updateNodeField(id, 'mergeStrategy', e.target.value);
    };

    const handleSeparatorChange = (e) => {
        setSeparator(e.target.value);
        updateNodeField(id, 'separator', e.target.value);
    };

    return (
        <div style={{ width: 200, minHeight: 90, border: '1px solid black', padding: '8px', borderRadius: '4px', background: '#fff' }}>
            <Handle type="target" position={Position.Left} id={`${id}-input1`} style={{ top: '30%' }} />
            <Handle type="target" position={Position.Left} id={`${id}-input2`} style={{ top: '60%' }} />

            <div>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Merge</span>
            </div>

            <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Strategy:
                    <select value={mergeStrategy} onChange={handleStrategyChange} className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px', marginTop: '2px' }}>
                        <option value="concatenate">Concatenate</option>
                        <option value="merge_json">Merge JSON</option>
                        <option value="array">Combine as Array</option>
                        <option value="override">Override (Last Wins)</option>
                    </select>
                </label>
                {mergeStrategy === 'concatenate' && (
                    <label style={{ fontSize: '11px', display: 'block' }}>
                        Separator:
                        <input
                            type="text"
                            value={separator}
                            onChange={handleSeparatorChange}
                            className="nodrag"
                            style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                        />
                    </label>
                )}
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
    );
};
