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
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Define dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Disclaimer Note */}
        <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 2 }}>
          <Typography variant="body1" color="text.secondary" align="center">
            This project is a clone of OLD TUF with GFG links attached. In no way do the creators of this project claim the originality of content. We advise you to buy TUF+ if you can, and if you can’t, this project is made for you.
          </Typography>
        </Paper>

        {/* Cards Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h1" gutterBottom>
            Coding Sheets
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The sheets from striver that you can go through
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {sheets.map((sheet) => (
            <Grid size={{ xs: 4, sm: 4, md: 3 }} key={sheet.title}>
              <Card
                sx={{
                  borderRadius: 2,
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardActionArea onClick={() => navigate(sheet.path)}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                      {sheet.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Landing;