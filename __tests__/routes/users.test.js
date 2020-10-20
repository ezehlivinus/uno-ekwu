/* eslint-disable no-undef */
const request = require('supertest');
const { User } = require('../../models/User');


describe('User routes:::endpoints', () => {
const {server} = require('../../index');

  beforeAll(() => {  });

  afterAll(async (done) => {
    await User.deleteMany({});
    await server.close(done);
  });

  it('should return 201, create a new user and return the user', async (done) => {
    const user = {
      email: '12test121ing1@email.com',
      name: 'Ezeh Livinus',
      password: '12345poiuy'
    };
    const response = await request(server)
      .post('/api/v1/users')
      .send(user);

    expect(response.statusCode).toEqual(201);

    expect(response.body.data.email).toEqual(user.email);

  });
});
