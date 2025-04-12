import { Container, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../theme';
import Reusable from '../components/reusable';

function A2Z() {
  const inputArray = {
    title: 'Step 3 : Solve Problems on Arrays [Easy -> Medium -> Hard]',
    sections: [
      { subtitle: 'Easy', link: 'sheets/a2z-sheet/arrays/easy' },
      { subtitle: 'Medium', link: 'sheets/a2z-sheet/arrays/medium' },
      { subtitle: 'Hard', link: 'sheets/a2z-sheet/arrays/hard' },
    ],
  };
  const inputSort={
    title: 'Step 2 : Learn Important Sorting Techiques',
    sections:[
      {subtitle : 'Lec 1: Sorting-1', link: 'sheets/a2z-sheet/sorting/sorting1'},
      {subtitle : 'Lec 2: Sorting-2', link: 'sheets/a2z-sheet/sorting/sorting2'},
    ],
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h1" gutterBottom>
            Striver's A2Z Sheet
          </Typography>
        </Box>
        <Reusable {...inputSort} />
        <Reusable {...inputArray} />
      </Container>
    </ThemeProvider>
  );
}

export default A2Z;