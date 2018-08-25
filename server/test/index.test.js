const { expect } = require('chai')
const webdriver = require('w3c-webdriver')
require('isomorphic-fetch');

const { server, promiseToStart } = require('../index.js')

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
        if(session) {
            await session.delete()
        }
        await server.close()
    })

    it('should serve APIs', async () => {
        const expected = [
            {"id":1,"givenName":"Alan","familyName":"Turing"},
            {"id":2,"givenName":"Alan","familyName":"Kay"}
        ];
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