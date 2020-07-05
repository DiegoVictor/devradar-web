import React from 'react';
import { render } from '@testing-library/react';

import Developer from '~/components/Developer';
import factory from '../../utils/factory';

describe('Developer component', () => {
  it('should be able to show a developer data', async () => {
    const dev = await factory.attrs('Developer');
    const { getByAltText, getByText, getByTestId } = render(
      <Developer dev={dev} />
    );

    expect(getByAltText(dev.name)).toHaveProperty('src', dev.avatar_url);
    expect(getByText(dev.name)).toBeInTheDocument();
    expect(getByText(dev.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId('profile')).toHaveAttribute(
      'href',
      `https://github.com/${dev.github_username}`
    );
  });
});
