import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
import { darkTheme } from '../theme';

function Landing() {
  const navigate = useNavigate();

  // Card data
  const sheets = [
    {
      title: 'Strivers A2Z Sheet',
      path: '/a2z',
    },
    {
      title: 'Strivers SDE Sheet',
      path: '/sde',
    },
    {
      title: 'Strivers 79 Sheet',
      path: '/79',
    },
    {
      title: 'Blind 75 Sheet',
      path: '/75',
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Gradient Background */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #121212 30%, #1c2526 90%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'linear-gradient(45deg, rgba(255, 98, 0, 0.1), rgba(255, 179, 0, 0.1))',
            filter: 'blur(100px)',
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
          {/* Disclaimer Note */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 6,
              borderRadius: 2,
              backgroundColor: 'rgba(29, 29, 29, 0.8)',
              border: '1px solid',
              borderColor: 'primary.main',
              boxShadow: '0 0 15px rgba(255, 98, 0, 0.3)',
            }}
          >
            <Typography variant="body1" color="text.secondary" align="center">
              This project is a clone of OLD TUF with GFG links attached. In no way do the creators of this project claim the originality of content. We advise you to buy TUF+ if you can, and if you can’t, this project is made for you.
            </Typography>
          </Paper>

          {/* Cards Section */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h1" gutterBottom>
              Coding Sheets
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Explore the best coding sheets curated by Striver to level up your skills!
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {sheets.map((sheet, index) => (
              <Grid
                size={{ xs: 6, sm: 6, md: 6 }} // Two cards per row
                key={sheet.title}
                component={motion.div}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Card
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'grey.800',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05) translateY(-5px)',
                      boxShadow: '0 8px 20px rgba(255, 98, 0, 0.3)',
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(29, 29, 29, 0.9)',
                      '& .card-title': { // Target the title on card hover
                        color: 'primary.main',
                      },
                    },
                  }}
                >
                  <CardActionArea onClick={() => navigate(sheet.path)}>
                    <CardContent sx={{ textAlign: 'center', py: 6, px: 4 }}>
                      <Typography
                        variant="h5"
                        component="div"
                        className="card-title" // Add className to target
                        sx={{
                          color: 'white',
                          fontWeight: 600,
                        }}
                      >
                        {sheet.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* GitHub Contribution Link */}
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              href="https://github.com/saqib40/old-tuf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                textTransform: 'none',
                fontSize: '1.1rem',
                py: 1,
                px: 3,
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  borderColor: '#FFB300',
                  color: '#FFB300',
                  backgroundColor: 'rgba(255, 98, 0, 0.1)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Contribute on GitHub
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Landing;