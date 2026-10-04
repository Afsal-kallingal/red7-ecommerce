import { describe, it } from 'node:test';
import assert from 'node:assert';
import { api } from '../services/api';

describe('FYND API Service & Mock Adapter', () => {
  it('should retrieve catalog products with filtering', async () => {
    const res = await api.getProducts({ category: 'football-jerseys' });
    assert(res.items.length > 0);
    assert(res.items.every(p => p.category === 'football-jerseys'));
  });

  it('should find single product by slug', async () => {
    const prod = await api.getProductBySlug('real-madrid-2026-27-away-kit-green-bellingham');
    assert(prod !== null);
    assert.strictEqual(prod.slug, 'real-madrid-2026-27-away-kit-green-bellingham');
    assert.strictEqual(prod.price, 399);
  });

  it('should validate 6-digit Indian PIN codes correctly', async () => {
    const valid = await api.checkPincode('560001');
    assert.strictEqual(valid.serviceable, true);
    assert.strictEqual(valid.city, 'Bengaluru');
    assert.strictEqual(valid.codAvailable, true);

    const invalid = await api.checkPincode('123');
    assert.strictEqual(invalid.serviceable, false);
  });

  it('should compute coupon discounts accurately', async () => {
    const applied = await api.validateCoupon('BUY4GET1', 1600);
    assert.strictEqual(applied.valid, true);
    assert.strictEqual(applied.discount, 399);

    const invalid = await api.validateCoupon('UNKNOWN_CODE', 1000);
    assert.strictEqual(invalid.valid, false);
  });
});
