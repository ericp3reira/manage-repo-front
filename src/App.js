import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

const App = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      url: 'https://github.com/ericp3reira',
      title: `Resolvendo o desafio ReactJS ${Date.now()}`,
      techs: ['React', 'Node.js'],
    });

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <span>{repository.title}</span>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
};

export default App;
