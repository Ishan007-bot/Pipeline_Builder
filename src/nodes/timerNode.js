// timerNode.js
// Timer/Delay Node: Adds a delay or schedules pipeline execution

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

    // Compute display value
    const getDisplayValue = () => {
        switch (unit) {
            case 'ms': return `${delayMs}ms`;
            case 's': return `${delayMs}s`;
            case 'min': return `${delayMs}min`;
            default: return `${delayMs}ms`;
        }
    };

    return (
        <div style={{ width: 200, minHeight: 100, border: '1px solid black', padding: '8px', borderRadius: '4px', background: '#fff' }}>
            <Handle type="target" position={Position.Left} id={`${id}-input`} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Timer</span>
                <span style={{ fontSize: '10px', color: '#666', fontFamily: 'monospace' }}>{getDisplayValue()}</span>
            </div>

            <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Mode:
                    <select value={mode} onChange={handleModeChange} className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px', marginTop: '2px' }}>
                        <option value="delay">Delay</option>
                        <option value="debounce">Debounce</option>
                        <option value="throttle">Throttle</option>
                        <option value="interval">Interval (Repeat)</option>
                    </select>
                </label>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <label style={{ fontSize: '11px', flex: 1 }}>
                        Duration:
                        <input
                            type="number"
                            value={delayMs}
                            onChange={handleDelayChange}
                            min="0"
                            className="nodrag"
                            style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                        />
                    </label>
                    <label style={{ fontSize: '11px', width: '50px' }}>
                        Unit:
                        <select value={unit} onChange={handleUnitChange} className="nodrag"
                            style={{ width: '100%', fontSize: '11px', padding: '2px', marginTop: '2px' }}>
                            <option value="ms">ms</option>
                            <option value="s">s</option>
                            <option value="min">min</option>
                        </select>
                    </label>
                </div>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
    );
};
