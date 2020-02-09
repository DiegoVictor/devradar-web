import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { Block, Group, Submit } from './styles';

const schema = Yup.object().shape({
  github_username: Yup.string().required(),
  techs: Yup.string().required(),
  latitude: Yup.string().required(),
  longitude: Yup.string().required(),
});

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
    <Form
      schema={schema}
      onSubmit={handleSubmit}
      initialData={{ latitude, longitude }}
    >
      <Block>
        <label htmlFor="github_username">Usuário do Github</label>
        <Input
          id="github_username"
          data-testid="github_username"
          name="github_username"
          required
        />
      </Block>

      <Block>
        <label htmlFor="techs">Tecnologias</label>
        <Input id="techs" data-testid="techs" name="techs" required />
      </Block>

      <Group>
        <Block>
          <label htmlFor="latitude">Latitude</label>
          <Input
            type="text"
            id="latitude"
            data-testid="latitude"
            name="latitude"
            required
          />
        </Block>
        <Block>
          <label htmlFor="longitude">Longitude</label>
          <Input
            type="text"
            id="longitude"
            data-testid="longitude"
            name="longitude"
            required
          />
        </Block>
      </Group>

      <Submit data-testid="submit" type="submit">
        Salvar
      </Submit>
    </Form>
  );
}

Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
