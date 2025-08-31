import React, { useState, useEffect } from 'react';
import ResourceTracker from './components/ResourceTracker';
import AddResourceForm from './components/AddResourceForm';
import { Resource } from './types';
import './App.css';

const defaultPlayerResources: Resource[] = [
  {
    id: 'hope',
    name: 'Hope',
    current: 3,
    max: 3,
    color: '#f39c12'
  },
  {
    id: 'armor',
    name: 'Armor',
    current: 0,
    max: 0,
    color: '#3498db'
  },
  {
    id: 'hitpoints',
    name: 'Hitpoints',
    current: 20,
    max: 20,
    color: '#e74c3c'
  },
  {
    id: 'stress',
    name: 'Stress',
    current: 0,
    max: 10,
    color: '#9b59b6'
  }
];

const defaultGamemasterResources: Resource[] = [
  {
    id: 'fear',
    name: 'Fear',
    current: 0,
    max: 12,
    color: '#8e44ad'
  },
  {
    id: 'countdown-1',
    name: 'Countdown 1',
    current: 0,
    max: 6,
    color: '#f1c40f'
  }
];

function App() {
  const [gameMode, setGameMode] = useState<'player' | 'gamemaster'>('player');
  
  const getInitialResources = (mode: 'player' | 'gamemaster') => {
    const saved = localStorage.getItem(`daggerheart-resources-${mode}`);
    if (saved) {
      return JSON.parse(saved);
    } else {
      return mode === 'player' ? defaultPlayerResources : defaultGamemasterResources;
    }
  };

  const [resources, setResources] = useState<Resource[]>(() => getInitialResources(gameMode));
  const [showAddForm, setShowAddForm] = useState(false);
  const [isConfigMode, setIsConfigMode] = useState(false); // New state for config mode

  // Save to localStorage whenever resources change
  useEffect(() => {
    localStorage.setItem(`daggerheart-resources-${gameMode}`, JSON.stringify(resources));
  }, [resources, gameMode]);

  // Reset resources when gameMode changes
  useEffect(() => {
    setResources(getInitialResources(gameMode));
  }, [gameMode]);

  const handleUpdateResource = (resourceId: string, newCurrent: number) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, current: newCurrent }
          : resource
      )
    );
  };

  const handleUpdateMax = (resourceId: string, newMax: number) => {
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { 
              ...resource, 
              max: newMax,
              current: Math.min(resource.current, newMax) // Ensure current doesn't exceed new max
            }
          : resource
      )
    );
  };
  
  const handleUpdateName = (resourceId: string, newName: string) => {
    setResources(prev =>
      prev.map(resource =>
        resource.id === resourceId
          ? { ...resource, name: newName }
          : resource
      )
    );
  };

  const handleAddResource = (newResource: Omit<Resource, 'id'>) => {
    const resource: Resource = {
      ...newResource,
      id: `custom-${Date.now()}`
    };
    setResources(prev => [...prev, resource]);
  };

  const handleRemoveResource = (resourceId: string) => {
    setResources(prev => prev.filter(resource => resource.id !== resourceId));
  };

  const handleResetAll = () => {
    if (window.confirm('Möchten Sie alle Ressourcen auf ihre Standardwerte zurücksetzen?')) {
      setResources(gameMode === 'player' ? defaultPlayerResources : defaultGamemasterResources);
    }
  };

  const toggleConfigMode = () => {
    setIsConfigMode(prev => !prev);
  };

  const toggleGameMode = () => {
    setGameMode(prev => (prev === 'player' ? 'gamemaster' : 'player'));
  };

  const currentDefaultResources = gameMode === 'player' ? defaultPlayerResources : defaultGamemasterResources;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Daggerheart Tracker</h1>
        <p>Verfolge deine Ressourcen im Abenteuer</p>
        <div className="mode-toggles">
          <button onClick={toggleConfigMode}>
            {isConfigMode ? 'Standard Modus' : 'Config Modus'}
          </button>
          <button onClick={toggleGameMode}>
            {gameMode === 'player' ? 'Spielleiter Modus' : 'Spieler Modus'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="controls">
          {isConfigMode && (
            <button 
              className="add-resource-btn"
              onClick={() => setShowAddForm(true)}
            >
              + Neue Ressource
            </button>
          )}
          <button 
            className="reset-btn"
            onClick={handleResetAll}
          >
            Zurücksetzen
          </button>
        </div>

        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource.id} className="resource-container">
              <ResourceTracker
                resource={resource}
                onUpdate={handleUpdateResource}
                onUpdateMax={handleUpdateMax}
                onUpdateName={handleUpdateName} // Pass new handler
                isConfigMode={isConfigMode} // Pass config mode state
              />
              {isConfigMode && !currentDefaultResources.find(dr => dr.id === resource.id) && (
                <button
                  className="remove-resource-btn"
                  onClick={() => handleRemoveResource(resource.id)}
                  title="Ressource entfernen"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {isConfigMode && showAddForm && (
        <AddResourceForm
          onAddResource={handleAddResource}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default App;
