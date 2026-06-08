import { Quiz } from '../models/Quiz.js';

const seedQuizzesData = [
  {
    title: 'Java Core Basics',
    description: 'Test your fundamental understanding of Java syntax, memory usage, and object-oriented principles.',
    category: 'Java',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'java-basics',
    questions: [
      {
        questionText: 'Which of the following is NOT a primitive data type in Java?',
        options: ['int', 'boolean', 'String', 'char'],
        correctOptionIndex: 2
      },
      {
        questionText: 'What is the size of a float variable in Java?',
        options: ['8 bits', '16 bits', '32 bits', '64 bits'],
        correctOptionIndex: 2
      },
      {
        questionText: 'Which keyword is used to inherit a class in Java?',
        options: ['implements', 'extends', 'inherits', 'exports'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What is the default value of an instance variable of type object reference in Java?',
        options: ['0', 'null', 'undefined', 'void'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which garbage collection method is called manually in Java?',
        options: ['System.gc()', 'Runtime.gc()', 'Both are correct', 'None of the above'],
        correctOptionIndex: 2
      }
    ]
  },
  {
    title: 'Python Essentials',
    description: 'Challenge your Python knowledge on lists, tuples, functions, lambdas, and basic syntax.',
    category: 'Python',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'python-essentials',
    questions: [
      {
        questionText: 'How do you start a comment in Python?',
        options: ['//', '/*', '#', '--'],
        correctOptionIndex: 2
      },
      {
        questionText: 'Which data type is mutable in Python?',
        options: ['tuple', 'list', 'string', 'int'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What is the output of type(lambda x: x) in Python?',
        options: ["<class 'lambda'>", "<class 'function'>", "<class 'method'>", "<class 'object'>"],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which of the following functions converts a string to all lowercase in Python?',
        options: ['lower()', 'lowercase()', 'toLower()', 'casefold()'],
        correctOptionIndex: 0
      },
      {
        questionText: 'What is the correct way to import a module named "math"?',
        options: ['import math', 'include math', 'from math import *', 'using math'],
        correctOptionIndex: 0
      }
    ]
  },
  {
    title: 'JavaScript Mastery',
    description: 'Test your understanding of JavaScript scopes, types, equality comparisons, and arrays.',
    category: 'JavaScript',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'javascript-mastery',
    questions: [
      {
        questionText: 'Which keyword defines a block-scoped variable in modern JavaScript?',
        options: ['var', 'let', 'define', 'global'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What is the output of typeof null in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"number"'],
        correctOptionIndex: 2
      },
      {
        questionText: 'How do you write a strict equality comparison in JavaScript?',
        options: ['=', '==', '===', '!='],
        correctOptionIndex: 2
      },
      {
        questionText: 'Which of the following is NOT a JavaScript framework?',
        options: ['React', 'Vue', 'Angular', 'Django'],
        correctOptionIndex: 3
      },
      {
        questionText: 'What does the map() method return in JavaScript?',
        options: ['A new array', 'The original array modified', 'A single value', 'None of the above'],
        correctOptionIndex: 0
      }
    ]
  },
  {
    title: 'React Fundamentals',
    description: 'Assess your hooks proficiency, component lifecycles, and performance optimization concepts in React.',
    category: 'React',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'react-fundamentals',
    questions: [
      {
        questionText: 'What hook is used to handle side effects in a React functional component?',
        options: ['useState', 'useReducer', 'useEffect', 'useContext'],
        correctOptionIndex: 2
      },
      {
        questionText: 'What is the purpose of React keys?',
        options: ['To uniquely identify a sibling element in a list', 'To bind events', 'To style components', 'To create routes'],
        correctOptionIndex: 0
      },
      {
        questionText: 'How do you pass data down to child components in React?',
        options: ['Via State', 'Via Props', 'Via Context only', 'Via Redux only'],
        correctOptionIndex: 1
      },
      {
        questionText: 'In React, what represents a mutable state that can trigger re-renders?',
        options: ['Props', 'State', 'Ref', 'Constant'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which hook returns a memoized version of a callback function?',
        options: ['useMemo', 'useCallback', 'useRef', 'useReducer'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    title: 'SQL Databases',
    description: 'Verify your query-writing capabilities, filtering logic, table joins, and row counting functions.',
    category: 'SQL',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'sql-databases',
    questions: [
      {
        questionText: 'Which SQL statement is used to retrieve data from a database?',
        options: ['GET', 'SELECT', 'FETCH', 'EXTRACT'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which clause is used to filter records in an SQL query?',
        options: ['WHERE', 'HAVING', 'ORDER BY', 'GROUP BY'],
        correctOptionIndex: 0
      },
      {
        questionText: 'Which JOIN returns all rows from the left table and matched rows from the right table?',
        options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN'],
        correctOptionIndex: 1
      },
      {
        questionText: 'How do you insert a new record in a table?',
        options: ['ADD TO', 'INSERT INTO', 'UPDATE', 'CREATE'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which SQL function is used to count the number of rows?',
        options: ['SUM()', 'COUNT()', 'TOTAL()', 'AVG()'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    title: 'Git Version Control',
    description: 'Prove your Git command operations, commit processes, branch management, and remote workflows.',
    category: 'Git',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'git-version-control',
    questions: [
      {
        questionText: 'Which Git command initializes a new local repository?',
        options: ['git start', 'git init', 'git create', 'git clone'],
        correctOptionIndex: 1
      },
      {
        questionText: 'How do you save the current staging area into a commit?',
        options: ['git save', 'git push', 'git commit -m "msg"', 'git add'],
        correctOptionIndex: 2
      },
      {
        questionText: 'Which command shows the status of files in the working directory and staging area?',
        options: ['git log', 'git status', 'git show', 'git diff'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which command downloads remote branch content but does not merge it?',
        options: ['git pull', 'git fetch', 'git sync', 'git checkout'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What command is used to combine changes from one branch into another?',
        options: ['git combine', 'git merge', 'git join', 'git push'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Showcase your knowledge in sorting speeds, linear structures, search trees, and hash mappings.',
    category: 'DSA',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'dsa-fundamentals',
    questions: [
      {
        questionText: 'What is the worst-case time complexity of searching in a Binary Search Tree (BST)?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctOptionIndex: 2
      },
      {
        questionText: 'Which data structure operates on a Last-In, First-Out (LIFO) basis?',
        options: ['Queue', 'Stack', 'Linked List', 'Heap'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What is the time complexity of Quick Sort in the average case?',
        options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which traversal of a Binary Search Tree (BST) yields elements in sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctOptionIndex: 1
      },
      {
        questionText: 'What is the primary advantage of a Hash Table over a Balanced BST?',
        options: ['Better space efficiency', 'O(1) average lookup time', 'Guaranteed worst-case O(1) performance', 'Order preservation'],
        correctOptionIndex: 1
      }
    ]
  },
  {
    title: 'C++ Systems Programming',
    description: 'Test your understanding of dynamic memory operators, destructors, inheritance, and dynamic dispatch.',
    category: 'C++',
    creator: null,
    timeLimit: 10,
    passingScore: 60,
    isPublic: true,
    slug: 'cpp-programming',
    questions: [
      {
        questionText: 'Which header file is required for input/output operations in C++?',
        options: ['<iostream>', '<stdio.h>', '<conio.h>', '<string>'],
        correctOptionIndex: 0
      },
      {
        questionText: 'Which operator is used to allocate memory dynamically in C++?',
        options: ['malloc', 'alloc', 'new', 'create'],
        correctOptionIndex: 2
      },
      {
        questionText: 'What is a destructor in C++?',
        options: [
          'A function to initialize class members',
          'A function called to free memory when an object is destroyed',
          'A function to copy an object',
          'None of the above'
        ],
        correctOptionIndex: 1
      },
      {
        questionText: 'Which keyword is used to implement multiple inheritance in C++?',
        options: ['implements', 'extends', 'public / comma separated list of classes', 'None of the above'],
        correctOptionIndex: 2
      },
      {
        questionText: 'What is a virtual function in C++ used for?',
        options: [
          'To achieve runtime polymorphism',
          'To allocate static memory',
          'To create constant functions',
          'To speed up compile times'
        ],
        correctOptionIndex: 0
      }
    ]
  }
];

export const seedQuizzes = async () => {
  try {
    const quizCount = await Quiz.countDocuments();
    if (quizCount === 0) {
      console.log('🌱 Seeding default technical quizzes...');
      await Quiz.insertMany(seedQuizzesData);
      console.log('✅ Default quizzes successfully seeded!');
    } else {
      console.log('ℹ️ Quiz collection is not empty, skipping seeding.');
    }
  } catch (error) {
    console.error('❌ Error seeding quizzes:', error.message);
  }
};
