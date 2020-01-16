import React from 'react';

import { Container } from './styles';

export default function Developer({ dev }) {
  return (
    <Container>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div>
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no Github
      </a>
    </Container>
  );
}