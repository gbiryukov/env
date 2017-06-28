const expect = require('expect')
const Env = require('../src/env.js');

describe('Env spec', () => {
	it('Should have public methods', () => {
		expect(Env.set).toBeA('function');
		expect(Env.get).toBeA('function');
		expect(Env.ready).toBeA('function');
		expect(Env.onReady).toBeA('function');
		expect(Env.isReady).toBeA('function');
		expect(Env.reset).toBeA('function');
	});
});
