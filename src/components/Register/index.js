import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { Block, Group, Submit } from './styles';

export default function Register({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        throw Error(err);
      },
      {
        timeut: 3000,
      }
    );
  }, []);

  const handleSubmit = useCallback(
    async (data, { resetForm }) => {
      await onSubmit(data);
      resetForm({ latitude, longitude });
    },
    [latitude, longitude, onSubmit]
  );

  return (
    <Form onSubmit={handleSubmit} initialData={{ latitude, longitude }}>
      <Block>
        <label htmlFor="github_username">Usuário do Github</label>
        <Input id="github_username" name="github_username" required />
      </Block>

      <Block>
        <label htmlFor="techs">Tecnologias</label>
        <Input id="techs" name="techs" required />
      </Block>

      <Group>
        <Block>
          <label htmlFor="latitude">Latitude</label>
          <Input type="text" id="latitude" name="latitude" required />
        </Block>
        <Block>
          <label htmlFor="longitude">Longitude</label>
          <Input type="text" id="longitude" name="longitude" required />
        </Block>
      </Group>

      <Submit type="submit">Salvar</Submit>
    </Form>
  );
}

Register.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func.isRequired,
});
