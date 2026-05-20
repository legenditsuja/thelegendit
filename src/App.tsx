import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';

const App: React.FC = () => {
  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;

