import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const IfElseNode: React.FC<NodeProps> = ({ data }) => {
  const branches = data.branches || [];

  return (
    <div style={{ border: '1px solid #777', padding: '10px', background: '#eee' }}>
      <div>
        <strong>{data.label || 'If/Else'}</strong>
      </div>
      <Handle type="target" position={Position.Top} />
      {branches.map((branch: string, index: number) => (
        <div key={index} style={{ marginTop: '10px', position: 'relative' }}>
          <span style={{ fontSize: '12px' }}>{branch}</span>
          <Handle
            type="source"
            position={Position.Right}
            id={`branch-${index}`}
            style={{ top: `${(index + 1) * 20}px`, background: '#555' }}
          />
        </div>
      ))}
      <div style={{ marginTop: '10px', position: 'relative' }}>
        <span style={{ fontSize: '12px' }}>Else</span>
        <Handle
          type="source"
          position={Position.Right}
          id="else"
          style={{ bottom: '-5px', top: 'auto', background: '#555' }}
        />
      </div>
    </div>
  );
};

export default memo(IfElseNode);