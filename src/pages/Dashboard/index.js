import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
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
} from 'react-icons/md';
import { GoSignIn } from 'react-icons/go';
import api, { setAuthorization } from '~/services/api';
import Developer from '~/components/Developer';
import { Container, Aside, Main } from './styles';
import Layout from '~/components/Layout';
import {
  Bar,
  SearchBar,
  Clear,
  Search,
  Link,
  SignIn,
  Profile,
  Col,
  Logout,
  Footer,
  AlignCenter,
  AnimatedButton,
} from './styles';
import Input from '~/components/Input';
import { connect, disconnect, subscribe } from '~/services/socket';
import { login_url } from '~/config/GitHub';

export default () => {
  const form_ref = useRef(null);
  const [dev, setDev] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [show_profile_form, setShowProfileForm] = useState(false);
  const [coordinates, setCoordinates] = useState();
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

    form_ref.current.reset(dev);
    form_ref.current.setErrors({});
  }, [dev]);

  const handleSearch = useCallback(async () => {
    if (show_profile_form) {
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
  }, [closeAndResetForm, coordinates, search, show_profile_form]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('devradar');
    setDev({});
    closeAndResetForm();
  }, [closeAndResetForm]);

  const handleSubmit = useCallback(
    async ({ techs, latitude, longitude }) => {
      try {
        form_ref.current.setErrors({});

          break;
        }
      }
      } catch (err) {

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
    })();
  }, []);

  return (
    <Layout>
      <Bar>
        <SearchBar compact={show_profile_form}>
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
            hidden={show_profile_form}
            onClick={() => setSearch('')}
          >
            <MdClose size="17" />
          </Clear>
          <Search type="button" onClick={handleSearch}>
            <MdSearch size="17" />
          </Search>
        </SearchBar>
            <Link href={`${login_url}signup`}>
              <MdAddCircle size="17" />
              <span>Sign Up</span>
            </Link>
            <SignIn href={`${login_url}signin`}>
              <GoSignIn size="17" />
              <span>Sign In</span>
            </SignIn>
        <Profile show={show_profile_form}>
          <Form ref={form_ref} initialData={dev} onSubmit={handleSubmit}>
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
                  <Logout type="button" onClick={handleLogout}>
                    <MdExitToApp size="23" />
                    Logout
                  </Logout>
                  <div>
                    <button onClick={closeAndResetForm} type="button">
                      <MdClear size="17" />
                    </button>
                    <AnimatedButton
                      animate={processing}
                      type="submit"
                      disabled={processing}
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
    </Layout>
  );
};
