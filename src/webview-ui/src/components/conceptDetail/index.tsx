import React from 'react';
import MarkdownRenderer from '../markdownRenderer';
import { useApp } from '../../context/store';
import LoadingSpinner from '../loader';
import './style.css';

const ConceptDetail: React.FC = () => {
  const { concepts, currentConceptId, navigateToList, isLoading } = useApp();
  
  const currentConcept = currentConceptId !== null 
    ? concepts.find(c => c.id === currentConceptId) 
    : null;
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!currentConcept) {
    return (
      <div className="not-found">
        <p>Concept not found</p>
        <button 
          className="back-to-list-button"
          onClick={navigateToList}
        >
          Back to List
        </button>
      </div>
    );
  }
  
  return (
    <div className="concept-detail-container">
      <button 
        className="back-button"
        onClick={navigateToList}
      >
       <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      width="20px"
      height="20px"
      fill="white"
    >
      <g>
        <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
      </g>
    </svg>
      </button>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{currentConcept.title}</h3>
        </div>
        <p className="card-description">{currentConcept.description}</p>
        <MarkdownRenderer content={currentConcept.content}/>
        
        {currentConcept.task && (
          <div className="task-container">
            <h4 className="step-title">Your Task</h4>
            <p className="task-text">{currentConcept.task}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptDetail;
