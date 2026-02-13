// apiNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
    const [url, setUrl] = useState(data?.url || '');
    const [method, setMethod] = useState(data?.method || 'GET');
    const [headers, setHeaders] = useState(data?.headers || '');
    const updateNodeField = useStore((state) => state.updateNodeField);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
        updateNodeField(id, 'url', e.target.value);
    };

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
        updateNodeField(id, 'method', e.target.value);
    };

    const handleHeadersChange = (e) => {
        setHeaders(e.target.value);
        updateNodeField(id, 'headers', e.target.value);
    };

    const methodColors = {
        GET: '#10b981',
        POST: '#3b82f6',
        PUT: '#f59e0b',
        DELETE: '#f43f5e',
        PATCH: '#8b5cf6',
    };

    return (
        <div className="pipeline-node node-accent-api">
            <Handle type="target" position={Position.Left} id={`${id}-body`} style={{ top: '30%' }} />
            <Handle type="target" position={Position.Left} id={`${id}-params`} style={{ top: '70%' }} />

            <div className="node-header">
                <div className="node-icon">🌐</div>
                <span className="node-title">API Call</span>
                <span style={{
                    fontSize: '10px',
                    padding: '1px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                    background: `${methodColors[method]}20`,
                    color: methodColors[method],
                    marginLeft: 'auto',
                }}>
                    {method}
                </span>
            </div>

            <div className="node-body">
                <div className="node-field">
                    <label className="node-field-label">Method</label>
                    <select className="node-field-select nodrag" value={method} onChange={handleMethodChange}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </select>
                </div>
                <div className="node-field">
                    <label className="node-field-label">URL</label>
                    <input
                        type="text"
                        className="node-field-input nodrag"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="https://api.example.com/data"
                    />
                </div>
                <div className="node-field">
                    <label className="node-field-label">Headers (JSON)</label>
                    <input
                        type="text"
                        className="node-field-input nodrag"
                        value={headers}
                        onChange={handleHeadersChange}
                        placeholder='{"Authorization": "Bearer ..."}'
                    />
                </div>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-response`} style={{ top: '30%' }} />
            <Handle type="source" position={Position.Right} id={`${id}-error`} style={{ top: '70%' }} />
        </div>
    );
};
