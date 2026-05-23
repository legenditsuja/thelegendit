import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import SmoothScroll from './components/SmoothScroll/SmoothScroll';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <SmoothScroll>
          <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-black dark:text-white transition-colors duration-300">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </ThemeProvider>
  );
};

export default App;

