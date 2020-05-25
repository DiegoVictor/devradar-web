import React, { useCallback, useEffect, useState } from 'react';

import Map from 'google-map-react';
import api from '~/services/api';
import Register from '~/components/Register';
import Developer from '~/components/Developer';
import { Container, Aside, Main } from './styles';
import Layout from '~/components/Layout';

export default () => {
  const [developers, setDevelopers] = useState([]);
  const [center, setCenter] = useState();

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
        <Map
          style={{ height: 'calc(100% - 55px)' }}
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
