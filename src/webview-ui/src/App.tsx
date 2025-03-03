import React from "react";
import { AppProvider, useApp } from "./context/store";
import ConceptsList from "./components/conceptList";
import ConceptDetail from "./components/conceptDetail";
import LoadingSpinner from "./components/loader";
import "./App.css";

const AppRouter: React.FC = () => {
  const { currentView, isLoading, error } = useApp();

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error: {error}</p>
        <button
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading && currentView === 'list') {
    return <LoadingSpinner />;
  }

  switch (currentView) {
    case 'detail':
      return <ConceptDetail />;
    case 'list':  
    default:
      return <ConceptsList />;
  }
};

function App() {

  return (
    <AppProvider>
      <div className="app-container">
        <AppRouter />
      </div>
    </AppProvider>
  );
}

export default App;
