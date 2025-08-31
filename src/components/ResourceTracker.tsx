import React from 'react';
import { Resource } from '../types';
import './ResourceTracker.css';

interface ResourceTrackerProps {
  resource: Resource;
  onUpdate: (resourceId: string, newCurrent: number) => void;
  onUpdateMax: (resourceId: string, newMax: number) => void;
  onUpdateName: (resourceId: string, newName: string) => void; // New prop for renaming
  isConfigMode: boolean; // New prop for config mode
}

const ResourceTracker: React.FC<ResourceTrackerProps> = ({
  resource,
  onUpdate,
  onUpdateMax,
  onUpdateName,
  isConfigMode
}) => {
  const handleIncrement = () => {
    if (resource.current < resource.max) {
      onUpdate(resource.id, resource.current + 1);
    }
  };

  const handleDecrement = () => {
    if (resource.current > 0) {
      onUpdate(resource.id, resource.current - 1);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value) || 0;
    onUpdateMax(resource.id, newMax);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateName(resource.id, e.target.value);
  };

  const percentage = resource.max > 0 ? (resource.current / resource.max) * 100 : 0;

  return (
    <div className="resource-tracker" style={{ borderColor: resource.color }}>
      <div className="resource-header">
        {isConfigMode ? (
          <input
            type="text"
            className="resource-name-input"
            value={resource.name}
            onChange={handleNameChange}
          />
        ) : (
          <h3 className="resource-name">{resource.name}</h3>
        )}
        <div className="resource-values">
          <span className="current-value">{resource.current}</span>
          <span className="separator">/</span>
          {isConfigMode ? (
            <input
              type="number"
              className="max-value-input"
              value={resource.max}
              onChange={handleMaxChange}
              min="0"
            />
          ) : (
            <span className="max-value">{resource.max}</span>
          )}
        </div>
      </div>
      
      <div className="resource-bar">
        <div 
          className="resource-fill"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: resource.color
          }}
        />
      </div>
      
      <div className="resource-controls">
        <button 
          className="control-btn decrement"
          onClick={handleDecrement}
          disabled={resource.current <= 0}
        >
          -
        </button>
        <button 
          className="control-btn increment"
          onClick={handleIncrement}
          disabled={resource.current >= resource.max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ResourceTracker;
