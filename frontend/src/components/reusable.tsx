import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Avatar,
  Checkbox,
  useTheme,
  alpha,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import {
  Youtube,
  FileText,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Circle
} from 'lucide-react';
import EmptyState from './EmptyState';

// Load all JSON files
const jsonFiles = import.meta.glob('../data/sheets/**/*.json', { eager: true });
const mappedFiles = Object.keys(jsonFiles).reduce((acc, path) => {
  const key = path.replace(/^\.\.\/data\//, '').replace(/\.json$/, '');
  acc[key] = jsonFiles[path];
  return acc;
}, {} as Record<string, any>);

interface Question {
  id: number;
  title: string;
  youtube: string;
  blog: string;
  practice: string;
  type: 'gfg' | 'leetcode' | 'codingninja' | 'codechef' | '';
}

interface Section {
  subtitle: string;
  link: string;
}

interface Input {
  title: string;
  sections: Section[];
}

function Reusable({ title, sections }: Input) {
  const theme = useTheme();
  const [isSectionsOpen, setIsSectionsOpen] = useState(false); // Default closed as per user request new design
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [sectionQuestions, setSectionQuestions] = useState<Record<string, Question[]>>({});
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  // Load completed questions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('completedQuestions');
    if (saved) {
      setCompletedQuestions(JSON.parse(saved));
    }
  }, []);

  // Toggle question completion
  const toggleCompletion = (sectionLink: string, id: number) => {
    const key = `${sectionLink}-${id}`;
    const newCompleted = { ...completedQuestions, [key]: !completedQuestions[key] };
    setCompletedQuestions(newCompleted);
    localStorage.setItem('completedQuestions', JSON.stringify(newCompleted));
  };

  // Toggle sections visibility
  const handleTitleClick = () => {
    setIsSectionsOpen(!isSectionsOpen);
  };

  // Toggle a section and load its questions
  const handleSectionClick = (sectionLink: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionLink]: !prev[sectionLink],
    }));

    if (!expandedSections[sectionLink] && !sectionQuestions[sectionLink]) {
      try {
        const data = mappedFiles[sectionLink];
        if (data) {
          setSectionQuestions((prev) => ({
            ...prev,
            [sectionLink]: data.default || data,
          }));
        } else {
          setSectionQuestions((prev) => ({
            ...prev,
            [sectionLink]: [],
          }));
        }
      } catch (error) {
        console.error(`Error loading questions from ${sectionLink}:`, error);
        setSectionQuestions((prev) => ({
          ...prev,
          [sectionLink]: [],
        }));
      }
    }
  };

  const getPracticeLogo = (type: Question['type']) => {
    switch (type) {
      case 'gfg': return 'GeeksForGeeks_logo.png';
      case 'leetcode': return 'LeetCode_logo_white.png';
      case 'codingninja': return 'codingninja_logo.png';
      case 'codechef': return 'codechef_logo.png';
      default: return undefined;
    }
  };

  // Calculate progress for a section
  const getSectionProgress = (sectionLink: string, questions: Question[]) => {
    if (!questions || questions.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const total = questions.length;
    const completed = questions.filter(q => completedQuestions[`${sectionLink}-${q.id}`]).length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  // Calculate total progress for the entire step
  const getTotalProgress = () => {
    let totalQuestions = 0;
    let totalCompleted = 0;

    sections.forEach(section => {
      const questions = mappedFiles[section.link]?.default || mappedFiles[section.link] || [];
      totalQuestions += questions.length;
      totalCompleted += questions.filter(q => completedQuestions[`${section.link}-${q.id}`]).length;
    });

    return {
      completed: totalCompleted,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? (totalCompleted / totalQuestions) * 100 : 0
    };
  };

  const { completed: stepCompleted, total: stepTotal, percentage: stepPercentage } = getTotalProgress();

  return (
    <>
      <Box sx={{ mb: 2, maxWidth: '1000px', mx: 'auto', px: 2 }}>
        {/* Step Header - Collapsible */}
        <Box
          onClick={handleTitleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            py: 2,
            px: 2,
            mb: isSectionsOpen ? 2 : 0,
            borderRadius: 2,
            backgroundColor: isSectionsOpen ? alpha(theme.palette.background.paper, 0.4) : 'transparent',
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

          {/* Step Progress Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: '200px', justifyContent: 'flex-end' }}>
            <Box sx={{ width: '100px', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={stepPercentage}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    backgroundColor: theme.palette.primary.main,
                  }
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: '45px', textAlign: 'right' }}>
              {stepCompleted} / {stepTotal}
            </Typography>
          </Box>
        </Box>

        {/* Sections List */}
        <Collapse in={isSectionsOpen}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2 }}>
            {sections.map((section, index) => {
              // We need to load questions to calculate progress even if not expanded
              // This is a trade-off. For now, we'll only show progress if questions are loaded.
              // Ideally, we should pre-load all questions or have metadata.
              // For this implementation, we will try to load them if they exist in mappedFiles
              const questions = mappedFiles[section.link]?.default || mappedFiles[section.link] || [];
              const { completed, total, percentage } = getSectionProgress(section.link, questions);

              return (
                <Box
                  key={section.subtitle}
                  sx={{
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    pb: 2,
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  {/* Section Header - Minimal Row */}
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
                        '& .section-title': {
                          color: theme.palette.primary.main,
                        }
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
                        className="section-title"
                        sx={{
                          fontWeight: 500,
                          fontSize: '1rem',
                          transition: 'color 0.2s ease',
                          color: expandedSections[section.link] ? 'text.primary' : 'text.secondary',
                        }}
                      >
                        {section.subtitle}
                      </Typography>
                    </Box>

                    {/* Progress Bar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: '200px', justifyContent: 'flex-end' }}>
                      <Box sx={{ width: '100px', mr: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              backgroundColor: theme.palette.primary.main,
                            }
                          }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: '45px', textAlign: 'right' }}>
                        {completed} / {total}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Questions Table */}
                  <Collapse in={expandedSections[section.link]}>
                    <Box sx={{ mt: 2, pl: 6 }}>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            {sectionQuestions[section.link]?.length > 0 ? (
                              sectionQuestions[section.link].map((question, qIndex) => (
                                <TableRow
                                  key={question.id}
                                  sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.05) }
                                  }}
                                >
                                  <TableCell padding="checkbox" sx={{ borderBottom: 'none' }}>
                                    <Checkbox
                                      checked={!!completedQuestions[`${section.link}-${question.id}`]}
                                      onChange={() => toggleCompletion(section.link, question.id)}
                                      icon={<Circle size={18} color={theme.palette.text.secondary} />}
                                      checkedIcon={<CheckCircle2 size={18} color={theme.palette.success.main} />}
                                      sx={{ p: 0.5 }}
                                    />
                                  </TableCell>
                                  <TableCell sx={{ borderBottom: 'none' }}>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: completedQuestions[`${section.link}-${question.id}`] ? 'text.secondary' : 'text.primary',
                                        textDecoration: completedQuestions[`${section.link}-${question.id}`] ? 'line-through' : 'none',
                                        fontWeight: 400
                                      }}
                                    >
                                      {question.title}
                                    </Typography>
                                  </TableCell>
                                  <TableCell align="right" sx={{ borderBottom: 'none' }}>
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                      {question.youtube && (
                                        <Tooltip title="Watch Video">
                                          <IconButton
                                            href={question.youtube}
                                            target="_blank"
                                            rel="noopener"
                                            size="small"
                                            sx={{ color: 'text.secondary', '&:hover': { color: '#ef4444' } }}
                                          >
                                            <Youtube size={16} />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                      {question.blog && (
                                        <Tooltip title="Read Article">
                                          <IconButton
                                            href={question.blog}
                                            target="_blank"
                                            rel="noopener"
                                            size="small"
                                            sx={{ color: 'text.secondary', '&:hover': { color: '#3b82f6' } }}
                                          >
                                            <FileText size={16} />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                      {question.practice && question.type && (
                                        <Tooltip title={`Solve on ${question.type}`}>
                                          <IconButton
                                            href={question.practice}
                                            target="_blank"
                                            rel="noopener"
                                            size="small"
                                            sx={{ p: 0.5 }}
                                          >
                                            <Avatar
                                              src={getPracticeLogo(question.type)}
                                              sx={{ width: 16, height: 16, filter: 'grayscale(100%)', '&:hover': { filter: 'none' } }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={3} sx={{ borderBottom: 'none', py: 4 }}>
                                  <EmptyState message="No questions loaded" description="Click to load questions" />
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Collapse>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      </Box>
    </>
  );
}

export default Reusable;