import React from 'react';
import PropTypes from 'prop-types';

import { FaGithub } from 'react-icons/fa';
import { Container, Avatar, Description } from './styles';

export function Developer({ data, ...props }) {
  return (
    <Container {...props}>
      <Avatar data-testid="avatar">
        <img src={data.avatar_url} alt={data.name || data.github_username} />
      </Avatar>
      <Description>
        <div style={{ padding: '5px' }}>
          <strong>{data.name || data.github_username}</strong>

          <span>{data.techs.join(', ')}</span>
        </div>

        <a
          href={`https://github.com/${data.github_username}`}
          rel="noopener noreferrer"
          target="_blank"
          data-testid={`profile_${data._id}`}
        >
          <FaGithub size="17" />
          GitHub
        </a>
      </Description>
    </Container>
  );
}

Developer.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    github_username: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string,
    techs: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

Developer.defaultProps = {
  data: {
    name: '',
  },
};
