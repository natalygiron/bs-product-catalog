import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term.trim());
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Buscar productos..."
                style={{
                    padding: '8px',
                    width: '300px',
                    maxWidth: '400px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
        </form>
    );
};

export default SearchBar;