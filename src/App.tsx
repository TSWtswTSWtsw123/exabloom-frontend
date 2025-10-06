import { useState, useCallback, MouseEvent } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Background,
  useReactFlow,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import CustomEdge from './CustomEdge';
import SettingsPanel from './SettingsPanel';
import IfElseNode from './IfElseNode';
import ContextMenu from './ContextMenu';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'output',
    data: { label: 'End' },
    position: { x: 800, y: 50 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = { ifElse: IfElseNode };

function Flow() {
  const { setNodes, setEdges, getNode, getEdge, project } = useReactFlow();
  const [nodes, localSetNodes] = useState<Node[]>(initialNodes);
  const [edges, localSetEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [menu, setMenu] = useState<{ top: number; left: number; edgeId: string; sourceId: string; targetId: string; } | null>(null);

  const onNodesChange: OnNodesChange = useCallback((changes: NodeChange[]) => {
    localSetNodes((nds) => applyNodeChanges(changes, nds));
  }, [localSetNodes]);

  const onEdgesChange: OnEdgesChange = useCallback((changes: EdgeChange[]) => {
    localSetEdges((eds) => applyEdgeChanges(changes, eds));
  }, [localSetEdges]);

  const onConnect: OnConnect = useCallback((connection) => {
    localSetEdges((eds) => addEdge({ ...connection, type: 'custom', data: { onAddNode: openContextMenu } }, eds));
  }, [localSetEdges]);

  const openContextMenu = useCallback((event: MouseEvent, edgeId: string, sourceId: string, targetId: string) => {
    event.preventDefault();
    const pane = (event.target as HTMLElement).closest('.react-flow__pane');
    if (!pane) return;
    const paneRect = pane.getBoundingClientRect();
    setMenu({
      top: event.clientY - paneRect.top,
      left: event.clientX - paneRect.left,
      edgeId,
      sourceId,
      targetId,
    });
  }, [setMenu]);

  const onSelectFromMenu = (nodeType: string) => {
    if (!menu) return;
    const { edgeId, sourceId, targetId } = menu;
    const sourceNode = getNode(sourceId);
    const targetNode = getNode(targetId);
    if (!sourceNode || !targetNode) return;

    const newId = uuidv4();
    let newNode: Node;

    if (nodeType === 'ifElse') {
      newNode = {
        id: newId,
        type: 'ifElse',
        position: {
          x: (sourceNode.position.x + targetNode.position.x) / 2,
          y: (sourceNode.position.y + targetNode.position.y) / 2 - 50,
        },
        data: { label: 'If/Else', branches: ['Branch 1'] },
      };
      const newEdge1 = { id: uuidv4(), source: sourceId, target: newId, type: 'custom', data: { onAddNode: openContextMenu } };
      const newEdge2 = { id: uuidv4(), source: newId, target: targetId, sourceHandle: 'branch-0', type: 'custom', data: { onAddNode: openContextMenu } };
      const newEdge3 = { id: uuidv4(), source: newId, target: targetId, sourceHandle: 'else', type: 'custom', data: { onAddNode: openContextMenu } };
      setEdges((eds) => eds.filter((e) => e.id !== edgeId).concat([newEdge1, newEdge2, newEdge3]));
    } else {
      newNode = {
        id: newId,
        position: {
          x: (sourceNode.position.x + targetNode.position.x) / 2,
          y: (sourceNode.position.y + targetNode.position.y) / 2,
        },
        data: { label: 'Action Node' },
      };
      const newEdge1 = { id: uuidv4(), source: sourceId, target: newId, type: 'custom', data: { onAddNode: openContextMenu } };
      const newEdge2 = { id: uuidv4(), source: newId, target: targetId, type: 'custom', data: { onAddNode: openContextMenu } };
      setEdges((eds) => eds.filter((e) => e.id !== edgeId).concat([newEdge1, newEdge2]));
    }

    setNodes((nds) => [...nds, newNode]);
    setMenu(null);
  };

  useState(() => {
    const initialEdge = { id: 'e1-2', source: '1', target: '2', type: 'custom', data: { onAddNode: openContextMenu } };
    localSetEdges([initialEdge]);
  });

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.type === 'input' || node.type === 'output') {
      setSelectedNode(null);
      return;
    }
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setMenu(null);
  }, []);

  const onNameChange = (name: string) => {
    if (selectedNode) {
      const newNode = { ...selectedNode, data: { ...selectedNode.data, label: name } };
      setNodes((nds) => nds.map((n) => (n.id === selectedNode.id ? newNode : n)));
      setSelectedNode(newNode);
    }
  };

  const onNodeDelete = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
    }
  };

  const onAddBranch = () => {
    if (selectedNode && selectedNode.type === 'ifElse') {
      const branches = selectedNode.data.branches || [];
      const newNode = { ...selectedNode, data: { ...selectedNode.data, branches: [...branches, `Branch ${branches.length + 1}`] } };
      setNodes((nds) => nds.map((n) => (n.id === selectedNode.id ? newNode : n)));
      setSelectedNode(newNode);
    }
  };

  const onBranchNameChange = (index: number, name: string) => {
    if (selectedNode && selectedNode.type === 'ifElse') {
      const branches = [...selectedNode.data.branches];
      branches[index] = name;
      const newNode = { ...selectedNode, data: { ...selectedNode.data, branches } };
      setNodes((nds) => nds.map((n) => (n.id === selectedNode.id ? newNode : n)));
      setSelectedNode(newNode);
    }
  };

  const edgeTypes = { custom: CustomEdge };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
      </ReactFlow>
      {menu && <ContextMenu {...menu} onSelect={onSelectFromMenu} />}
      {selectedNode && (
        <SettingsPanel
          node={selectedNode}
          onNameChange={onNameChange}
          onDelete={onNodeDelete}
          onAddBranch={onAddBranch}
          onBranchNameChange={onBranchNameChange}
        />
      )}
    </>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}

export default App;