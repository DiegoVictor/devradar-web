import React, { useCallback, useEffect, useState } from 'react';

import api from '~/services/api';
import Register from '~/components/Register';
import Developer from '~/components/Developer';
import { Container, Aside, Main } from './styles';
import Layout from '~/components/Layout';

export default () => {
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('developers');
      setDevelopers(data);
    })();
  }, []);

  const handleSubmit = useCallback(
    async ({ github_username, latitude, longitude, techs }) => {
      const { data } = await api.post('developers', {
        github_username,
        latitude: Number(latitude),
        longitude: Number(longitude),
        techs,
      });
      setDevelopers([...developers, data]);
    },
    [developers]
  );

  return (
    <Layout>
      <Container>
        <Aside>
          <strong>Cadastrar</strong>
          <Register onSubmit={handleSubmit} />
        </Aside>
        <Main>
          <ul>
            {developers.map(dev => (
              <Developer
                data-testid={`developer_${dev._id}`}
                key={dev._id}
                dev={dev}
              />
            ))}
          </ul>
        </Main>
      </Container>
    </Layout>
  );
};
