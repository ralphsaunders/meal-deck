import { detectMeasure } from './user-input';

describe('detectMeasure fn', () => {
    it('returns length 3', () => {
        const measures = detectMeasure();
        expect(measures.length).toBe(3);
    });
});
