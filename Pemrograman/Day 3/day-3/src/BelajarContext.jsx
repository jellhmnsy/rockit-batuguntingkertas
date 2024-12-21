import React, { createContext, useState, useContext} from "react";
import {Sun, Moon} from 'lucide-react';

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    }

    const value = {
        isDark,
        toggleTheme
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

const ThemeToggle = () => {
    const {isDark, toggleTheme} = useTheme();
    return (
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100">
            {isDark ? <Sun size={20} /> : <Moon size={20

            } />}
        </button>
    )
}

const Card = () => {
    const {isDark} = useTheme();
    return (
        <div className={`p-4 rounded -lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="text-lg font-bold mb-2">Hello Context!</h2>
            <p>Belajar Context API dan Custom Hooks</p>
        </div>
    )
}

const App = () => {
    return (
        <ThemeProvider>
            <div className="max-w-md mx-auto p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold">Theme Context Demo</h1>
                    <ThemeToggle />
                </div>
                <Card />    
            </div>
        </ThemeProvider>
    )
}

export default App;