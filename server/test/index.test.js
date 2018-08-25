const { expect } = require('chai')
const webdriver = require('w3c-webdriver')
require('isomorphic-fetch')

const knex = require('../db.js')

const { stop, promiseToStart } = require('../index.js')

describe('the server', () => {
    let session;

    before(async () => {
        await promiseToStart
        session = await webdriver.newSession('http://localhost:9515', {
            desiredCapabilities: {
                "browserName": "chrome",
                "chromeOptions": {
                    "args": ["--headless", "--disable-gpu", "--no-sandbox", "--enable-logging", "--v=1"]
                }
            }
        });
    })

    after(async () => {
        if (session) {
            await session.delete()
        }
        await stop()
    })

    it('should serve APIs', async () => {
        await knex('person').del()
        const turing = await knex('person').insert({ "givenName": "Alan", "familyName": "Turing" }).returning('*')
        const kay = await knex('person').insert({ "givenName": "Alan", "familyName": "Kay" }).returning('*')
        const expected = [turing[0], kay[0]];
        const url = 'http://127.0.0.1:3000/api/people';

        const actual = await (await fetch(url)).json();

        expect(actual).to.deep.equal(expected);
    })

    it('should serve react app', async () => {
        const expected = 'Welcome to React';
        await session.go('http://127.0.0.1:3000')

        const actual = await session.findElement('css selector', 'h1');

        expect(await actual.getText()).to.equal(expected)
    })
})