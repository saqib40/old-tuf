// import { Question } from '../types'; // We'll need to define this or use any
import { transformData } from './transformData';
// Adv Strings
import advStringsHard from '../data/sheets/a2z-sheet/adv-strings/hard.json';
// Arrays
import arraysEasy from '../data/sheets/a2z-sheet/arrays/easy.json';
import arraysMedium from '../data/sheets/a2z-sheet/arrays/medium.json';
import arraysHard from '../data/sheets/a2z-sheet/arrays/hard.json';
// Basics
import basicsLec1 from '../data/sheets/a2z-sheet/basics/lec1.json';
import basicsLec2 from '../data/sheets/a2z-sheet/basics/lec2.json';
import basicsLec3 from '../data/sheets/a2z-sheet/basics/lec3.json';
import basicsLec4 from '../data/sheets/a2z-sheet/basics/lec4.json';
import basicsLec5 from '../data/sheets/a2z-sheet/basics/lec5.json';
import basicsLec6 from '../data/sheets/a2z-sheet/basics/lec6.json';
// Binary Search
import bsLec1 from '../data/sheets/a2z-sheet/binary-search/lec1.json';
import bsLec2 from '../data/sheets/a2z-sheet/binary-search/lec2.json';
import bsLec3 from '../data/sheets/a2z-sheet/binary-search/lec3.json';
// Binary Trees
import btTraversals from '../data/sheets/a2z-sheet/binary-trees/traversals.json';
import btMedium from '../data/sheets/a2z-sheet/binary-trees/medium.json';
import btHard from '../data/sheets/a2z-sheet/binary-trees/hard.json';
// Bit Manipulation
import bitLec1 from '../data/sheets/a2z-sheet/bit-manipulation/lec1.json';
import bitLec2 from '../data/sheets/a2z-sheet/bit-manipulation/lec2.json';
import bitLec3 from '../data/sheets/a2z-sheet/bit-manipulation/lec3.json';
// BST
import bstLec1 from '../data/sheets/a2z-sheet/bst/lec1.json';
import bstLec2 from '../data/sheets/a2z-sheet/bst/lec2.json';
// DP
import dpLec1 from '../data/sheets/a2z-sheet/dp/lec1.json';
import dpLec2 from '../data/sheets/a2z-sheet/dp/lec2.json';
import dpLec3 from '../data/sheets/a2z-sheet/dp/lec3.json';
import dpLec4 from '../data/sheets/a2z-sheet/dp/lec4.json';
import dpLec5 from '../data/sheets/a2z-sheet/dp/lec5.json';
import dpLec6 from '../data/sheets/a2z-sheet/dp/lec6.json';
import dpLec7 from '../data/sheets/a2z-sheet/dp/lec7.json';
import dpLec8 from '../data/sheets/a2z-sheet/dp/lec8.json';
import dpLec9 from '../data/sheets/a2z-sheet/dp/lec9.json';
// Graphs
import graphsLec1 from '../data/sheets/a2z-sheet/graphs/lec1.json';
import graphsLec2 from '../data/sheets/a2z-sheet/graphs/lec2.json';
import graphsLec3 from '../data/sheets/a2z-sheet/graphs/lec3.json';
import graphsLec4 from '../data/sheets/a2z-sheet/graphs/lec4.json';
import graphsLec5 from '../data/sheets/a2z-sheet/graphs/lec5.json';
import graphsLec6 from '../data/sheets/a2z-sheet/graphs/lec6.json';
// Greedy
import greedyLec1 from '../data/sheets/a2z-sheet/greedy/lec1.json';
import greedyLec2 from '../data/sheets/a2z-sheet/greedy/lec2.json';
// Heaps
import heapsLec1 from '../data/sheets/a2z-sheet/heaps/lec1.json';
import heapsLec2 from '../data/sheets/a2z-sheet/heaps/lec2.json';
import heapsLec3 from '../data/sheets/a2z-sheet/heaps/lec3.json';
// Linked List
import llLec1 from '../data/sheets/a2z-sheet/linked_list/lec1.json';
import llLec2 from '../data/sheets/a2z-sheet/linked_list/lec2.json';
import llLec3 from '../data/sheets/a2z-sheet/linked_list/lec3.json';
import llLec4 from '../data/sheets/a2z-sheet/linked_list/lec4.json';
import llLec5 from '../data/sheets/a2z-sheet/linked_list/lec5.json';
// Recursion
import recLec1 from '../data/sheets/a2z-sheet/recursion/lec1.json';
import recLec2 from '../data/sheets/a2z-sheet/recursion/lec2.json';
import recLec3 from '../data/sheets/a2z-sheet/recursion/lec3.json';
// Sliding Window
import swLec1 from '../data/sheets/a2z-sheet/sliding-window-and-2p/lec1.json';
import swLec2 from '../data/sheets/a2z-sheet/sliding-window-and-2p/lec2.json';
// Sorting
import sorting1 from '../data/sheets/a2z-sheet/sorting/sorting1.json';
import sorting2 from '../data/sheets/a2z-sheet/sorting/sorting2.json';
// Stacks and Queues
import sqLec1 from '../data/sheets/a2z-sheet/stacks-and-queues/lec1.json';
import sqLec2 from '../data/sheets/a2z-sheet/stacks-and-queues/lec2.json';
import sqLec3 from '../data/sheets/a2z-sheet/stacks-and-queues/lec3.json';
import sqLec4 from '../data/sheets/a2z-sheet/stacks-and-queues/lec4.json';
// Strings
import stringsLec1 from '../data/sheets/a2z-sheet/strings/lec1.json';
import stringsLec2 from '../data/sheets/a2z-sheet/strings/lec2.json';
// Tries
import triesLec1 from '../data/sheets/a2z-sheet/tries/lec1.json';
import triesLec2 from '../data/sheets/a2z-sheet/tries/lec2.json';

