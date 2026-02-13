// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { showToast } from './toast';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async () => {
        if (nodes.length === 0) {
            showToast('Pipeline is empty. Add some nodes first!', 'warning');
            return;
        }

        setIsLoading(true);
        showToast('Analyzing pipeline...', 'info');

        const pipelineData = {
            nodes: nodes.map((node) => ({
                id: node.id,
                type: node.type,
                data: node.data,
                position: node.position,
            })),
            edges: edges.map((edge) => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
            })),
        };

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            setResult({
                num_nodes: data.num_nodes,
                num_edges: data.num_edges,
                is_dag: data.is_dag,
                source: 'server',
            });
            showToast('Pipeline analysis complete!', 'success');
        } catch (error) {
            console.warn('Backend not available, performing client-side analysis:', error.message);
            setResult({
                num_nodes: nodes.length,
                num_edges: edges.length,
                is_dag: checkIfDAG(nodes, edges),
                source: 'client',
            });
            showToast('Analysis complete (client-side)', 'success');
        } finally {
            setIsLoading(false);
            setShowModal(true);
        }
    };

    const checkIfDAG = (nodes, edges) => {
        if (nodes.length === 0) return true;

        const adjList = {};
        const inDegree = {};

        nodes.forEach((node) => {
            adjList[node.id] = [];
            inDegree[node.id] = 0;
        });

        edges.forEach((edge) => {
            if (adjList[edge.source]) {
                adjList[edge.source].push(edge.target);
            }
            if (inDegree[edge.target] !== undefined) {
                inDegree[edge.target] += 1;
            }
        });

        const queue = [];
        Object.keys(inDegree).forEach((nodeId) => {
            if (inDegree[nodeId] === 0) queue.push(nodeId);
        });

        let visited = 0;
        while (queue.length > 0) {
            const current = queue.shift();
            visited++;
            if (adjList[current]) {
                adjList[current].forEach((neighbor) => {
                    inDegree[neighbor] -= 1;
                    if (inDegree[neighbor] === 0) queue.push(neighbor);
                });
            }
        }

        return visited === nodes.length;
    };

    return (
        <>
            <div className="submit-section">
                <div className="pipeline-stats">
                    <div className="stat-item">
                        <span>Nodes</span>
                        <span className="stat-value">{nodes.length}</span>
                    </div>
                    <div className="stat-item">
                        <span>Edges</span>
                        <span className="stat-value">{edges.length}</span>
                    </div>
                </div>

                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={isLoading || nodes.length === 0}
                >
                    {isLoading ? (
                        <>
                            <span className="loading-spinner" />
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span className="submit-btn-icon">▶</span>
                            Run Pipeline
                        </>
                    )}
                </button>
            </div>

            {/* Result Modal */}
            {showModal && result && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className={`modal-icon ${result.is_dag ? 'success' : 'error'}`}>
                                {result.is_dag ? '✅' : '⚠️'}
                            </div>
                            <div>
                                <div className="modal-title">Pipeline Analysis</div>
                                <div className="modal-subtitle">
                                    {result.source === 'server' ? 'Server-side validation' : 'Client-side validation'}
                                </div>
                            </div>
                        </div>

                        <div className="modal-stats">
                            <div className="modal-stat">
                                <span className="modal-stat-label">🔲 Total Nodes</span>
                                <span className="modal-stat-value">{result.num_nodes}</span>
                            </div>
                            <div className="modal-stat">
                                <span className="modal-stat-label">🔗 Total Edges</span>
                                <span className="modal-stat-value">{result.num_edges}</span>
                            </div>
                            <div className="modal-stat">
                                <span className="modal-stat-label">🔄 Valid DAG</span>
                                <span className={`modal-stat-value ${result.is_dag ? 'dag-yes' : 'dag-no'}`}>
                                    {result.is_dag ? 'Yes ✓' : 'No ✗'}
                                </span>
                            </div>
                        </div>

                        <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
