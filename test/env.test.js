const expect = require('expect')
const Env = require('../src/env.js');

describe('Env', () => {
	beforeEach(() => {
		Env.reset();
	})

	it('Should assign variable by key into Env via `set` method', () => {
		Env.set('foo', 1);
		expect(Env.get('foo')).toEqual(1);
	});

	it('Should assign all keys into Env via `set` method when object passed', () => {
		Env.set({
			foo: 1,
			bar: 'baz',
		});

		expect(Env.get('foo')).toEqual(1);
		expect(Env.get('bar')).toEqual('baz');
	});

	it('Should return `false` for not existing keys', () => {
		expect(Env.get('foo')).toEqual(false);
	});

	it('Should remove all vars by calling `reset` method', () => {
		Env.set('foo', 1);
		Env.reset();
		expect(Env.get('foo')).toEqual(false);
	});

	it('Should call all callbacks after `ready` invoke', done => {
		Env.set('foo', 1);
		Env.set('bar', 2);
		Env.onReady(() => {
			expect(Env.get('foo')).toEqual(1);
		});
		Env.onReady(() => {
			expect(Env.get('bar')).toEqual(2);
			done();
		});
		Env.ready();
	});

	it('Should invoke ready listeners even if they attached after `ready` call', done => {
		Env.set('foo', 1);

		Env.ready();

		Env.onReady(() => {
			expect(Env.get('foo')).toEqual(1);
			done();
		});
	});

	it('Should resolve `onReady` return value after `ready` call', done => {
		Env.set('foo', 1);

		Env.onReady(() => {}).then(() => {
			expect(Env.get('foo')).toEqual(1);
			done();
		});

		Env.ready();
	});

	it('Should report correct status by `isReady` call', () => {
		expect(Env.isReady()).toEqual(false);
		Env.ready();
		expect(Env.isReady()).toEqual(true);
	});

	it('Should be able to return value asynchronously', done => {
		Env.set('foo', 1);
		Env.getAsync('foo').then(value => {
			expect(value).toEqual(1)
			done();
		});

		Env.ready();
	});
});
