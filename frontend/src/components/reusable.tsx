import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Collapse,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmptyState from './EmptyState';
// Import the static dataStore
import dataStore from '../utils/dataStore';
import { Question } from '../types';
import QuestionRow from './QuestionRow';
import { triggerChapterComplete } from '../utils/confetti';

interface Section {
  subtitle: string;
  link: string;
}

interface Input {
  title: string;
  sections: Section[];
}

// Custom Mini Progress Bar Component
const MiniProgressBar = ({ completed, total }: { completed: number, total: number }) => {
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Bar Track */}
      <Box sx={{
        width: 100, // w-24 approx
        height: 8, // h-2
        bgcolor: 'rgba(255,255,255,0.1)', // bg-gray-700 approx
        borderRadius: 999, // rounded-full
        overflow: 'hidden',
        display: { xs: 'none', sm: 'block' }
      }}>
        {/* Bar Fill */}
        <Box sx={{
          width: `${percent}%`,
          height: '100%',
          bgcolor: '#f97316', // Orange 500
          borderRadius: 999,
          transition: 'width 0.3s ease'
        }} />
      </Box>

      {/* Text count */}
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, minWidth: 40, textAlign: 'right' }}>
        {completed}/{total}
      </Typography>
    </Box>
  );
};

function Reusable({ title, sections }: Input) {
  const theme = useTheme();
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  // Load completed questions from localStorage on mount
  useEffect(() => {
    const loadCompleted = () => {
      try {
        const saved = localStorage.getItem('completedQuestions');
        if (saved) {
          setCompletedQuestions(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    };
    loadCompleted();
  }, []);

  // Helper to calculate total progress for logic checks
  const calculateTotalProgress = (currentCompleted: Record<string, boolean>) => {
    let totalQuestions = 0;
    let totalCompleted = 0;

    sections.forEach(section => {
      // @ts-ignore
      const questions: Question[] = dataStore[section.link] || [];
      totalQuestions += questions.length;
      totalCompleted += questions.filter((q) => currentCompleted[`${section.link}-${q.id}`]).length;
    });

    return { completed: totalCompleted, total: totalQuestions };
  };

  // Toggle question completion - using useCallback for stable reference
  const toggleCompletion = useCallback((sectionLink: string, id: number) => {
    setCompletedQuestions(prev => {
      const key = `${sectionLink}-${id}`;
      const isNowCompleted = !prev[key];
      const newCompleted = { ...prev, [key]: isNowCompleted };

      localStorage.setItem('completedQuestions', JSON.stringify(newCompleted));



      // Calculate data for stats update
      // @ts-ignore
      const questions: Question[] = dataStore[sectionLink] || [];
      const question = questions.find(q => q.id === id);

      if (question) {
        const difficulty = question.difficulty;
        const delta = isNowCompleted ? 1 : -1;

        // Dispatch custom event to update Dashboard efficiently
        const event = new CustomEvent('stats-update', {
          detail: { difficulty, delta }
        });
        window.dispatchEvent(event);

        // Check for Chapter Completion (100%)
        if (isNowCompleted) {
          const { completed, total } = calculateTotalProgress(newCompleted);
          if (total > 0 && completed === total) {
            triggerChapterComplete();
          }
        }
      }

      return newCompleted;
    });
  }, [sections]); // Depend on sections to calculate progress correctly

  // Toggle sections visibility
  const handleTitleClick = () => {
    setIsSectionsOpen(!isSectionsOpen);
  };

  // Toggle a section
  const handleSectionClick = (sectionLink: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionLink]: !prev[sectionLink],
    }));
  };

  // Calculate progress for a section
  const getSectionProgress = (sectionLink: string, questions: Question[]) => {
    if (!questions || questions.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const total = questions.length;
    const completed = questions.filter(q => completedQuestions[`${sectionLink}-${q.id}`]).length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  // Render variables
  const { completed: stepCompleted, total: stepTotal } = calculateTotalProgress(completedQuestions);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      {/* Step Header - Collapsible */}
      <Box
        onClick={handleTitleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 2,
          px: 4, // Match Dashboard padding
          mb: isSectionsOpen ? 2 : 0,
          borderRadius: 2,
          backgroundColor: isSectionsOpen ? alpha(theme.palette.background.paper, 0.4) : 'transparent',
          border: '1px solid',
          borderColor: isSectionsOpen ? 'divider' : 'transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 24,
              height: 24,
              color: 'text.secondary',
            }}
          >
            {isSectionsOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
        </Box>

        {/* Step Progress Bar - New Component */}
        <MiniProgressBar completed={stepCompleted} total={stepTotal} />
      </Box>

      {/* Sections List */}
      <Collapse in={isSectionsOpen}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
          {sections.map((section) => {
            // @ts-ignore
            const questions: Question[] = dataStore[section.link] || [];
            const { completed, total } = getSectionProgress(section.link, questions);

            return (
              <Box
                key={section.subtitle}
                sx={{
                  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                  pb: 2,
                  '&:last-child': { borderBottom: 'none' }
                }}
              >
                {/* Section Header */}
                <Box
                  onClick={() => handleSectionClick(section.link)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    py: 1.5,
                    px: 1,
                    borderRadius: 1,
                    transition: 'background-color 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.text.primary, 0.03),
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        color: expandedSections[section.link] ? 'primary.main' : 'text.secondary',
                      }}
                    >
                      {expandedSections[section.link] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: '1rem',
                        color: expandedSections[section.link] ? 'text.primary' : 'text.secondary',
                      }}
                    >
                      {section.subtitle}
                    </Typography>
                  </Box>

                  {/* Section Progress Bar */}
                  <MiniProgressBar completed={completed} total={total} />
                </Box>

                {/* Questions List (Grid Container) */}
                <Collapse in={expandedSections[section.link]}>
                  {/* Motion Container for Staggering */}
                  <Box
                    component={motion.div}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    sx={{ mt: 2, pl: 0, display: 'flex', flexDirection: 'column' }}
                  >
                    {questions.length > 0 ? (
                      questions.map((question) => (
                        <QuestionRow
                          key={question.id}
                          question={question}
                          sectionLink={section.link}
                          isCompleted={!!completedQuestions[`${section.link}-${question.id}`]}
                          toggleCompletion={toggleCompletion}
                        />
                      ))
                    ) : (
                      <Box sx={{ py: 4 }}>
                        <EmptyState message="No questions loaded" description="Check dataStore configuration" />
                      </Box>
                    )}
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </Box>
  );
}

export default Reusable;