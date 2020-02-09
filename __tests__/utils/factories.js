import { factory } from 'factory-girl';
import faker from 'faker';

factory.define(
  'Developer',
  {},
  {
    _id: faker.random.uuid,
    avatar_url: faker.image.imageUrl,
    bio: faker.lorem.paragraph,
    name: faker.name.findName,
    github_username: faker.internet.userName,
    techs: () => {
      const techs = [];
      for (let i = 0; i < faker.random.number({ min: 1, max: 5 }); i += 1) {
        techs.push(faker.random.word());
      }
      return techs;
    },
    latitude: faker.address.latitude,
    longitude: faker.address.longitude,
  }
);

export default factory;
