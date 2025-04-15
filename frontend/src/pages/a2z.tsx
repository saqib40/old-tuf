import { Container, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '../theme';
import Reusable from '../components/reusable';

function A2Z() {
  const basics = {
    title : 'Step 1 : Learn the basics',
    sections : [
      {subtitle: 'Lec 1: Things to Know in C++/Java/Python or any language', link: 'sheets/a2z-sheet/basics/lec1'},
      {subtitle: 'Lec 2: Build-up Logical Thinking', link: 'sheets/a2z-sheet/basics/lec2'},
      {subtitle: 'Lec 3: Learn STL/Java-Collections or similar thing in your language', link: 'sheets/a2z-sheet/basics/lec3'},
      {subtitle: 'Lec 4: Know Basic Maths', link: 'sheets/a2z-sheet/basics/lec4'},
      {subtitle: 'Lec 5: Learn Basic Recursion', link: 'sheets/a2z-sheet/basics/lec5'},
      {subtitle: 'Lec 6: Learn Basic Hashing', link: 'sheets/a2z-sheet/basics/lec6'}
    ]
  }
  const inputArray = {
    title: 'Step 3 : Solve Problems on Arrays [Easy -> Medium -> Hard]',
    sections: [
      { subtitle: 'Easy', link: 'sheets/a2z-sheet/arrays/easy' },
      { subtitle: 'Medium', link: 'sheets/a2z-sheet/arrays/medium' },
      { subtitle: 'Hard', link: 'sheets/a2z-sheet/arrays/hard' },
    ]
  };
  const inputSort={
    title: 'Step 2 : Learn Important Sorting Techiques',
    sections:[
      {subtitle : 'Lec 1: Sorting-1', link: 'sheets/a2z-sheet/sorting/sorting1'},
      {subtitle : 'Lec 2: Sorting-2', link: 'sheets/a2z-sheet/sorting/sorting2'},
    ]
  };
  const inputll = {
    title : 'Step 6 : Learn LinkedList [Single, Double , Medium, Hard]',
    sections:[
      {subtitle: 'Lec 1: Learn 1D LinkedList', link : 'sheets/a2z-sheet/linked_list/lec1'},
      {subtitle: 'Lec 1: Learn Doubly LinkedList', link : 'sheets/a2z-sheet/linked_list/lec2'},
      {subtitle : 'Lec 3: Medium Problems of LL', link:'sheets/a2z-sheet/linked_list/lec3'},
      {subtitle: 'Lec 4: Medium Problems of DLL', link : 'sheets/a2z-sheet/linked_list/lec4'},
      {subtitle: 'Lec 5: Hard Problems of LL', link : 'sheets/a2z-sheet/linked_list/lec5'}
    ]
  };
  const inputBinaryTree = {
    title : 'Step 13 : Binary Trees [Traversals, Medium and Hard Problems]',
    sections:[
      {subtitle : 'Lec 1: Traversals', link: 'sheets/a2z-sheet/binary-trees/traversals'},
      {subtitle : 'Lec 2: Medium Problems', link: 'sheets/a2z-sheet/binary-trees/medium'},
      {subtitle : 'Lec 3: Hard Problems', link: 'sheets/a2z-sheet/binary-trees/hard'}
    ]
  };
  const inputString = {
    title : "Step 5 : String [Basic and Medium]",
    sections : [
      {subtitle : 'Lec 1: Basic and Easy String Problems', link: "sheets/a2z-sheet/strings/lec1"},
      {subtitle : 'Lec 2: Medium String Problems', link: "sheets/a2z-sheet/strings/lec2"}
    ]
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h1" gutterBottom>
            Striver's A2Z Sheet
          </Typography>
        </Box>
        <Reusable {...basics} />
        <Reusable {...inputSort} />
        <Reusable {...inputArray} />
        <Reusable {...inputString} />
        <Reusable {...inputll} />
        <Reusable {...inputBinaryTree} />
      </Container>
    </ThemeProvider>
  );
}

export default A2Z;