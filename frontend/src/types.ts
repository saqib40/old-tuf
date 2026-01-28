export interface Question {
    id: number;
    title: string;
    youtube: string;
    blog: string;
    practice: string;
    type: 'gfg' | 'leetcode' | 'codingninja' | 'codechef' | '';
    difficulty?: string; // Added by dataStore processing
}
