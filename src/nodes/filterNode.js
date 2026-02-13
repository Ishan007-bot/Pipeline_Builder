// filterNode.js
// Filter/Transform node: Applies conditions to filter or transform data

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
        <div style={{ width: 220, minHeight: 100, border: '1px solid black', padding: '8px', borderRadius: '4px', background: '#fff' }}>
            <Handle type="target" position={Position.Left} id={`${id}-input`} />

            <div>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Filter</span>
            </div>

            <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Field:
                    <input
                        type="text"
                        value={field}
                        onChange={handleFieldChange}
                        placeholder="e.g. status"
                        className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                    />
                </label>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Condition:
                    <select value={condition} onChange={handleConditionChange} className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px', marginTop: '2px' }}>
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="not_equals">Not Equals</option>
                        <option value="greater_than">Greater Than</option>
                        <option value="less_than">Less Than</option>
                        <option value="regex">Regex Match</option>
                    </select>
                </label>
                <label style={{ fontSize: '11px', display: 'block' }}>
                    Value:
                    <input
                        type="text"
                        value={value}
                        onChange={handleValueChange}
                        placeholder="e.g. active"
                        className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                    />
                </label>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-true`} style={{ top: '40%' }} />
            <Handle type="source" position={Position.Right} id={`${id}-false`} style={{ top: '70%' }} />
        </div>
    );
};
