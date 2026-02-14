import * as React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Timeline from './Timeline';
import Contact from './Contact';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface PortfolioProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <div className="min-h-screen relative bg-background-light dark:bg-background-dark">
            <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <div id="hero"><Hero /></div>
            <div id="about"><About /></div>
            <div id="skills"><Skills /></div>
            <div id="projects"><Projects /></div>
            <div id="experience"><Timeline /></div>
            <div id="contact"><Contact /></div>
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Portfolio;
