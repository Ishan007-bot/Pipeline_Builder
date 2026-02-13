// conditionNode.js
// Condition Node: If/Else branching logic

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
    const [field, setField] = useState(data?.field || '');
    const [operator, setOperator] = useState(data?.operator || 'equals');
    const [compareValue, setCompareValue] = useState(data?.compareValue || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleFieldChange = (e) => {
        setField(e.target.value);
        updateNodeField(id, 'field', e.target.value);
    };

    const handleOperatorChange = (e) => {
        setOperator(e.target.value);
        updateNodeField(id, 'operator', e.target.value);
    };

    const handleValueChange = (e) => {
        setCompareValue(e.target.value);
        updateNodeField(id, 'compareValue', e.target.value);
    };

    return (
        <div style={{ width: 220, minHeight: 100, border: '1px solid black', padding: '8px', borderRadius: '4px', background: '#fff' }}>
            <Handle type="target" position={Position.Left} id={`${id}-input`} />

            <div>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Condition (If/Else)</span>
            </div>

            <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    If field:
                    <input
                        type="text"
                        value={field}
                        onChange={handleFieldChange}
                        placeholder="e.g. response.status"
                        className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                    />
                </label>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Operator:
                    <select value={operator} onChange={handleOperatorChange} className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px', marginTop: '2px' }}>
                        <option value="equals">== (Equals)</option>
                        <option value="not_equals">!= (Not Equals)</option>
                        <option value="greater_than">&gt; (Greater Than)</option>
                        <option value="less_than">&lt; (Less Than)</option>
                        <option value="is_true">Is True</option>
                        <option value="is_false">Is False</option>
                        <option value="is_empty">Is Empty</option>
                        <option value="is_not_empty">Is Not Empty</option>
                    </select>
                </label>
                {!['is_true', 'is_false', 'is_empty', 'is_not_empty'].includes(operator) && (
                    <label style={{ fontSize: '11px', display: 'block' }}>
                        Value:
                        <input
                            type="text"
                            value={compareValue}
                            onChange={handleValueChange}
                            placeholder="e.g. 200"
                            className="nodrag"
                            style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                        />
                    </label>
                )}
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-true`} style={{ top: '35%' }} />
            <Handle type="source" position={Position.Right} id={`${id}-false`} style={{ top: '75%' }} />
        </div>
    );
};
