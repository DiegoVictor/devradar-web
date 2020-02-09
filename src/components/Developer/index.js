import React from 'react';
import PropTypes from 'prop-types';

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
      <a
        data-testid="profile"
        href={`https://github.com/${dev.github_username}`}
      >
        Acessar perfil no Github
      </a>
    </Container>
  );
}

Developer.propTypes = {
  dev: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    techs: PropTypes.array.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};
