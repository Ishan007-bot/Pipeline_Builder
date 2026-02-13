// conditionNode.js

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

    const isUnary = ['is_true', 'is_false', 'is_empty', 'is_not_empty'].includes(operator);

    return (
        <div className="pipeline-node node-accent-condition">
            <Handle type="target" position={Position.Left} id={`${id}-input`} />

            <div className="node-header">
                <div className="node-icon">🔀</div>
                <span className="node-title">Condition</span>
                <span className="node-subtitle">{id}</span>
            </div>

            <div className="node-body">
                <div className="node-field">
                    <label className="node-field-label">If Field</label>
                    <input
                        type="text"
                        className="node-field-input nodrag"
                        value={field}
                        onChange={handleFieldChange}
                        placeholder="e.g. response.status"
                    />
                </div>
                <div className="node-field">
                    <label className="node-field-label">Operator</label>
                    <select className="node-field-select nodrag" value={operator} onChange={handleOperatorChange}>
                        <option value="equals">== (Equals)</option>
                        <option value="not_equals">!= (Not Equals)</option>
                        <option value="greater_than">&gt; (Greater Than)</option>
                        <option value="less_than">&lt; (Less Than)</option>
                        <option value="is_true">Is True</option>
                        <option value="is_false">Is False</option>
                        <option value="is_empty">Is Empty</option>
                        <option value="is_not_empty">Is Not Empty</option>
                    </select>
                </div>
                {!isUnary && (
                    <div className="node-field">
                        <label className="node-field-label">Value</label>
                        <input
                            type="text"
                            className="node-field-input nodrag"
                            value={compareValue}
                            onChange={handleValueChange}
                            placeholder="e.g. 200"
                        />
                    </div>
                )}

                {/* Branch labels */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '2px' }}>
                    <span style={{
                        fontSize: '9px', padding: '2px 8px', borderRadius: '20px',
                        background: 'rgba(16, 185, 129, 0.12)', color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        fontFamily: "'JetBrains Mono', monospace",
                    }}>✓ true</span>
                    <span style={{
                        fontSize: '9px', padding: '2px 8px', borderRadius: '20px',
                        background: 'rgba(244, 63, 94, 0.12)', color: '#f43f5e',
                        border: '1px solid rgba(244, 63, 94, 0.25)',
                        fontFamily: "'JetBrains Mono', monospace",
                    }}>✗ false</span>
                </div>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-true`} style={{ top: '35%' }} />
            <Handle type="source" position={Position.Right} id={`${id}-false`} style={{ top: '80%' }} />
        </div>
    );
};
