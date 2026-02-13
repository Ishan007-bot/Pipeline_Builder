// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

// Connection validation rules
const isValidConnection = (connection, nodes, edges) => {
  const { source, target, sourceHandle, targetHandle } = connection;

  // Prevent self-loops
  if (source === target) {
    return { valid: false, reason: 'Cannot connect a node to itself' };
  }

  // Prevent duplicate edges
  const isDuplicate = edges.some(
    (edge) =>
      edge.source === source &&
      edge.target === target &&
      edge.sourceHandle === sourceHandle &&
      edge.targetHandle === targetHandle
  );
  if (isDuplicate) {
    return { valid: false, reason: 'Connection already exists' };
  }

  // Get node types
  const sourceNode = nodes.find((n) => n.id === source);
  const targetNode = nodes.find((n) => n.id === target);

  if (!sourceNode || !targetNode) {
    return { valid: false, reason: 'Invalid nodes' };
  }

  // Prevent output-to-output or input-to-input connections
  // (This is already handled by React Flow handle types, but good to be explicit)

  return { valid: true };
};

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    const validation = isValidConnection(connection, get().nodes, get().edges);

    if (!validation.valid) {
      // Import showToast dynamically to avoid circular dependency
      import('./toast').then(({ showToast }) => {
        showToast(validation.reason, 'warning');
      });
      return;
    }

    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
      }, get().edges),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  deleteSelectedNodes: () => {
    const selectedNodes = get().nodes.filter((node) => node.selected);
    if (selectedNodes.length === 0) return;

    const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));

    set({
      nodes: get().nodes.filter((node) => !node.selected),
      edges: get().edges.filter(
        (edge) => !selectedNodeIds.has(edge.source) && !selectedNodeIds.has(edge.target)
      ),
    });

    import('./toast').then(({ showToast }) => {
      showToast(
        `Deleted ${selectedNodes.length} node${selectedNodes.length > 1 ? 's' : ''}`,
        'success'
      );
    });
  },
}));
