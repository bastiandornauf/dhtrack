import React, { useState } from 'react';
import { Resource } from '../types';
import './AddResourceForm.css';
import { useI18n } from '../i18n';

interface AddResourceFormProps {
  onAddResource: (resource: Omit<Resource, 'id'>) => void;
  onClose: () => void;
}

const AddResourceForm: React.FC<AddResourceFormProps> = ({ onAddResource, onClose }) => {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [current, setCurrent] = useState(0);
  const [max, setMax] = useState(10);
  const [color, setColor] = useState('#3498db');

  const predefinedColors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', 
    '#9b59b6', '#1abc9c', '#e67e22', '#34495e',
    '#d35400', '#8e44ad', '#16a085', '#c0392b'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddResource({
        name: name.trim(),
        current,
        max,
        color
      });
      onClose();
    }
  };

  return (
    <div className="add-resource-overlay">
      <div className="add-resource-modal">
        <div className="modal-header">
          <h2>{t('formTitleAddResource')}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-resource-form">
          <div className="form-group">
            <label htmlFor="resource-name">{t('formName')}</label>
            <input
              id="resource-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('formNamePlaceholder')}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="resource-current">{t('formCurrent')}</label>
              <input
                id="resource-current"
                type="number"
                value={current}
                onChange={(e) => setCurrent(parseInt(e.target.value) || 0)}
                min="0"
                max={max}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="resource-max">{t('formMax')}</label>
              <input
                id="resource-max"
                type="number"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                min="1"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>{t('formColor')}</label>
            <div className="color-picker">
              {predefinedColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              {t('formCancel')}
            </button>
            <button type="submit" className="btn-primary">
              {t('formSubmit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResourceForm;
