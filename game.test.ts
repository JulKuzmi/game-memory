import { it, expect } from '@jest/globals';
import { cards } from './src/cards';

it('should length of array', () => {
    expect(cards).toHaveLength(36);
});

it('should there be such a card', () => {
    const numberCard = ['6 туз'];
    expect(cards).not.toBe(numberCard);
});

it('should check that the contents of the cards are correct', () => {
    const card: string[] = ['туз пики'];

    expect(cards).toContain('туз пики');
    expect(new Set(cards)).toContain('туз пики');
    expect(card).toContain('туз пики');
});
