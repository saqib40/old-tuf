import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Shuffle } from 'lucide-react';
import { calculateStats, Stats } from '../utils/statsCalculator';
import dataStore from '../utils/dataStore';
import { Question } from '../types';
import { triggerConfetti } from '../utils/confetti';

// New StatBar Component
const StatBar = ({ label, solved, total, color }: { label: string, solved: number, total: number, color: string }) => {
    const percentage = total > 0 ? (solved / total) * 100 : 0;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {/* Label */}
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, minWidth: 50 }}>
                {label}
            </Typography>

            {/* The Bar */}
            <Box sx={{
                width: 100, // Fixed width w-24/w-32 equivalent
                height: 8,
                bgcolor: 'rgba(255,255,255,0.1)', // bg-gray-700 equivalent
                borderRadius: 4,
                overflow: 'hidden'
            }}>
                <Box sx={{
                    width: `${percentage}%`,
                    height: '100%',
                    bgcolor: color,
                    borderRadius: 4,
                    transition: 'width 0.5s ease-out'
                }} />
            </Box>

            {/* Count */}
            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, minWidth: 60, textAlign: 'right' }}>
                {solved}/{total}
            </Typography>
        </Box>
    );
};

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const prevPercentageRef = useRef<number>(0);

    useEffect(() => {
        // Initialize Once
        const initialStats = calculateStats();
        setStats(initialStats);

        if (initialStats.totalQuestions > 0) {
            prevPercentageRef.current = (initialStats.totalSolved / initialStats.totalQuestions) * 100;
        }

        // Listener for efficient updates
        const handleStatsUpdate = (event: Event) => {
            const detail = (event as CustomEvent).detail;
            if (!detail) return;

            const { difficulty, delta } = detail;
            const diffKey = (difficulty || 'easy').toLowerCase() as keyof Pick<Stats, 'easy' | 'medium' | 'hard'>;

            setStats(prev => {
                if (!prev) return null;
                const targetKey = ['easy', 'medium', 'hard'].includes(diffKey) ? diffKey : 'easy';

                const newTotalSolved = prev.totalSolved + delta;
                const newStats = {
                    ...prev,
                    totalSolved: newTotalSolved,
                    [targetKey]: {
                        ...prev[targetKey],
                        solved: prev[targetKey].solved + delta
                    }
                };

                // Trigger Confetti every 5 questions solved
                if (delta > 0 && newTotalSolved > 0 && newTotalSolved % 5 === 0) {
                    triggerConfetti();
                }
                return newStats;
            });
        };

        window.addEventListener('stats-update', handleStatsUpdate);
        return () => window.removeEventListener('stats-update', handleStatsUpdate);
    }, []);

    const handleRandom = () => {
        // 1. Get Completed Stats
        let completedMap: Record<string, boolean> = {};
        try {
            const saved = localStorage.getItem('completedQuestions');
            if (saved) completedMap = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to read progress", e);
        }

        // 2. Find Unsolved Questions
        const unsolvedPractices: string[] = [];

        Object.entries(dataStore).forEach(([link, questions]) => {
            // @ts-ignore
            const qs = questions as Question[];
            qs.forEach(q => {
                // Check if NOT completed AND has a practice link
                const key = `${link}-${q.id}`;
                if (!completedMap[key] && (q.practice || q.blog)) {
                    // Prioritize practice link, fallback to blog
                    unsolvedPractices.push(q.practice || q.blog || '');
                }
            });
        });

        // 3. Pick Random
        const validLinks = unsolvedPractices.filter(l => l.length > 0);

        if (validLinks.length === 0) {
            alert("🎉 You have solved everything! Great job!");
            return;
        }

        const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
        window.open(randomLink, '_blank');
    };

    if (!stats) return null;

    const percentage = stats.totalQuestions > 0
        ? Math.round((stats.totalSolved / stats.totalQuestions) * 100)
        : 0;

    return (
        <Paper
            elevation={0}
            sx={{
                bgcolor: '#1e1e1e',
                px: 4,
                py: 3,
                mb: 4,
                borderRadius: 4,
                border: '1px solid #333',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0))',
                width: '100%',
                position: 'relative' // For absolute positioning if needed, though flex is better
            }}
        >
            {/* Top Right Random Button (Absolute on desktop, stacked on mobile) */}
            <Box sx={{
                position: { md: 'absolute' },
                top: { md: 24 },
                right: { md: 32 },
                mb: { xs: 2, md: 0 },
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'flex-end' }
            }}>
                <Button
                    variant="outlined"
                    startIcon={<Shuffle size={18} />}
                    onClick={handleRandom}
                    sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.3)',
                        borderRadius: 2, // rounded-lg
                        textTransform: 'none',
                        px: 2,
                        py: 0.5,
                        '&:hover': {
                            borderColor: 'white',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            boxShadow: '0 0 10px rgba(255,255,255,0.3)' // Glow effect
                        }
                    }}
                >
                    Random
                </Button>
            </Box>

            {/* Main Container: Stack on Mobile, Row on Desktop */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: { xs: 4, md: 0 },
                mt: { xs: 0, md: 1 } // Space for the button if needed, or align properly
            }}>

                {/* Left Section: Circle + Text */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {/* Circle */}
                    <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                        <svg width="0" height="0">
                            <defs>
                                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00b894" />
                                    <stop offset="100%" stopColor="#fdcb6e" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
                            <circle
                                cx="40"
                                cy="40"
                                r="36"
                                fill="transparent"
                                stroke="#333"
                                strokeWidth="6"
                            />
                            <circle
                                cx="40"
                                cy="40"
                                r="36"
                                fill="transparent"
                                stroke="url(#progressGradient)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 36}`}
                                strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
                                style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                            />
                        </svg>
                        {/* Percentage inside Circle */}
                        <Box sx={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: '800', color: '#fff' }}>
                                {percentage}%
                            </Typography>
                        </Box>
                    </Box>

                    {/* Overall Progress Text */}
                    <Box>
                        <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
                            Overall Progress
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            All Questions Solved
                        </Typography>
                    </Box>
                </Box>

                {/* Right Section: Stats Row with Bars */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                    gap: { xs: 2, lg: 6 },
                    alignItems: 'center'
                }}>
                    <StatBar
                        label="Easy"
                        solved={stats.easy.solved}
                        total={stats.easy.total}
                        color="#00b894"
                    />
                    <StatBar
                        label="Medium"
                        solved={stats.medium.solved}
                        total={stats.medium.total}
                        color="#fdcb6e"
                    />
                    <StatBar
                        label="Hard"
                        solved={stats.hard.solved}
                        total={stats.hard.total}
                        color="#ff7675"
                    />
                </Box>

            </Box>
        </Paper>
    );
}
