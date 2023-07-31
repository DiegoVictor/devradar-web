import { factory } from 'factory-girl';
import { faker } from '@faker-js/faker';

factory.define(
  'Developer',
  {},
  {
    _id: faker.string.uuid,
    avatar_url: faker.image.url,
    bio: faker.lorem.paragraph,
    name: faker.person.fullName,
    github_username: faker.internet.userName,
    techs: () => {
      const techs = [];
      for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i += 1) {
        techs.push(faker.lorem.word());
      }
      return techs;
    },
    latitude: () => Number(faker.location.latitude()),
    longitude: () => Number(faker.location.longitude()),
  }
);

export default factory;
