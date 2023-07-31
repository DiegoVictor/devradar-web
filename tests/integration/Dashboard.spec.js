import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';
import { toast } from 'react-toastify';

import factory from '../utils/factory';
import api from '~/services/api';
import { Dashboard } from '~/pages/Dashboard';
import {
  connect,
  disconnect,
  events,
  socket,
} from '../../mocks/socket.io-client';

jest.mock('react-toastify');
jest.mock('google-map-react', () => {
  return {
    __esModule: true,
    default: ({ children, onChange }) => {
      return (
        <div data-testid="map" onClick={e => onChange(e)}>
          {children}
        </div>
      );
    },
  };
});

describe('Dashboard page', () => {
  const apiMock = new MockAdapter(api);
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_URL}?action=`;

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to click on sign in and sign up button', async () => {
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('signin')).toHaveAttribute('href', `${url}signin`);
    expect(getByTestId('signup')).toHaveAttribute('href', `${url}signup`);
  });

  it('should be able to update developer', async () => {
    const token = faker.random.alphaNumeric(32);
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    jest.useFakeTimers();

    const developer = await factory.attrs('Developer');
    const newDeveloperData = await factory.attrs('Developer');

    apiMock.onPut('/developers').reply(200);
    localStorage.setItem(
      'devradar',
      JSON.stringify({
        ...developer,
        token,
      })
    );

    let getByTestId;
    let getByAltText;
    let getByPlaceholderText;
    await act(async () => {
      const component = render(<Dashboard />);

      getByTestId = component.getByTestId;
      getByAltText = component.getByAltText;
      getByPlaceholderText = component.getByPlaceholderText;
    });

    expect(getByTestId('avatar')).toBeInTheDocument();
    expect(getByAltText(developer.name)).toHaveAttribute(
      'src',
      developer.avatar_url
    );

    await act(async () => {
      fireEvent.click(getByTestId('avatar'));
    });

    fireEvent.change(getByPlaceholderText('Techs'), {
      target: { value: newDeveloperData.techs.join(', ') },
    });
    fireEvent.change(getByPlaceholderText('Latitude'), {
      target: { value: latitude },
    });
    fireEvent.change(getByPlaceholderText('Longitude'), {
      target: { value: longitude },
    });

    await act(async () => {
      fireEvent.click(getByTestId('update'));
    });

    expect(localStorage.getItem('devradar')).toStrictEqual(
      JSON.stringify({
        ...developer,
        techs: newDeveloperData.techs.join(', '),
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        token,
      })
    );
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(toast).toHaveBeenCalledWith(
      'Your profile was updated successfully!'
    );
  });

  it('should be able to logout', async () => {
    const developer = await factory.attrs('Developer');
    const token = faker.random.alphaNumeric(32);
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    localStorage.setItem(
      'devradar',
      JSON.stringify({
        ...developer,
        token,
      })
    );

    let getByTestId;
    let queryByTestId;
    await act(async () => {
      const component = render(<Dashboard />);
      getByTestId = component.getByTestId;
      queryByTestId = component.queryByTestId;
    });

    await act(async () => {
      fireEvent.click(getByTestId('logout'));
    });

    expect({ ...localStorage.__STORE }).toStrictEqual({});
    expect(queryByTestId('avatar')).toBeFalsy();
    expect(getByTestId('signin')).toHaveAttribute('href', `${url}signin`);
    expect(getByTestId('signup')).toHaveAttribute('href', `${url}signup`);
  });

  it('should be able to signup', async () => {
    const { _id, avatar_url } = await factory.attrs('Developer');
    const token = faker.random.alphaNumeric(32);
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    const success = jest.spyOn(toast, 'success');
    const pushState = jest.fn();

    global.history.pushState = pushState;
    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signup';
        }
        return faker.random.alphaNumeric(20);
      };
    };

    apiMock.onPost('/developers').reply(200, {
      developer: { _id, avatar_url },
      token,
    });

    expect(localStorage.getItem('devradar')).toBe(null);

    const { getByTestId, getByPlaceholderText } = render(<Dashboard />);

    const techs = faker.random.word();
    fireEvent.change(getByPlaceholderText('Techs'), {
      target: {
        value: techs,
      },
    });

    await act(async () => {
      fireEvent.click(getByTestId('signup-submit'));
    });

    expect(success).toHaveBeenCalledWith('Welcome to DevRadar!');
    expect(localStorage.getItem('devradar')).toEqual(
      JSON.stringify({
        _id,
        avatar_url,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        techs,
        token,
      })
    );
    expect(pushState).toHaveBeenCalledWith({}, '', 'http://localhost/');
  });

  it('should not be able to signup with invalid data', async () => {
    const { _id, avatar_url } = await factory.attrs('Developer');
    const token = faker.random.alphaNumeric(32);
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(success => {
        success({
          coords: {},
        });
      }),
    };

    const success = jest.spyOn(toast, 'success');
    const pushState = jest.fn();

    global.history.pushState = pushState;
    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signup';
        }
        return faker.random.alphaNumeric(20);
      };
    };

    apiMock.onPost('/developers').reply(200, {
      developer: { _id, avatar_url },
      token,
    });

    expect(localStorage.getItem('devradar')).toBe(null);

    const { getByTestId, getByText, getAllByText } = render(<Dashboard />);

    await act(async () => {
      fireEvent.click(getByTestId('signup-submit'));
    });

    expect(success).not.toHaveBeenCalled();
    expect(localStorage.getItem('devradar')).toBe(null);
    expect(pushState).not.toHaveBeenCalled();
    expect(getByText('Techs ares required')).toBeInTheDocument();
    expect(getAllByText('Must be number').length).toBe(2);
  });

  it('should not be able to signup with network error', async () => {
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    const success = jest.spyOn(toast, 'success');
    const error = jest.spyOn(toast, 'error');
    const pushState = jest.fn();

    global.history.pushState = pushState;
    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signup';
        }
        return faker.random.alphaNumeric(20);
      };
    };

    apiMock.onPost('/developers').reply(400);

    expect(localStorage.getItem('devradar')).toBe(null);

    const { getByTestId, getByPlaceholderText } = render(<Dashboard />);

    const techs = faker.random.word();
    fireEvent.change(getByPlaceholderText('Techs'), {
      target: {
        value: techs,
      },
    });

    await act(async () => {
      fireEvent.click(getByTestId('signup-submit'));
    });

    expect(success).not.toHaveBeenCalled();
    expect(localStorage.getItem('devradar')).toBe(null);
    expect(pushState).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(
      'Oops! Looks like something goes wrong!'
    );
  });

  it('should not be able to signup without github code', async () => {
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    const success = jest.spyOn(toast, 'success');
    const error = jest.spyOn(toast, 'error');
    const pushState = jest.fn();

    global.history.pushState = pushState;
    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signup';
        }
        return null;
      };
    };

    expect(localStorage.getItem('devradar')).toBe(null);

    const { getByTestId } = render(<Dashboard />);

    await act(async () => {
      fireEvent.click(getByTestId('signup-submit'));
    });

    expect(success).not.toHaveBeenCalled();
    expect(localStorage.getItem('devradar')).toBe(null);
    expect(pushState).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith("Missing GitHub's code");
  });

  it('should be able to signin', async () => {
    const { _id, avatar_url, techs } = await factory.attrs('Developer');
    const token = faker.random.alphaNumeric(20);
    const latitude = faker.address.latitude();
    const longitude = faker.address.longitude();

    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signin';
        }
        return faker.random.alphaNumeric(20);
      };
    };

    apiMock.onPost('/sessions').reply(200, {
      developer: {
        _id,
        avatar_url,
        techs,
        location: {
          coordinates: [longitude, latitude],
        },
      },
      token,
    });

    const pushState = jest.fn();
    global.history.pushState = pushState;

    expect(localStorage.getItem('devradar')).toBe(null);

    await act(async () => {
      render(<Dashboard />);
    });

    expect(localStorage.getItem('devradar')).toBe(
      JSON.stringify({
        _id,
        avatar_url,
        techs: techs.join(', '),
        latitude,
        longitude,
        token,
      })
    );
    expect(pushState).toHaveBeenCalledWith({}, '', 'http://localhost/');
  });

  it('should not be able to signin with network error', async () => {
    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signin';
        }
        return faker.random.alphaNumeric(20);
      };
    };

    apiMock.onPost('/sessions').reply(400);

    const error = jest.spyOn(toast, 'error');
    const pushState = jest.fn();
    global.history.pushState = pushState;

    expect(localStorage.getItem('devradar')).toBe(null);

    await act(async () => {
      render(<Dashboard />);
    });

    expect(localStorage.getItem('devradar')).toBe(null);
    expect(pushState).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(
      'Oops! Looks like something goes wrong!'
    );
  });

  it('should be able to search', async () => {
    const developers = await factory.attrsMany('Developer', 3);
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    apiMock.onGet('/search').reply(
      200,
      developers.map(developer => ({
        ...developer,
        location: {
          coordinates: [developer.longitude, developer.latitude],
        },
      }))
    );

    connect.mockClear();

    const {
      getByPlaceholderText,
      getByAltText,
      getByText,
      getByTestId,
    } = render(<Dashboard />);

    const search = faker.random.word();
    fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: search,
      },
    });

    await act(async () => {
      fireEvent.keyUp(getByPlaceholderText('Search'), {
        keyCode: 13,
      });
    });

    await act(async () => {
      const [{ name }] = developers;
      expect(getByAltText(name)).toBeInTheDocument();
    });

    expect(disconnect).toHaveBeenCalled();
    expect(connect).toHaveBeenCalled();

    expect(socket.io.opts.query).toStrictEqual({
      latitude,
      longitude,
      techs: search,
    });

    developers.forEach(developer => {
      expect(getByAltText(developer.name)).toHaveProperty(
        'src',
        developer.avatar_url
      );
      expect(getByText(developer.name)).toBeInTheDocument();
      expect(getByText(developer.techs.join(', '))).toBeInTheDocument();
      expect(getByTestId(`profile_${developer._id}`)).toHaveProperty(
        'href',
        `https://github.com/${developer.github_username}`
      );
    });
  });

  it('should be able to search after expand search bar', async () => {
    const developer = await factory.attrs('Developer');
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    apiMock.onGet('/search').reply(200, [
      {
        ...developer,
        location: {
          coordinates: [developer.longitude, developer.latitude],
        },
      },
    ]);

    global.URLSearchParams = function URLSearchParams() {
      this.get = param => {
        if (param === 'action') {
          return 'signup';
        }
        return faker.random.alphaNumeric(20);
      };
    };

    const {
      getByPlaceholderText,
      getByAltText,
      getByText,
      getByTestId,
    } = render(<Dashboard />);

    await act(async () => {
      fireEvent.click(getByTestId('search'));
    });

    const search = faker.random.word();
    fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: search,
      },
    });

    await act(async () => {
      fireEvent.keyUp(getByPlaceholderText('Search'), {
        keyCode: 13,
      });
    });

    await act(async () => {
      const { name } = developer;
      expect(getByAltText(name)).toBeInTheDocument();
    });

    expect(disconnect).toHaveBeenCalled();
    expect(connect).toHaveBeenCalled();

    expect(socket.io.opts.query).toStrictEqual({
      latitude,
      longitude,
      techs: search,
    });

    expect(getByAltText(developer.name)).toHaveProperty(
      'src',
      developer.avatar_url
    );
    expect(getByText(developer.name)).toBeInTheDocument();
    expect(getByText(developer.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId(`profile_${developer._id}`)).toHaveProperty(
      'href',
      `https://github.com/${developer.github_username}`
    );
  });

  it('should be able to search after change map center position', async () => {
    const developer = await factory.attrs('Developer');
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    apiMock.reset();

    const search = faker.random.word();
    apiMock
      .onGet('/search', {
        params: {
          techs: search,
          latitude,
          longitude,
        },
      })
      .reply(200, [
        {
          ...developer,
          location: {
            coordinates: [developer.longitude, developer.latitude],
          },
        },
      ]);

    global.URLSearchParams = function URLSearchParams() {
      this.get = () => {
        return '';
      };
    };

    const {
      getByPlaceholderText,
      getByAltText,
      getByText,
      getByTestId,
    } = render(<Dashboard />);

    fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: search,
      },
    });

    await act(async () => {
      fireEvent.click(getByTestId('map'), {
        center: {
          lat: developer.latitude,
          lng: developer.longitude,
        },
      });
    });

    await act(async () => {
      const { name } = developer;
      expect(getByAltText(name)).toBeInTheDocument();
    });

    expect(getByAltText(developer.name)).toHaveProperty(
      'src',
      developer.avatar_url
    );
    expect(getByText(developer.name)).toBeInTheDocument();
    expect(getByText(developer.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId(`profile_${developer._id}`)).toHaveProperty(
      'href',
      `https://github.com/${developer.github_username}`
    );
  });

  it('should be able to clear the search', async () => {
    const developer = await factory.attrs('Developer');
    const latitude = Number(faker.address.latitude());
    const longitude = Number(faker.address.longitude());
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

    global.URLSearchParams = function URLSearchParams() {
      this.get = () => {
        return '';
      };
    };

    apiMock.onGet('/search').reply(200, [
      {
        ...developer,
        location: {
          coordinates: [developer.longitude, developer.latitude],
        },
      },
    ]);

    const { getByPlaceholderText, getByAltText, getByTestId } = render(
      <Dashboard />
    );

    const search = faker.random.word();
    fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: search,
      },
    });

    await act(async () => {
      fireEvent.keyUp(getByPlaceholderText('Search'), {
        keyCode: 13,
      });
    });

    await act(async () => {
      const { name } = developer;
      expect(getByAltText(name)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(getByTestId('clear'));
    });

    expect(getByPlaceholderText('Search')).toHaveProperty('value', '');
  });

  it('should be able to receive socket event from a new registered developer', async () => {
    const developer = await factory.attrs('Developer');
    developer.location = {
      coordinates: [developer.longitude, developer.latitude],
    };

    let getByAltText;
    let getByText;
    let getByTestId;

    act(() => {
      const component = render(<Dashboard />);
      getByAltText = component.getByAltText;
      getByText = component.getByText;
      getByTestId = component.getByTestId;
    });

    await act(async () => {
      events.developer(developer);
    });

    expect(getByAltText(developer.name)).toHaveProperty(
      'src',
      developer.avatar_url
    );
    expect(getByText(developer.name)).toBeInTheDocument();
    expect(getByText(developer.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId(`profile_${developer._id}`)).toHaveProperty(
      'href',
      `https://github.com/${developer.github_username}`
    );
  });

  it('should be able to receive socket event from an user updated', async () => {
    const developers = await factory.attrsMany('Developer', 3);

    apiMock.onGet('/search').reply(
      200,
      developers.map(dev => ({
        ...dev,
        location: {
          coordinates: [dev.longitude, dev.latitude],
        },
      }))
    );

    const {
      getByAltText,
      getByText,
      getByTestId,
      getByPlaceholderText,
    } = render(<Dashboard />);

    const search = faker.random.word();
    fireEvent.change(getByPlaceholderText('Search'), {
      target: {
        value: search,
      },
    });

    await act(async () => {
      fireEvent.keyUp(getByPlaceholderText('Search'), {
        keyCode: 13,
      });
    });

    developers.forEach(developer => {
      expect(getByAltText(developer.name)).toHaveProperty(
        'src',
        developer.avatar_url
      );
      expect(getByText(developer.name)).toBeInTheDocument();
      expect(getByText(developer.techs.join(', '))).toBeInTheDocument();
      expect(getByTestId(`profile_${developer._id}`)).toHaveProperty(
        'href',
        `https://github.com/${developer.github_username}`
      );
    });

    const [developer] = developers;
    await act(async () => {
      events.developer({
        ...developer,
        location: {
          coordinates: [developer.longitude, developer.latitude],
        },
      });
    });

    expect(getByAltText(developer.name)).toHaveProperty(
      'src',
      developer.avatar_url
    );
    expect(getByText(developer.name)).toBeInTheDocument();
    expect(getByText(developer.techs.join(', '))).toBeInTheDocument();
    expect(getByTestId(`profile_${developer._id}`)).toHaveProperty(
      'href',
      `https://github.com/${developer.github_username}`
    );
  });
});
