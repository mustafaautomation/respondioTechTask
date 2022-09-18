const request = require("../base");
const config = require("../config");
const validate = require("jsonschema").validate;
const createBookingAPI = require(`../requestPayloads/createBookingAPI`);

describe("Booking API Tests", () => {
    let response;
    let schema;
    let requestBody;
    let endpoint
    let data

    beforeAll(() => {
         data = {
            firstname:`${request.faker.faker.name.firstName()}`,
            lastname:`${request.faker.faker.name.lastName()}`,
            totalprice: request.faker.faker.datatype.number(1000),
            depositpaid: request.faker.faker.datatype.boolean(),
            bookingdates:{
                checkin:`2022-09-18`,
                checkout:`2022-09-19`
            },
            additionalneeds:`${request.faker.faker.random.word()}`

        }
    });
    test(`Validate that the Create Booking API is creating booking and validating with Schema and status code is 200 `, async () => {
        await request.request
            .post(createBookingAPI.endpoint)
            .set(config.headerTokens)
            .expect(200)
            .send(data)
            .then(async (res) => {
                response = JSON.parse(res.text);
                let result = validate(response, createBookingAPI.responseSchema).valid;
                expect(result).toBeTruthy();

            });
    });

    test(`Validate that the Response contains what was provided`, async () => {

            expect(response.booking).toMatchObject(data)
    });
    
    test(`Validate that the request is not created if response body is empty and response is 500`, async () => {
        await request.request
            .post(createBookingAPI.endpoint)
            .set(config.headerTokens)
            .expect(500)

    });

    test(`Validate that the request is not created if request body is corrupted`, async () => {

        data = {
            firstname:233,
            lastname:`${request.faker.faker.name.lastName()}`,
            totalprice: request.faker.faker.datatype.number(1000),
            depositpaid: request.faker.faker.datatype.boolean(),
            bookingdates:{
                checkin:`2022-09-18`,
                checkout:`2022-09-19`
            },
            additionalneeds:`${request.faker.faker.random.word()}`

        }
        await request.request
            .post(createBookingAPI.endpoint)
            .set(config.headerTokens)
            .expect(500)
            .send(data)

    });

    test(`Validate that the request is not created if date format is not correct`, async () => {

        data = {
            firstname:`${request.faker.faker.name.firstName()}`,
            lastname:`${request.faker.faker.name.lastName()}`,
            totalprice: request.faker.faker.datatype.number(1000),
            depositpaid: request.faker.faker.datatype.boolean(),
            bookingdates:{
                checkin:`checkin`,
                checkout:`checkout`
            },
            additionalneeds:`${request.faker.faker.random.word()}`

        }
        await request.request
            .post(createBookingAPI.endpoint)
            .set(config.headerTokens)
            .expect(200)
            .send(data)
            .then(async (res) => {
            expect(res.text).toBe("Invalid date")

            });

    });

});
