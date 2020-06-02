import React, {
  useState,
  useCallback,
  useRef,
} from 'react';
import Map from 'google-map-react';
import {
  MdClose,
  MdSearch,
  MdAddCircle,
} from 'react-icons/md';
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
} from './styles';
import { connect, disconnect, subscribe } from '~/services/socket';
import { login_url } from '~/config/GitHub';

export default () => {
  const form_ref = useRef(null);
  const [dev, setDev] = useState({});
  const [developers, setDevelopers] = useState([]);
  const [show_profile_form, setShowProfileForm] = useState(false);
  const [coordinates, setCoordinates] = useState();

  const [search, setSearch] = useState('');

    (async () => {
      switch (query_params.get('action')) {
        default: {
          if (localStorage.devradar) {
            const store = JSON.parse(localStorage.devradar);
            if (store) {
              setDev(store);
            }
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

          break;
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude: lat, longitude: lng } = pos.coords;
          setCenter({ lat, lng });
        },
        () => {}
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('developers');
      setDevelopers(
        data.map(developer => {
          const [lng, lat] = developer.location.coordinates;
          return {
            ...developer,
            location: {
              lat,
              lng,
            },
          };
        })
      );
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
      </Bar>

        <Map
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_API_KEY }}
          defaultCenter={{
            lat: -23.6821604,
            lng: -46.8754915,
          }}
          center={center}
          zoom={15}
        >
          {developers.map(({ location: { lat, lng }, ...data }) => (
            <Developer key={data._id} lng={lng} lat={lat} data={data} />
          ))}
        </Map>
    </Layout>
  );
};
