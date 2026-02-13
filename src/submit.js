// submit.js

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        // Build the pipeline data
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();

            // Display the result
            alert(
                `Pipeline Analysis:\n\n` +
                `• Number of Nodes: ${result.num_nodes}\n` +
                `• Number of Edges: ${result.num_edges}\n` +
                `• Is a DAG: ${result.is_dag ? 'Yes ✓' : 'No ✗'}`
            );
        } catch (error) {
            // If backend is not running, do client-side analysis
            console.warn('Backend not available, performing client-side analysis:', error.message);

            const numNodes = nodes.length;
            const numEdges = edges.length;
            const isDAG = checkIfDAG(nodes, edges);

            alert(
                `Pipeline Analysis (Client-Side):\n\n` +
                `• Number of Nodes: ${numNodes}\n` +
                `• Number of Edges: ${numEdges}\n` +
                `• Is a DAG: ${isDAG ? 'Yes ✓' : 'No ✗'}`
            );
        }
    };

    // Client-side DAG check using topological sort (Kahn's Algorithm)
    const checkIfDAG = (nodes, edges) => {
        if (nodes.length === 0) return true;

        const adjList = {};
        const inDegree = {};

        // Initialize
        nodes.forEach((node) => {
            adjList[node.id] = [];
            inDegree[node.id] = 0;
        });

        // Build adjacency list and compute in-degrees
        edges.forEach((edge) => {
            if (adjList[edge.source]) {
                adjList[edge.source].push(edge.target);
            }
            if (inDegree[edge.target] !== undefined) {
                inDegree[edge.target] += 1;
            }
        });

        // Kahn's algorithm
        const queue = [];
        Object.keys(inDegree).forEach((nodeId) => {
            if (inDegree[nodeId] === 0) {
                queue.push(nodeId);
            }
        });

        let visited = 0;
        while (queue.length > 0) {
            const current = queue.shift();
            visited++;

            if (adjList[current]) {
                adjList[current].forEach((neighbor) => {
                    inDegree[neighbor] -= 1;
                    if (inDegree[neighbor] === 0) {
                        queue.push(neighbor);
                    }
                });
            }
        }

        return visited === nodes.length;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
