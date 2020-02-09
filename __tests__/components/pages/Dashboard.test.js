import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import faker from 'faker';

import Dashboard from '~/components/pages/Dashboard';
import factory from '../../utils/factories';
import api from '~/services/api';

const api_mock = new MockAdapter(api);
const latitude = faker.address.latitude();
const longitude = faker.address.longitude();

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

describe('Dashboard page', () => {
  it('should be able to show a list of developers', async () => {
    const developers = await factory.attrsMany('Developer', 3);
    let getByTestId;

    api_mock.onGet('developers').reply(200, developers);

    await act(async () => {
      const component = render(<Dashboard />);
      getByTestId = component.getByTestId;
    });

    developers.forEach(dev => {
      expect(getByTestId(`developer_${dev._id}`)).toBeInTheDocument();
    });
  });

  it('should be able to create new developers', async () => {
    const developer = await factory.attrs('Developer');
    let getByTestId;

    api_mock.onGet('developers').reply(200, []);
    api_mock.onPost('developers').reply(200, developer);

    await act(async () => {
      const component = render(<Dashboard />);
      getByTestId = component.getByTestId;
    });

    fireEvent.change(getByTestId('github_username'), {
      target: {
        value: developer.github_username,
      },
    });

    fireEvent.change(getByTestId('techs'), {
      target: {
        value: developer.techs.join(', '),
      },
    });

    await act(async () => {
      fireEvent.click(getByTestId('submit'));
    });

    expect(getByTestId(`developer_${developer._id}`)).toBeInTheDocument();
  });
});
