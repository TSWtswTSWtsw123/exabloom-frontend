import React from 'react';

interface ContextMenuProps {
  top: number;
  left: number;
  onSelect: (nodeType: string) => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ top, left, onSelect }) => {
  return (
    <div className="context-menu" style={{ top, left }}>
      <button onClick={() => onSelect('default')}>Action Node</button>
      <button onClick={() => onSelect('ifElse')}>If / Else Node</button>
    </div>
  );
};

export default ContextMenu;