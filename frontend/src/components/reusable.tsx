// this is a reusable component
// made to be used across the whole application
// takes i/p as title and subtitles 
// and each subtitle will have corresponding link to a json file from the "data" section

import { useState } from 'react';
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
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../theme';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DescriptionIcon from '@mui/icons-material/Description';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

// Load all JSON files using Vite's import.meta.glob
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
  type: 'gfg' | 'leetcode' | 'codingninja' | '';
}

interface Section {
  subtitle: string;
  link: string; // e.g., 'sheets/a2z-sheet/arrays/easy'
}

interface Input {
  title: string;
  sections: Section[];
}

function Reusable({ title, sections }: Input) {
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [sectionQuestions, setSectionQuestions] = useState<Record<string, Question[]>>({});

  // Toggle sections visibility
  const handleTitleClick = () => {
    setIsSectionsOpen(!isSectionsOpen);
    if (!isSectionsOpen) {
      setExpandedSections({}); // Reset expanded sections when closing
      setSectionQuestions({}); // Clear questions
    }
  };

  // Toggle a section and load its questions
  const handleSectionClick = (sectionLink: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionLink]: !prev[sectionLink], // Toggle the section
    }));

    // If the section is being expanded and questions aren't loaded yet, fetch them
    if (!expandedSections[sectionLink] && !sectionQuestions[sectionLink]) {
      try {
        const data = mappedFiles[sectionLink];
        if (data) {
          setSectionQuestions((prev) => ({
            ...prev,
            [sectionLink]: data.default || data,
          }));
        } else {
          console.warn(`No data found for ${sectionLink}`);
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

  // Map question type to logo image
  const getPracticeLogo = (type: Question['type']) => {
    switch (type) {
      case 'gfg':
        return 'GeeksForGeeks_logo.png';
      case 'leetcode':
        return 'LeetCode_logo_white.png';
      case 'codingninja':
        return 'codingninja_logo.png';
      default:
        return undefined;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ mb: 4 }}>
        {/* Title */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid',
            borderColor: 'grey.800',
            pb: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              cursor: 'pointer',
              fontWeight: 600,
              color: 'white',
              flexGrow: 1,
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={handleTitleClick}
          >
            {title}
          </Typography>
          {isSectionsOpen ? (
            <KeyboardArrowDown sx={{ color: 'white' }} />
          ) : (
            <KeyboardArrowRight sx={{ color: 'white' }} />
          )}
        </Box>

        {/* Sections */}
        <Collapse in={isSectionsOpen}>
          <Box sx={{ pl: 2, mb: 2 }}>
            {sections.map((section) => (
              <Box key={section.subtitle}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid',
                    borderColor: expandedSections[section.link] ? 'grey.600' : 'grey.800',
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    mb: 1,
                    backgroundColor: expandedSections[section.link]
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'transparent',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      cursor: 'pointer',
                      color: expandedSections[section.link] ? 'white' : 'grey.400',
                      flexGrow: 1,
                      '&:hover': { color: 'grey.300' },
                    }}
                    onClick={() => handleSectionClick(section.link)}
                  >
                    {section.subtitle}
                  </Typography>
                  {expandedSections[section.link] ? (
                    <KeyboardArrowDown sx={{ color: expandedSections[section.link] ? 'white' : 'grey.400' }} />
                  ) : (
                    <KeyboardArrowRight sx={{ color: expandedSections[section.link] ? 'white' : 'grey.400' }} />
                  )}
                </Box>

                {/* Questions Table for this Section */}
                <Collapse in={expandedSections[section.link]}>
                  <TableContainer sx={{ mb: 2 }}>
                    <Table sx={{ minWidth: 650, backgroundColor: 'background.paper' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'grey.400', fontWeight: 'bold' }}>
                            Problem
                          </TableCell>
                          <TableCell
                            sx={{ color: 'grey.400', fontWeight: 'bold' }}
                            align="center"
                          >
                            Youtube
                          </TableCell>
                          <TableCell
                            sx={{ color: 'grey.400', fontWeight: 'bold' }}
                            align="center"
                          >
                            Blog
                          </TableCell>
                          <TableCell
                            sx={{ color: 'grey.400', fontWeight: 'bold' }}
                            align="center"
                          >
                            Practice
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sectionQuestions[section.link]?.length > 0 ? (
                          sectionQuestions[section.link].map((question: Question) => (
                            <TableRow key={question.id}>
                              <TableCell sx={{ color: 'white' }}>
                                {question.title}
                              </TableCell>
                              <TableCell align="center">
                                {question.youtube && question.youtube.trim() ? (
                                  <IconButton
                                    href={question.youtube}
                                    target="_blank"
                                    rel="noopener"
                                    sx={{ color: 'orange' }}
                                  >
                                    <YouTubeIcon />
                                  </IconButton>
                                ) : (
                                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    -
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {question.blog && question.blog.trim() ? (
                                  <IconButton
                                    href={question.blog}
                                    target="_blank"
                                    rel="noopener"
                                    sx={{ color: 'grey.400' }}
                                  >
                                    <DescriptionIcon />
                                  </IconButton>
                                ) : (
                                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    -
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {question.practice && question.practice.trim() && question.type && question.type.trim() ? (
                                  <IconButton
                                    href={question.practice}
                                    target="_blank"
                                    rel="noopener"
                                  >
                                    <Avatar
                                      src={getPracticeLogo(question.type)}
                                      alt={`${question.type} logo`}
                                      sx={{ width: 24, height: 24 }}
                                    />
                                  </IconButton>
                                ) : (
                                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    -
                                  </Typography>
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              sx={{ color: 'grey.400', textAlign: 'center' }}
                            >
                              No questions found or failed to load.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Box>
    </ThemeProvider>
  );
}

export default Reusable;