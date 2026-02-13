// apiNode.js
// API Node: Makes HTTP requests to external APIs

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

    return (
        <div style={{ width: 230, minHeight: 110, border: '1px solid black', padding: '8px', borderRadius: '4px', background: '#fff' }}>
            <Handle type="target" position={Position.Left} id={`${id}-body`} style={{ top: '30%' }} />
            <Handle type="target" position={Position.Left} id={`${id}-params`} style={{ top: '70%' }} />

            <div>
                <span style={{ fontWeight: 'bold', fontSize: '12px' }}>API Call</span>
            </div>

            <div style={{ marginTop: '6px' }}>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    Method:
                    <select value={method} onChange={handleMethodChange} className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px', marginTop: '2px' }}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                        <option value="PATCH">PATCH</option>
                    </select>
                </label>
                <label style={{ fontSize: '11px', display: 'block', marginBottom: '4px' }}>
                    URL:
                    <input
                        type="text"
                        value={url}
                        onChange={handleUrlChange}
                        placeholder="https://api.example.com/data"
                        className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                    />
                </label>
                <label style={{ fontSize: '11px', display: 'block' }}>
                    Headers (JSON):
                    <input
                        type="text"
                        value={headers}
                        onChange={handleHeadersChange}
                        placeholder='{"Authorization": "Bearer ..."}'
                        className="nodrag"
                        style={{ width: '100%', fontSize: '11px', padding: '2px 4px', boxSizing: 'border-box', marginTop: '2px' }}
                    />
                </label>
            </div>

            <Handle type="source" position={Position.Right} id={`${id}-response`} style={{ top: '30%' }} />
            <Handle type="source" position={Position.Right} id={`${id}-error`} style={{ top: '70%' }} />
        </div>
    );
};
