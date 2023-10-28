import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PatientsList from './components/PatientsList';
// import PatientDetails from '../components/PatientDetails';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<PatientsList />} />
          {/* <Route path='/patient/:id' component={PatientDetails} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
