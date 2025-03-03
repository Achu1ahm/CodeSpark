import React, { useState } from 'react';
import { useApp } from '../../context/store';
import { Concept } from '../../types';
import './style.css';

const ConceptCard: React.FC<{ concept: Concept }> = ({ concept }) => {
  const { navigateToDetail } = useApp();
  const [expanded, setExpanded] = useState(false);
  
  const handleClick = () => {
    setExpanded(!expanded);
  };
  
  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigateToDetail(concept.id);
  };

  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      "JavaScript": "yellow",
      "TypeScript": "blue",
      "Python": "green",
      "Java": "orange",
      "C#": "purple",
      "Ruby": "red",
      "Go": "cyan",
      "Rust": "amber",
      "Kotlin": "indigo",
      "Swift": "pink"
    };
    return colors[language] || "gray";
  };
  
  return (
    <div className="concept-card">
      <div className="concept-header" onClick={handleClick}>
        <h4 className="concept-title">{concept.title}</h4>
        <span className={`language-badge ${getLanguageColor(concept.language)}`}>
          {concept.language}
        </span>
      </div>
      
      {expanded && (
        <div className="concept-details">
          <p className="concept-description">{concept.description}</p>
          <button className="view-details-btn" onClick={handleViewDetails}>
            View Guide
          </button>
        </div>
      )}
    </div>
  );
};

const ConceptsList: React.FC = () => {
  const { concepts } = useApp();
  const [filter, setFilter] = useState<string>('all');
  
  const filteredConcepts = concepts.filter(concept => 
    filter === 'all' || concept.language === filter
  );

  const languages = ['all', ...Array.from(new Set(concepts.map(c => c.language)))];

  return (
    <div className="concepts-container">
      <div className="filter-buttons">
        {languages.map(lang => (
          <button
            key={lang}
            className={`filter-btn ${filter === lang ? 'active' : ''}`}
            onClick={() => setFilter(lang)}
          >
            {lang === 'all' ? 'All' : lang}
          </button>
        ))}
      </div>
      
      <div className="concepts-list">
        {filteredConcepts.length > 0 ? (
          filteredConcepts.map(concept => (
            <ConceptCard key={concept.id} concept={concept} />
          ))
        ) : (
          <p className="no-concepts">No concepts found for the selected filter.</p>
        )}
      </div>
    </div>
  );
};

export default ConceptsList;
