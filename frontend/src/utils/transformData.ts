import { Question } from '../types';

export const transformData = (data: any[], sourceName: string): Question[] => {
    if (!Array.isArray(data)) return [];

    const lowerSource = sourceName.toLowerCase();

    let difficulty = 'Easy';
    if (lowerSource.includes('medium')) {
        difficulty = 'Medium';
    } else if (lowerSource.includes('hard')) {
        difficulty = 'Hard';
    } else if (lowerSource.includes('easy')) {
        difficulty = 'Easy';
    }
    // Default is Easy, as requested.

    return data.map(item => ({
        ...item,
        difficulty,
        // Ensure ID is present if missing (optional safety)
    }));
};
