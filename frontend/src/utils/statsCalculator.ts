import dataStore from './dataStore';

export interface StatBreakdown {
    total: number;
    solved: number;
}

export interface Stats {
    totalQuestions: number;
    totalSolved: number;
    easy: StatBreakdown;
    medium: StatBreakdown;
    hard: StatBreakdown;
}

export const calculateStats = (): Stats => {
    const stats: Stats = {
        totalQuestions: 0,
        totalSolved: 0,
        easy: { total: 0, solved: 0 },
        medium: { total: 0, solved: 0 },
        hard: { total: 0, solved: 0 },
    };

    // Get completed questions from localStorage safely
    let completedMap: Record<string, boolean> = {};
    if (typeof window !== 'undefined') {
        try {
            const saved = localStorage.getItem('completedQuestions');
            if (saved) {
                completedMap = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Failed to read or parse completedQuestions from localStorage', e);
        }
    }

    // Iterate over all sections in dataStore
    Object.entries(dataStore).forEach(([sectionLink, questions]) => {
        // Check if questions is an array (it should be based on dataStore structure)
        if (Array.isArray(questions)) {
            questions.forEach((q) => {
                // Normalize difficulty to lowercase for consistent checking
                // Default to 'easy' if undefined (though dataStore should provide it)
                const difficulty = (q.difficulty || 'Easy').toLowerCase();

                // Update Totals
                stats.totalQuestions++;

                if (difficulty === 'easy') {
                    stats.easy.total++;
                } else if (difficulty === 'medium') {
                    stats.medium.total++;
                } else if (difficulty === 'hard') {
                    stats.hard.total++;
                } else {
                    // Fallback for any unexpected difficulty strings, treat as Easy or log?
                    // Prompt said "Any other filename ... = Treat as Easy".
                    // We already handled this in dataStore generation, but strictly speaking:
                    stats.easy.total++;
                }

                // Check availability in completedMap
                // Key format per legacy logic: `${sectionLink}-${id}`
                const key = `${sectionLink}-${q.id}`;

                if (completedMap[key]) {
                    stats.totalSolved++;

                    if (difficulty === 'easy') {
                        stats.easy.solved++;
                    } else if (difficulty === 'medium') {
                        stats.medium.solved++;
                    } else if (difficulty === 'hard') {
                        stats.hard.solved++;
                    } else {
                        stats.easy.solved++;
                    }
                }
            });
        }
    });

    return stats;
};
