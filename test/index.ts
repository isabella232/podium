import * as Podium from '..';
import * as Lab from '@hapi/lab';


const { expect } = Lab.types;

// Podium()

expect.type<Podium>(new Podium());
expect.type<Podium>(new Podium('test'));
expect.type<Podium>(new Podium(['a', { name: 'b', channels: ['c'] }, new Podium()]));

const podium = new Podium();

// registerEvent()

expect.type<void>(podium.registerEvent('test'));
expect.type<void>(podium.registerEvent(['a', { name: 'b', channels: ['c'] }, new Podium()]));

expect.error(podium.registerEvent());
expect.error(podium.registerEvent(123));
expect.error(podium.registerEvent([Symbol()]));

// registerPodium()

expect.type<void>(podium.registerPodium(new Podium()));
expect.type<void>(podium.registerPodium([new Podium()]));

expect.error(podium.registerPodium());
expect.error(podium.registerPodium('test'));
expect.error(podium.registerPodium([{ name: 'test' }]));

// emit()

expect.type<Promise<void>>(podium.emit('test'));
expect.type<Promise<void>>(podium.emit('test', { data: true }));
expect.type<Promise<void>>(podium.emit({ name: 'test', channel: 'a', tags: 'b' }, { data: true }));
expect.type<Promise<void>>(podium.emit({ name: 'test', tags: ['b'] }));
expect.type<Promise<void>>(podium.emit({ name: 'test', tags: { b: true } }));

expect.error(podium.emit());
expect.error(podium.emit(123));
expect.error(podium.emit({ channel: 'a' }));
expect.error(podium.emit({ name: 123 }));
expect.error(podium.emit({ name: 'test', channel: 123 }));
expect.error(podium.emit({ name: 'test', tags: 123 }));

// on()

expect.type<Podium>(podium.on('test', function () { this instanceof Podium; }));
expect.type<Podium>(podium.on('test', function () { this.ok; }, { ok: true }));
expect.type<Podium>(podium.on({ name: 'test' }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', channels: 'a' }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', filter: 'a' }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', filter: { all: true, tags: ['a', 'b'] } }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', tags: true }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', clone: true }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', spread: true }, function () { }));
expect.type<Podium>(podium.on({ name: 'test', count: 3 }, function () { }));

expect.error(podium.on());
expect.error(podium.on('test'));
expect.error(podium.on(123, function () { }));
expect.error(podium.on('test', Podium));
expect.error(podium.on('test', function () { }), 123);
expect.error(podium.on('test', function () { this.notOk; }, { ok: true }));

// addListener()

expect.type<Podium>(podium.addListener('test', function () { this instanceof Podium; }));
expect.type<Podium>(podium.addListener('test', function () { this.ok; }, { ok: true }));

expect.error(podium.addListener());
expect.error(podium.addListener('test'));
expect.error(podium.addListener(123, function () { }));
expect.error(podium.addListener('test', Podium));
expect.error(podium.addListener('test', function () { this.notOk; }, { ok: true }));
expect.error(podium.once({ name: 'test', unknown: true }, function () { }));

// once()

expect.type<Podium>(podium.once('test', function () { this instanceof Podium; }));
expect.type<Podium>(podium.once('test', function () { this.ok; }, { ok: true }));
expect.type<Podium>(podium.once({ name: 'test' }, function () { }));
expect.type<Podium>(podium.once({ name: 'test', channels: 'a' }, function () { }));
expect.type<Podium>(podium.once({ name: 'test', filter: 'a' }, function () { }));
expect.type<Podium>(podium.once({ name: 'test', filter: { all: true, tags: ['a', 'b'] } }, function () { }));
expect.type<Podium>(podium.once({ name: 'test', tags: true }, function () { }));
expect.type<Podium>(podium.once({ name: 'test', clone: true }, function () { }));
expect.type<Podium>(podium.once({ name: 'test', spread: true }, function () { }));
expect.type<Promise<any[]>>(podium.once('test'));
expect.type<Promise<any[]>>(podium.once<void>('test'));

expect.error(podium.once());
expect.error(podium.once(123, function () { }));
expect.error(podium.once('test', Podium));
expect.error(podium.once('test', function () { this.notOk; }, { ok: true }));
expect.error(podium.once({ name: 'test', unknown: true }, function () { }));
expect.error(podium.once({ name: 'test', count: 3 }, function () { }));

// removeListener()

expect.type<Podium>(podium.removeListener('test', function () { }));

expect.error(podium.removeListener());
expect.error(podium.removeListener('test'));
expect.error(podium.removeListener('test', Podium));
expect.error(podium.removeListener(123, function () { }));

// removeAllListeners()

expect.type<Podium>(podium.removeAllListeners('test'));

expect.error(podium.removeAllListeners());
expect.error(podium.removeAllListeners(123));
expect.error(podium.removeAllListeners('test', function () { }));

// hasListeners()

expect.type<boolean>(podium.hasListeners('test'));

expect.error(podium.hasListeners());
expect.error(podium.hasListeners(123));
