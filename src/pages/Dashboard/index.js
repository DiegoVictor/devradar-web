import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { Form } from '@unform/web';
import Map from 'google-map-react';
import {
  MdClose,
  MdSearch,
  MdAddCircle,
  MdCached,
  MdClear,
  MdExitToApp,
  MdCheck,
} from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { GoSignIn } from 'react-icons/go';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api, { setAuthorization } from '~/services/api';
import Developer from '~/components/Developer';
import Input from '~/components/Input';
import { connect, disconnect, subscribe } from '~/services/socket';
import { loginUrl } from '~/config/GitHub';
import {
  Bar,
  SearchBar,
  Clear,
  Search,
  Link,
  SignIn,
  User,
  Loading,
  Profile,
  Col,
  Logout,
  Footer,
  AlignCenter,
  AnimatedButton,
} from './styles';

export default () => {
  const formRef = useRef(null);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  const [dev, setDev] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState();
  const [action, setAction] = useState(params.get('action') || '');
  const [processing, setProcessing] = useState(false);

  const [search, setSearch] = useState('');

  const updateStateAndStorage = useCallback(data => {
    let developer = {};
    if (localStorage.devradar) {
      developer = JSON.parse(localStorage.devradar);
    }
    developer = Object.assign(developer, data);

    localStorage.setItem('devradar', JSON.stringify(developer));
    setDev(developer);
  }, []);

  const closeAndResetForm = useCallback(() => {
    setShowProfileForm(false);

    formRef.current.reset(dev);
    formRef.current.setErrors({});
  }, [dev]);

  const handleSearch = useCallback(async () => {
    if (showProfileForm) {
      closeAndResetForm();
    } else if (coordinates) {
      const { lat: latitude, lng: longitude } = coordinates;
      const { data } = await api.get('search', {
        params: {
          techs: search,
          latitude,
          longitude,
        },
      });

      setDevelopers(
        data.map(
          ({ _id, name, github_username, techs, avatar_url, location }) => {
            const [lng, lat] = location.coordinates;
            return {
              _id,
              name,
              techs,
              github_username,
              avatar_url,
              location: {
                lat,
                lng,
              },
            };
          }
        )
      );

      disconnect();
      connect(latitude, longitude, search);
    }
  }, [closeAndResetForm, coordinates, search, showProfileForm]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('devradar');
    setDev({});
    closeAndResetForm();
  }, [closeAndResetForm]);

  const handleSubmit = useCallback(
    async ({ techs, latitude, longitude }) => {
      try {
        formRef.current.setErrors({});

        if (!processing) {
          switch (action) {
            case 'signup': {
              break;
            }
            default: {
              break;
            }
          }
        }
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });

          formRef.current.setErrors(validationErrors);
        } else {
          setAction('');
          toast.error('Oops! Looks like something goes wrong!');
        }
      }
    },
    [action, params, processing, updateStateAndStorage]
  );

  useEffect(() => {
    subscribe(
      'developer',
      ({ _id, name, avatar_url, github_username, location, techs }) => {
        const [lng, lat] = location.coordinates;
        const existing_developer = developers.find(
          developer => developer._id === _id
        );

        if (!existing_developer) {
          setDevelopers([
            ...developers,
            {
              _id,
              name,
              techs,
              avatar_url,
              github_username,
              location: {
                lat,
                lng,
              },
            },
          ]);
        } else {
          setDevelopers(
            developers.map(developer => {
              if (developer._id === existing_developer._id) {
                return {
                  ...developer,
                  location: {
                    lat,
                    lng,
                  },
                };
              }
              return developer;
            })
          );
        }
      }
    );
  }, [dev, dev._id, developers]);

  useEffect(() => {
    if (localStorage.devradar) {
      const store = JSON.parse(localStorage.devradar);
      if (store) {
        setDev(store);
        setAuthorization(store.token);
      }
    }

    setLoading(false);
  }, [action.length]);

  useEffect(() => {
    if (action === 'signin') {
      (async () => {
        try {
          setLoading(true);
          const {
            data: {
              developer: {
                _id,
                avatar_url,
                techs,
                location: {
                  coordinates: [longitude, latitude],
                },
              },
              token,
            },
          } = await api.post(`/sessions`, {
            code: params.get('code'),
          });

          setAuthorization(token);

          updateStateAndStorage({
            _id,
            avatar_url,
            techs: techs.join(', '),
            latitude,
            longitude,
            token,
          });

          const { history, location } = window;
          history.pushState({}, '', location.href.replace(location.search, ''));
          setAction('');
        } catch (err) {
          toast.error('Oops! Looks like something goes wrong!');
        }
        setLoading(false);
      })();
    }
  }, [action, params, updateStateAndStorage]);

  useEffect(() => {
    if (action === 'signup') {
      setShowProfileForm(true);

      if (coordinates) {
        const { lat: latitude, lng: longitude } = coordinates;
        setDev({ latitude, longitude });
      }
    }
  }, [action, coordinates]);

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setCoordinates({ lat, lng });
      });
    })();
  }, []);

  return (
    <>
      <Bar>
        <SearchBar compact={showProfileForm}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyUp={e => e.keyCode === 13 && handleSearch()}
          />
          <Clear
            type="button"
            visible={search.length > 0}
            hidden={showProfileForm}
            onClick={() => setSearch('')}
            data-testid="clear"
          >
            <MdClose size="17" />
          </Clear>
          <Search type="button" onClick={handleSearch} data-testid="search">
            <MdSearch size="17" />
          </Search>
        </SearchBar>

        {!(action.length > 0) && !dev._id && !loading ? (
          <>
            <Link href={`${loginUrl}signup`} data-testid="signup">
              <MdAddCircle size="17" />
              <span>Sign Up</span>
            </Link>
            <SignIn href={`${loginUrl}signin`} data-testid="signin">
              <GoSignIn size="17" />
              <span>Sign In</span>
            </SignIn>
          </>
        ) : (
          <User onClick={() => setShowProfileForm(true)} data-testid="avatar">
            {loading ? (
              <Loading>
                <AiOutlineLoading3Quarters color="#7d49e7" size="17" />
              </Loading>
            ) : (
              <>
                {dev.avatar_url ? (
                  <img src={dev.avatar_url} alt={dev.name} />
                ) : (
                  <FaUserCircle color="#c5c5c5" size="20" />
                )}
              </>
            )}
          </User>
        )}

        <Profile show={showProfileForm}>
          <Form ref={formRef} initialData={dev} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Techs</label>
              <Input name="techs" placeholder="Techs" />

              <Col>
                <div>
                  <label>Latitude</label>
                  <Input name="latitude" placeholder="Latitude" />
                </div>

                <div>
                  <label>Longitute</label>
                  <Input name="longitude" placeholder="Longitude" />
                </div>
              </Col>
            </div>

            <Footer>
              {dev._id ? (
                <>
                  <Logout
                    type="button"
                    onClick={handleLogout}
                    data-testid="logout"
                  >
                    <MdExitToApp size="23" />
                    Logout
                  </Logout>
                  <div>
                    <button
                      onClick={closeAndResetForm}
                      type="button"
                      data-testid="clear"
                    >
                      <MdClear size="17" />
                    </button>
                    <AnimatedButton
                      animate={processing}
                      type="submit"
                      disabled={processing}
                      data-testid="update"
                    >
                      <MdCached size="17" />
                    </AnimatedButton>
                  </div>
                </>
              ) : (
                <AlignCenter>
                  <a href="/">
                    <MdClose size="17" />
                  </a>
                  <AnimatedButton
                    animate={processing}
                    type="submit"
                    disabled={processing}
                    data-testid="signup-submit"
                  >
                    {processing ? 'Processing' : <MdCheck size="17" />}
                  </AnimatedButton>
                </AlignCenter>
              )}
            </Footer>
          </Form>
        </Profile>
      </Bar>

      <Map
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_API_KEY }}
        defaultCenter={{
          lat: parseFloat(process.env.REACT_APP_GOOGLEMAP_LAT),
          lng: parseFloat(process.env.REACT_APP_GOOGLEMAP_LNG),
        }}
        center={coordinates}
        zoom={14}
        onChange={({ center }) => {
          setCoordinates(center);
          if (search) {
            handleSearch();
          }
        }}
      >
        {developers.map(({ location: { lat, lng }, ...data }) => (
          <Developer key={data._id} lng={lng} lat={lat} data={data} />
        ))}
      </Map>
    </>
  );
};
