import { it, expect } from '@jest/globals';
import { cards } from './src/cards';

it('should length of array', () => {
    expect(cards).toHaveLength(36);
});
