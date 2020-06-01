import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { GoMarkGithub } from 'react-icons/go';
import { Container, Avatar, Description } from './styles';

export default function Developer({ dev, ...props }) {
  const [show_description, setShowDescription] = useState(false);

  return (
    <Container {...props}>
      <Avatar onClick={() => setShowDescription(!show_description)}>
        <img src={dev.avatar_url} alt={dev.name} />
      </Avatar>
      <Description show={show_description}>
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
