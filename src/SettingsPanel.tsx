import React from 'react';
import { Node } from 'reactflow';

interface SettingsPanelProps {
  node: Node;
  onNameChange: (name: string) => void;
  onDelete: () => void;
  onAddBranch?: () => void;
  onBranchNameChange?: (index: number, name: string) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  node, 
  onNameChange, 
  onDelete, 
  onAddBranch, 
  onBranchNameChange 
}) => {
  return (
    <div className="settings-panel">
      <h3>Edit Node</h3>
      <label>Label:</label>
      <input
        type="text"
        value={node.data.label}
        onChange={(e) => onNameChange(e.target.value)}
      />

      {node.type === 'ifElse' && onAddBranch && onBranchNameChange && (
        <>
          <h4 style={{ marginTop: '15px' }}>Branches</h4>
          {node.data.branches.map((branch: string, index: number) => (
            <div key={index}>
              <label>Branch {index + 1}:</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => onBranchNameChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={onAddBranch} style={{ marginTop: '10px' }}>
            Add Branch
          </button>
        </>
      )}

      <button onClick={onDelete} style={{ marginTop: '10px', background: '#ff4d4d', color: 'white' }}>
        Delete Node
      </button>
    </div>
  );
};

export default SettingsPanel;