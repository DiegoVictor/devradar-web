import React from 'react';
import PropTypes from 'prop-types';

import { GoMarkGithub } from 'react-icons/go';
import { Container, Avatar, Description } from './styles';

export default function Developer({ dev, ...props }) {
  return (
    <Container {...props}>
      <Avatar data-testid="avatar">
        <img src={dev.avatar_url} alt={dev.name} />
      </Avatar>
      <Description>
        <div style={{ padding: '5px' }}>
          <strong>{dev.name || dev.github_username}</strong>

          <span>{dev.techs.join(', ')}</span>
        </div>

        <a
          href={`https://github.com/${dev.github_username}`}
          rel="noreferrer"
          target="_blank"
        >
          <GoMarkGithub size="17" />
          GitHub
        </a>
      </Description>
    </Container>
  );
}

Developer.propTypes = {
  dev: PropTypes.shape({
    github_username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    techs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

Developer.defaultProps = {
  dev: {
    name: '',
  },
};
