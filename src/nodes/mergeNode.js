// mergeNode.js

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
        <div className="pipeline-node node-accent-merge">
            <Handle type="target" position={Position.Left} id={`${id}-input1`} style={{ top: '30%' }} />
            <Handle type="target" position={Position.Left} id={`${id}-input2`} style={{ top: '65%' }} />

            <div className="node-header">
                <div className="node-icon">🔗</div>
                <span className="node-title">Merge</span>
                <span className="node-subtitle">{id}</span>
            </div>

            <div className="node-body">
                <div className="node-field">
                    <label className="node-field-label">Strategy</label>
                    <select className="node-field-select nodrag" value={mergeStrategy} onChange={handleStrategyChange}>
                        <option value="concatenate">Concatenate</option>
                        <option value="merge_json">Merge JSON</option>
                        <option value="array">Combine as Array</option>
                        <option value="override">Override (Last Wins)</option>
                    </select>
                </div>
                {mergeStrategy === 'concatenate' && (
                    <div className="node-field">
                        <label className="node-field-label">Separator</label>
                        <input
                            type="text"
                            className="node-field-input nodrag"
                            value={separator}
                            onChange={handleSeparatorChange}
                            placeholder="e.g. \\n or ,"
                        />
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
    );
};
