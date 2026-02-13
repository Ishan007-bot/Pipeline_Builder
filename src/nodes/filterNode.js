// filterNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
    const [field, setField] = useState(data?.field || '');
    const [condition, setCondition] = useState(data?.condition || 'contains');
    const [value, setValue] = useState(data?.value || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleFieldChange = (e) => {
        setField(e.target.value);
        updateNodeField(id, 'field', e.target.value);
    };

    const handleConditionChange = (e) => {
        setCondition(e.target.value);
        updateNodeField(id, 'condition', e.target.value);
    };

    const handleValueChange = (e) => {
        setValue(e.target.value);
        updateNodeField(id, 'value', e.target.value);
    };

    return (
        <div className="pipeline-node node-accent-filter">
            <Handle type="target" position={Position.Left} id={`${id}-input`} />

            <div className="node-header">
                <div className="node-icon">🔍</div>
                <span className="node-title">Filter</span>
                <span className="node-subtitle">{id}</span>
            </div>

            <div className="node-body">
                <div className="node-field">
                    <label className="node-field-label">Field</label>
                    <input
                        type="text"
                        className="node-field-input nodrag"
                        value={field}
                        onChange={handleFieldChange}
                        placeholder="e.g. status"
                    />
                </div>
                <div className="node-field">
                    <label className="node-field-label">Condition</label>
                    <select className="node-field-select nodrag" value={condition} onChange={handleConditionChange}>
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="greater_than">Greater Than</option>
                        <option value="less_than">Less Than</option>
                        <option value="regex">Regex Match</option>
                    </select>
                </div>
                <div className="node-field">
                    <label className="node-field-label">Value</label>
                    <input
                        type="text"
                        className="node-field-input nodrag"
                        value={value}
                        onChange={handleValueChange}
                        placeholder="e.g. active"
                    />
                </div>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-true`} style={{ top: '40%' }} />
            <Handle type="source" position={Position.Right} id={`${id}-false`} style={{ top: '75%' }} />
        </div>
    );
};
