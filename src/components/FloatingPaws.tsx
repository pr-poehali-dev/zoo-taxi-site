import React from 'react';

const FloatingPaws = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div 
        className="absolute text-4xl opacity-0"
        style={{ 
          animation: 'float-up-left 20s ease-in-out infinite',
          animationDelay: '0s'
        }}
      >
        🐾
      </div>
      <div 
        className="absolute text-4xl opacity-0"
        style={{ 
          animation: 'float-up-right 22s ease-in-out infinite',
          animationDelay: '5s'
        }}
      >
        🐾
      </div>
      <div 
        className="absolute text-3xl opacity-0"
        style={{ 
          animation: 'float-up-left 25s ease-in-out infinite',
          animationDelay: '10s'
        }}
      >
        🐾
      </div>
      <div 
        className="absolute text-3xl opacity-0"
        style={{ 
          animation: 'float-up-right 23s ease-in-out infinite',
          animationDelay: '15s'
        }}
      >
        🐾
      </div>
      <div 
        className="absolute text-5xl opacity-0"
        style={{ 
          animation: 'float-diagonal 30s linear infinite',
          animationDelay: '8s'
        }}
      >
        🐾
      </div>
      <div 
        className="absolute text-4xl opacity-0"
        style={{ 
          animation: 'float-diagonal 28s linear infinite',
          animationDelay: '18s'
        }}
      >
        🐾
      </div>
    </div>
  );
};

export default FloatingPaws;