const dataStore = {
  // Adv Strings
  'sheets/a2z-sheet/adv-strings/hard': transformData(advStringsHard, 'sheets/a2z-sheet/adv-strings/hard'),
  // Arrays
  'sheets/a2z-sheet/arrays/easy': transformData(arraysEasy, 'sheets/a2z-sheet/arrays/easy'),
  'sheets/a2z-sheet/arrays/medium': transformData(arraysMedium, 'sheets/a2z-sheet/arrays/medium'),
  'sheets/a2z-sheet/arrays/hard': transformData(arraysHard, 'sheets/a2z-sheet/arrays/hard'),
  // Basics
  'sheets/a2z-sheet/basics/lec1': transformData(basicsLec1, 'sheets/a2z-sheet/basics/lec1'),
  'sheets/a2z-sheet/basics/lec2': transformData(basicsLec2, 'sheets/a2z-sheet/basics/lec2'),
  'sheets/a2z-sheet/basics/lec3': transformData(basicsLec3, 'sheets/a2z-sheet/basics/lec3'),
  'sheets/a2z-sheet/basics/lec4': transformData(basicsLec4, 'sheets/a2z-sheet/basics/lec4'),
  'sheets/a2z-sheet/basics/lec5': transformData(basicsLec5, 'sheets/a2z-sheet/basics/lec5'),
  'sheets/a2z-sheet/basics/lec6': transformData(basicsLec6, 'sheets/a2z-sheet/basics/lec6'),
  // Binary Search
  'sheets/a2z-sheet/binary-search/lec1': transformData(bsLec1, 'sheets/a2z-sheet/binary-search/lec1'),
  'sheets/a2z-sheet/binary-search/lec2': transformData(bsLec2, 'sheets/a2z-sheet/binary-search/lec2'),
  'sheets/a2z-sheet/binary-search/lec3': transformData(bsLec3, 'sheets/a2z-sheet/binary-search/lec3'),
  // Binary Trees
  'sheets/a2z-sheet/binary-trees/traversals': transformData(btTraversals, 'sheets/a2z-sheet/binary-trees/traversals'),
  'sheets/a2z-sheet/binary-trees/medium': transformData(btMedium, 'sheets/a2z-sheet/binary-trees/medium'),
  'sheets/a2z-sheet/binary-trees/hard': transformData(btHard, 'sheets/a2z-sheet/binary-trees/hard'),
  // Bit Manipulation
  'sheets/a2z-sheet/bit-manipulation/lec1': transformData(bitLec1, 'sheets/a2z-sheet/bit-manipulation/lec1'),
  'sheets/a2z-sheet/bit-manipulation/lec2': transformData(bitLec2, 'sheets/a2z-sheet/bit-manipulation/lec2'),
  'sheets/a2z-sheet/bit-manipulation/lec3': transformData(bitLec3, 'sheets/a2z-sheet/bit-manipulation/lec3'),
  // BST
  'sheets/a2z-sheet/bst/lec1': transformData(bstLec1, 'sheets/a2z-sheet/bst/lec1'),
  'sheets/a2z-sheet/bst/lec2': transformData(bstLec2, 'sheets/a2z-sheet/bst/lec2'),
  // DP
  'sheets/a2z-sheet/dp/lec1': transformData(dpLec1, 'sheets/a2z-sheet/dp/lec1'),
  'sheets/a2z-sheet/dp/lec2': transformData(dpLec2, 'sheets/a2z-sheet/dp/lec2'),
  'sheets/a2z-sheet/dp/lec3': transformData(dpLec3, 'sheets/a2z-sheet/dp/lec3'),
  'sheets/a2z-sheet/dp/lec4': transformData(dpLec4, 'sheets/a2z-sheet/dp/lec4'),
  'sheets/a2z-sheet/dp/lec5': transformData(dpLec5, 'sheets/a2z-sheet/dp/lec5'),
  'sheets/a2z-sheet/dp/lec6': transformData(dpLec6, 'sheets/a2z-sheet/dp/lec6'),
  'sheets/a2z-sheet/dp/lec7': transformData(dpLec7, 'sheets/a2z-sheet/dp/lec7'),
  'sheets/a2z-sheet/dp/lec8': transformData(dpLec8, 'sheets/a2z-sheet/dp/lec8'),
  'sheets/a2z-sheet/dp/lec9': transformData(dpLec9, 'sheets/a2z-sheet/dp/lec9'),
  // Graphs
  'sheets/a2z-sheet/graphs/lec1': transformData(graphsLec1, 'sheets/a2z-sheet/graphs/lec1'),
  'sheets/a2z-sheet/graphs/lec2': transformData(graphsLec2, 'sheets/a2z-sheet/graphs/lec2'),
  'sheets/a2z-sheet/graphs/lec3': transformData(graphsLec3, 'sheets/a2z-sheet/graphs/lec3'),
  'sheets/a2z-sheet/graphs/lec4': transformData(graphsLec4, 'sheets/a2z-sheet/graphs/lec4'),
  'sheets/a2z-sheet/graphs/lec5': transformData(graphsLec5, 'sheets/a2z-sheet/graphs/lec5'),
  'sheets/a2z-sheet/graphs/lec6': transformData(graphsLec6, 'sheets/a2z-sheet/graphs/lec6'),
  // Greedy
  'sheets/a2z-sheet/greedy/lec1': transformData(greedyLec1, 'sheets/a2z-sheet/greedy/lec1'),
  'sheets/a2z-sheet/greedy/lec2': transformData(greedyLec2, 'sheets/a2z-sheet/greedy/lec2'),
  // Heaps
  'sheets/a2z-sheet/heaps/lec1': transformData(heapsLec1, 'sheets/a2z-sheet/heaps/lec1'),
  'sheets/a2z-sheet/heaps/lec2': transformData(heapsLec2, 'sheets/a2z-sheet/heaps/lec2'),
  'sheets/a2z-sheet/heaps/lec3': transformData(heapsLec3, 'sheets/a2z-sheet/heaps/lec3'),
  // Linked List
  'sheets/a2z-sheet/linked_list/lec1': transformData(llLec1, 'sheets/a2z-sheet/linked_list/lec1'),
  'sheets/a2z-sheet/linked_list/lec2': transformData(llLec2, 'sheets/a2z-sheet/linked_list/lec2'),
  'sheets/a2z-sheet/linked_list/lec3': transformData(llLec3, 'sheets/a2z-sheet/linked_list/lec3'),
  'sheets/a2z-sheet/linked_list/lec4': transformData(llLec4, 'sheets/a2z-sheet/linked_list/lec4'),
  'sheets/a2z-sheet/linked_list/lec5': transformData(llLec5, 'sheets/a2z-sheet/linked_list/lec5'),
  // Recursion
  'sheets/a2z-sheet/recursion/lec1': transformData(recLec1, 'sheets/a2z-sheet/recursion/lec1'),
  'sheets/a2z-sheet/recursion/lec2': transformData(recLec2, 'sheets/a2z-sheet/recursion/lec2'),
  'sheets/a2z-sheet/recursion/lec3': transformData(recLec3, 'sheets/a2z-sheet/recursion/lec3'),
  // Sliding Window
  'sheets/a2z-sheet/sliding-window-and-2p/lec1': transformData(swLec1, 'sheets/a2z-sheet/sliding-window-and-2p/lec1'),
  'sheets/a2z-sheet/sliding-window-and-2p/lec2': transformData(swLec2, 'sheets/a2z-sheet/sliding-window-and-2p/lec2'),
  // Sorting
  'sheets/a2z-sheet/sorting/sorting1': transformData(sorting1, 'sheets/a2z-sheet/sorting/sorting1'),
  'sheets/a2z-sheet/sorting/sorting2': transformData(sorting2, 'sheets/a2z-sheet/sorting/sorting2'),
  // Stacks and Queues
  'sheets/a2z-sheet/stacks-and-queues/lec1': transformData(sqLec1, 'sheets/a2z-sheet/stacks-and-queues/lec1'),
  'sheets/a2z-sheet/stacks-and-queues/lec2': transformData(sqLec2, 'sheets/a2z-sheet/stacks-and-queues/lec2'),
  'sheets/a2z-sheet/stacks-and-queues/lec3': transformData(sqLec3, 'sheets/a2z-sheet/stacks-and-queues/lec3'),
  'sheets/a2z-sheet/stacks-and-queues/lec4': transformData(sqLec4, 'sheets/a2z-sheet/stacks-and-queues/lec4'),
  // Strings
  'sheets/a2z-sheet/strings/lec1': transformData(stringsLec1, 'sheets/a2z-sheet/strings/lec1'),
  'sheets/a2z-sheet/strings/lec2': transformData(stringsLec2, 'sheets/a2z-sheet/strings/lec2'),
  // Tries
  'sheets/a2z-sheet/tries/lec1': transformData(triesLec1, 'sheets/a2z-sheet/tries/lec1'),
  'sheets/a2z-sheet/tries/lec2': transformData(triesLec2, 'sheets/a2z-sheet/tries/lec2'),
};

export default dataStore;
