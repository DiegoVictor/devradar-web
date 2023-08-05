import React from 'react';
import { render } from '@testing-library/react';

import { Developer } from '../../src/components/Developer';
import factory from '../utils/factory';

jest.mock('react-icons/fa', () => ({
  FaGithub: () => <div />,
}));

describe('Developer component', () => {
  it('should be able to show a developer data', async () => {
    const dev = await factory.attrs('Developer');
    const { getByAltText, getByText, getByTestId } = render(
      <Developer data={dev} />
    );

    expect(getByAltText(dev.name)).toHaveProperty('src', dev.avatar_url);
    expect(getByText(dev.name)).toBeInTheDocument();
    expect(getByText(dev.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId(`profile_${dev._id}`)).toHaveAttribute(
      'href',
      `https://github.com/${dev.github_username}`
    );
  });

  it('should be able to show a developer github username', async () => {
    const dev = await factory.attrs('Developer');
    delete dev.name;

    const { getByAltText, getByText, getByTestId } = render(
      <Developer data={dev} />
    );

    expect(getByAltText(dev.github_username)).toHaveProperty(
      'src',
      dev.avatar_url
    );
    expect(getByText(dev.github_username)).toBeInTheDocument();
    expect(getByText(dev.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId(`profile_${dev._id}`)).toHaveAttribute(
      'href',
      `https://github.com/${dev.github_username}`
    );
  });
});
