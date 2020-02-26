import React from 'react';
import { act, render, fireEvent } from '@testing-library/react';

import factory from '../utils/factories';
import Register from '~/components/Register';

describe('Register component', () => {
  it('should be able to create a developer', async () => {
    const { github_username, techs, latitude, longitude } = await factory.attrs(
      'Developer'
    );
    const submit = jest.fn();

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(success => {
        success({
          coords: {
            latitude,
            longitude,
          },
        });
      }),
    };

    let getByTestId;
    await act(async () => {
      const component = render(<Register onSubmit={submit} />);

      getByTestId = component.getByTestId;
    });

    fireEvent.change(getByTestId('github_username'), {
      target: {
        value: github_username,
      },
    });

    fireEvent.change(getByTestId('techs'), {
      target: {
        value: techs.join(', '),
      },
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(submit).toHaveBeenCalledWith({
      github_username,
      techs: techs.join(', '),
      latitude: latitude.toPrecision(9),
      longitude: longitude.toPrecision(9),
    });
  });
});
