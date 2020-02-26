import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Developer({ dev, ...props }) {
  return (
    <Container {...props}>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div>
          <strong>{dev.name || dev.github_username}</strong>
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
    github_username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    techs: PropTypes.array.isRequired,
    bio: PropTypes.string,
  }),
};

Developer.defaultProps = {
  dev: {
    name: '',
    bio: '',
  },
};
