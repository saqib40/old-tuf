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
  const inputll = {
    title : 'Step 6 : Learn LinkedList [Single, Double , Medium, Hard]',
    sections:[
      {subtitle: 'Lec 1: Learn 1D LinkedList', link : 'sheets/a2z-sheet/linked_list/lec1_1dll'},
      {subtitle : 'Lec 3: Medium Problems of Linked List', link:'sheets/a2z-sheet/linked_list/ll1'},
      //{subtitle : 'Lec 3: Medium Problems of'}
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
        <Reusable {...inputll} />
      </Container>
    </ThemeProvider>
  );
}

export default A2Z;