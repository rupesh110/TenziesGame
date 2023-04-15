import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

function Main() {
  return (
    <div>
      <App />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);