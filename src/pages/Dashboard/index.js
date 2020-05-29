import React, { useEffect, useState } from 'react';
import Map from 'google-map-react';
import api from '~/services/api';
import DevContext from '~/contexts/Dev';
import Developer from '~/components/Developer';
import { Container, Aside, Main } from './styles';
import Layout from '~/components/Layout';
import {
  Bar,
} from './styles';

export default () => {
  const [dev, setDev] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [center, setCenter] = useState();

  useEffect(() => {
    const query_params = new URLSearchParams(window.location.search);

    (async () => {
      switch (query_params.get('action')) {
        default: {
          if (localStorage.devradar) {
            const store = JSON.parse(localStorage.devradar);
            if (store) {
              setDev(store);
            }
          }
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
    })();
  }, []);

  return (
    <Layout>
      <Bar>
            <Button
              type="button"
              hide={search.length === 0}
              onClick={() => setSearch('')}
            >
              <MdClose size="17" />
            </Button>
            <Button type="button">
              <MdSearch size="17" />
            </Button>
          </Search>
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
