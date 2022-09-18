var supertest = require("supertest"); //require supertest
const config = require("./config");
const faker = require("@faker-js/faker")
const request = supertest(config.base_url);

module.exports = {
  request,
  faker
};
