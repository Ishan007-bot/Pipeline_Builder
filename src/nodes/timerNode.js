// timerNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TimerNode = ({ id, data }) => {
    const [delayMs, setDelayMs] = useState(data?.delayMs || 1000);
    const [unit, setUnit] = useState(data?.unit || 'ms');
    const [mode, setMode] = useState(data?.mode || 'delay');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleDelayChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        setDelayMs(val);
        updateNodeField(id, 'delayMs', val);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
        updateNodeField(id, 'unit', e.target.value);
    };

    const handleModeChange = (e) => {
        setMode(e.target.value);
        updateNodeField(id, 'mode', e.target.value);
    };

    const getDisplayValue = () => {
        switch (unit) {
            case 'ms': return `${delayMs}ms`;
            case 's': return `${delayMs}s`;
            case 'min': return `${delayMs}min`;
            default: return `${delayMs}ms`;
        }
    };

    return (
        <div className="pipeline-node node-accent-timer">
            <Handle type="target" position={Position.Left} id={`${id}-input`} />

            <div className="node-header">
                <div className="node-icon">⏱️</div>
                <span className="node-title">Timer</span>
                <span style={{
                    fontSize: '10px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: 'rgba(236, 72, 153, 0.12)',
                    color: '#ec4899',
                    marginLeft: 'auto',
                }}>
                    {getDisplayValue()}
                </span>
            </div>

            <div className="node-body">
                <div className="node-field">
                    <label className="node-field-label">Mode</label>
                    <select className="node-field-select nodrag" value={mode} onChange={handleModeChange}>
                        <option value="delay">Delay</option>
                        <option value="debounce">Debounce</option>
                        <option value="throttle">Throttle</option>
                        <option value="interval">Interval (Repeat)</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div className="node-field" style={{ flex: 1 }}>
                        <label className="node-field-label">Duration</label>
                        <input
                            type="number"
                            className="node-field-input nodrag"
                            value={delayMs}
                            onChange={handleDelayChange}
                            min="0"
                        />
                    </div>
                    <div className="node-field" style={{ width: '70px' }}>
                        <label className="node-field-label">Unit</label>
                        <select className="node-field-select nodrag" value={unit} onChange={handleUnitChange}>
                            <option value="ms">ms</option>
                            <option value="s">sec</option>
                            <option value="min">min</option>
                        </select>
                    </div>
                </div>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
    );
};
