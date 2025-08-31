import React, { useState, useEffect } from 'react';
import ResourceTracker from './components/ResourceTracker';
import AddResourceForm from './components/AddResourceForm';
import { Resource } from './types';
import './App.css';

// Default resources for player mode
const defaultPlayerResources: Resource[] = [
  {
    id: 'hope',
    name: 'Hope',
    current: 3,
    max: 6,
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
    current: 6,
    max: 6,
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

// Default resources for gamemaster mode
const defaultGamemasterResources: Resource[] = [
  {
    id: 'fear',
    name: 'Fear',
    current: 0,
    max: 12,
    color: '#8e44ad'
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
  const [isConfigMode, setIsConfigMode] = useState(false);

  // Save to localStorage whenever resources change
  useEffect(() => {
    localStorage.setItem(`daggerheart-resources-${gameMode}`, JSON.stringify(resources));
  }, [resources, gameMode]);

  // Reset resources when gameMode changes
  useEffect(() => {
    setResources(getInitialResources(gameMode));
  }, [gameMode]);

  // Update body class for background colors
  useEffect(() => {
    const body = document.body;
    body.className = `${gameMode}-${isConfigMode ? 'config' : 'standard'}`;
  }, [gameMode, isConfigMode]);

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
              current: Math.min(resource.current, newMax)
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
        <div className="header-content">
          <img src="public/daggerheart-logo.png" alt="Daggerheart" className="daggerheart-logo" />
          <h1>Daggerheart Tracker</h1>
        </div>
        <button onClick={toggleConfigMode} className="config-btn" title="Config Modus">
          <svg className="gear-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.04 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
          </svg>
        </button>
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
          {isConfigMode && (
            <button 
              className="reset-btn"
              onClick={handleResetAll}
            >
              Zurücksetzen
            </button>
          )}
        </div>

        <div className="resources-grid">
          {resources.map(resource => (
            <div key={resource.id} className="resource-container">
              <ResourceTracker
                resource={resource}
                onUpdate={handleUpdateResource}
                onUpdateMax={handleUpdateMax}
                onUpdateName={handleUpdateName}
                isConfigMode={isConfigMode}
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
        
        <div className="mode-toggles">
          {isConfigMode && (
            <button 
              className="game-mode-toggle"
              onClick={toggleGameMode}
              title={`Wechseln zu ${gameMode === 'player' ? 'Spielleiter' : 'Spieler'} Modus`}
            >
              <span className="toggle-label">
                {gameMode === 'player' ? 'Spieler' : 'Spielleiter'}
              </span>
              <span className="toggle-icon">
                {gameMode === 'player' ? '🎭' : '⚔️'}
              </span>
            </button>
          )}
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
