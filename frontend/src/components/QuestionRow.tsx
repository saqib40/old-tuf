import React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Checkbox,
    alpha,
    Tooltip,
    Chip,
    Button,
    useTheme,
} from '@mui/material';
import {
    FileText,
    CheckCircle2,
    Circle,
    Play
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Question } from '../types';

interface QuestionRowProps {
    question: Question;
    sectionLink: string;
    isCompleted: boolean;
    toggleCompletion: (sectionLink: string, id: number) => void;
}

// Diff Color Map
const getDifficultyColor = (difficulty?: string) => {
    const diff = (difficulty || 'easy').toLowerCase();
    switch (diff) {
        case 'easy': return '#00b894';
        case 'medium': return '#fdcb6e';
        case 'hard': return '#ff7675';
        default: return '#00b894';
    }
};

const QuestionRow = React.memo(({ question, sectionLink, isCompleted, toggleCompletion }: QuestionRowProps) => {
    const theme = useTheme();

    return (
        <Box
            component={motion.div}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.005,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }}
            transition={{ duration: 0.2 }}
            sx={{
                display: 'grid',
                // Strict Columns as requested:
                // 30px: Checkbox
                // 1fr: Title
                // 100px: Solve Button
                // 80px: Resources
                // 80px: Badge
                gridTemplateColumns: {
                    xs: '30px 1fr auto',    // Mobile: Simplified
                    md: '30px 1fr 100px 80px 80px' // Desktop: Strict alignment
                },
                gap: 2,
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.05)',
                // Base background for non-hover state
                backgroundColor: 'transparent',
                cursor: 'default' // Default cursor for the row, specific elements have pointers
            }}
        >
            {/* Col 1: Checkbox (30px) */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Checkbox
                    checked={isCompleted}
                    onChange={() => toggleCompletion(sectionLink, question.id)}
                    icon={<Circle size={20} color={theme.palette.text.secondary} />}
                    checkedIcon={<CheckCircle2 size={20} color={theme.palette.success.main} />}
                    sx={{ p: 0 }}
                />
            </Box>

            {/* Col 2: Title (1fr) */}
            <Typography
                variant="body1"
                sx={{
                    color: isCompleted ? 'text.secondary' : '#fff',
                    fontWeight: isCompleted ? 400 : 600,
                    textDecoration: isCompleted ? 'line-through' : 'none',
                    cursor: 'pointer',
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
                onClick={() => toggleCompletion(sectionLink, question.id)}
            >
                {question.title}
            </Typography>

            {/* Col 3: Solve Button (100px) */}
            <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%' }}>
                {question.practice ? (
                    <Button
                        variant="contained"
                        size="small"
                        href={question.practice}
                        target="_blank"
                        sx={{
                            bgcolor: '#f97316',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            textTransform: 'none',
                            borderRadius: 1.5,
                            px: 2,
                            py: 0.5,
                            minWidth: '80px',
                            width: '100%',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#ea580c',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Solve
                    </Button>
                ) : (
                    <Box sx={{ width: '100%', height: 32 }} />
                )}
            </Box>

            {/* Col 4: Resource Icons (80px) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, justifyContent: 'center' }}>
                {question.youtube && (
                    <Tooltip title="Watch Video">
                        <IconButton
                            href={question.youtube}
                            target="_blank"
                            rel="noopener"
                            size="small"
                            sx={{
                                color: '#ef4444',
                                bgcolor: alpha('#ef4444', 0.1),
                                '&:hover': { bgcolor: alpha('#ef4444', 0.2) }
                            }}
                        >
                            <Play size={16} fill="currentColor" />
                        </IconButton>
                    </Tooltip>
                )}

                {(question.blog) && (
                    <Tooltip title="Read Article">
                        <IconButton
                            href={question.blog}
                            target="_blank"
                            rel="noopener"
                            size="small"
                            sx={{
                                color: '#9ca3af',
                                bgcolor: alpha('#9ca3af', 0.1),
                                '&:hover': { bgcolor: alpha('#9ca3af', 0.2) }
                            }}
                        >
                            <FileText size={16} />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>

            {/* Col 5: Difficulty Badge (80px) */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                <Chip
                    label={question.difficulty || 'Easy'}
                    size="small"
                    sx={{
                        bgcolor: alpha(getDifficultyColor(question.difficulty), 0.15),
                        color: getDifficultyColor(question.difficulty),
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: '24px',
                        borderRadius: '9999px',
                        width: '100%',
                        border: `1px solid ${alpha(getDifficultyColor(question.difficulty), 0.3)}`
                    }}
                />
            </Box>
        </Box>
    );
});

export default QuestionRow;
