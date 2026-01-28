import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Button,
  IconButton,
  Collapse,
  useTheme,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  FileSpreadsheet,
  Code2,
  Sigma,
  Target,
  Github,
  X,
  AlertCircle
} from 'lucide-react';

// Disclaimer Banner Component
const DisclaimerBanner = () => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Box
        sx={{
          width: '100%',
          bgcolor: alpha('#f97316', 0.1), // Orange tint
          borderBottom: '1px solid',
          borderColor: alpha('#f97316', 0.2),
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <AlertCircle size={16} color="#f97316" style={{ marginRight: 8 }} />
        <Typography variant="body2" sx={{ color: 'text.primary', mr: 4, fontSize: '0.85rem' }}>
          This project is a clone of OLD TUF with GFG links attached. We advise you to buy TUF+ if you can.
        </Typography>
        <IconButton
          size="small"
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', right: 8, color: 'text.secondary' }}
        >
          <X size={16} />
        </IconButton>
      </Box>
    </Collapse>
  );
};

function Landing() {
  const navigate = useNavigate();
  const theme = useTheme();

  // Card data with icons and descriptions
  const sheets = [
    {
      title: 'Strivers A2Z Sheet',
      description: 'Complete roadmap to master DSA from basics to advanced topics.',
      path: '/a2z',
      icon: FileSpreadsheet,
      color: '#3b82f6', // Blue
    },
    {
      title: 'Strivers SDE Sheet',
      description: 'Top 180+ coding interview questions for SDE roles.',
      path: '/sde',
      icon: Code2,
      color: '#10b981', // Emerald
    },
    {
      title: 'Strivers 79 Sheet',
      description: 'Curated list of 79 most important DSA problems.',
      path: '/79',
      icon: Sigma,
      color: '#8b5cf6', // Violet
    },
    {
      title: 'Blind 75 Sheet',
      description: 'The famous Blind 75 list for technical interviews.',
      path: '/75',
      icon: Target,
      color: '#f43f5e', // Rose
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)',
          position: 'relative',
          overflowX: 'hidden',
        }}
      >
        <DisclaimerBanner />

        {/* Background Glow Effects */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(60px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  background: 'linear-gradient(to right, #fff, #94a3b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                Coding Sheets
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  maxWidth: '600px',
                  mx: 'auto',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Master Data Structures and Algorithms with curated problem lists from Striver.
              </Typography>
            </motion.div>
          </Box>

          {/* Cards Grid */}
          <Grid
            container
            spacing={3}
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sheets.map((sheet) => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={sheet.title} component={motion.div} variants={cardVariants}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'visible',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 20px 40px -10px ${alpha(sheet.color, 0.3)}`,
                      borderColor: alpha(sheet.color, 0.5),
                      '& .icon-box': {
                        backgroundColor: alpha(sheet.color, 0.2),
                        color: sheet.color,
                      }
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(sheet.path)}
                    sx={{ height: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                  >
                    <Box
                      className="icon-box"
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.background.paper, 0.5),
                        color: 'text.secondary',
                        mb: 2,
                        transition: 'all 0.3s ease',
                        border: `1px solid ${alpha('#fff', 0.05)}`,
                      }}
                    >
                      <sheet.icon size={32} strokeWidth={1.5} />
                    </Box>
                    <CardContent sx={{ p: 0, width: '100%' }}>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                        {sheet.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {sheet.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Footer / Contribute */}
          <Box sx={{ textAlign: 'center', mt: 12 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                variant="outlined"
                startIcon={<Github size={20} />}
                href="https://github.com/saqib40/old-tuf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: 'divider',
                  color: 'text.secondary',
                  px: 4,
                  py: 1.5,
                  borderRadius: 50,
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Contribute on GitHub
              </Button>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Landing;