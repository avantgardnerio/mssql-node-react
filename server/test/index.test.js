const { expect } = require('chai')
require('isomorphic-fetch');

const { server, promiseToStart } = require('../index.js')

describe('the server', () => {

    before(async () => {
        await promiseToStart
    })

    after(async () => {
        await server.close()
    })

    it('should serve', async () => {
        const expected = 'Hello World!';
        const url = 'http://127.0.0.1:3000/';

        const actual = await (await fetch(url)).text();

        expect(actual).to.equal(expected);
    })
})