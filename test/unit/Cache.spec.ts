import {expect} from 'chai';

import {Cache} from './../../src/core/utils/Cache';

describe('sp-request: Cache', () => {
  let cache: Cache = new Cache();

  it('should return item from cache without expiration', () => {
    let key: string = 'cache key';
    let value: any = { data: 'some data' };

    cache.set(key, value);

    let data: any = cache.get(key);

    expect(data).to.equal(value);
  });

  it('should return null for non-existing item', () => {
    let data: any = cache.get('some key');

    expect(data).to.be.undefined;
  });

  it('should clear the cache', () => {
    let key: string = 'key';
    cache.set(key, 'value');
    cache.clear();

    expect(cache.get(key)).to.be.undefined;
  });

  it('should return item from cache with expiration in sec', () => {
    let key: string = 'cache key';
    let value: any = { data: 'some data' };

    cache.set(key, value, 1000);

    let data: any = cache.get(key);

    expect(data).to.equal(value);
  });

  it('should return null when item expired', () => {
    let key: string = 'cache key';
    let value: any = { data: 'some data' };

    cache.set(key, value, -1);

    let data: any = cache.get(key);
    expect(data).to.be.undefined;
  });

  it('should return item from cache with expiration on date', () => {
    let key: string = 'cache key';
    let value: any = { data: 'some data' };
    let now: Date = new Date();
    now.setSeconds(now.getSeconds() + 10);
    cache.set(key, value, now);

    let data: any = cache.get(key);

    expect(data).to.equal(value);
  });

  it('should return null when item expired on date', () => {
    let key: string = 'cache key';
    let value: any = { data: 'some data' };
    let now: Date = new Date();
    now.setSeconds(now.getSeconds() - 1);
    cache.set(key, value, now);

    let data: any = cache.get(key);
    expect(data).to.be.undefined;
  });

  it('should remove value from cache', () => {
    let key: string = 'cache key';
    let value: any = { data: 'some data' };
    cache.set(key, value);
    let data: any = cache.get(key);
    expect(data).to.equal(value);

    cache.remove(key);
    data = cache.get(key);

    expect(data).is.undefined;
  });
});
