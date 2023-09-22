import {Routes, Route, useNavigate  } from 'react-router-dom';

import Recognize from './components/recognize'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recognize />} />
  </Routes>
  );
}

export default App;
