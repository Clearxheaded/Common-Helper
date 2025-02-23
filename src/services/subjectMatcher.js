import { OpenAI } from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AP_SUBJECTS = {
  'AP Calculus AB': {
    description: 'First-year college calculus course focused on limits, derivatives, and integrals',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Limits and Continuity',
          topics: ['Limit Definition', 'Finding Limits', 'Continuity']
        },
        {
          name: 'Differentiation: Definition and Fundamental Properties',
          topics: ['Derivative Definition', 'Basic Differentiation Rules', 'Chain Rule']
        },
        {
          name: 'Differentiation: Composite, Implicit, and Inverse Functions',
          topics: ['Implicit Differentiation', 'Inverse Function Derivatives']
        },
        {
          name: 'Contextual Applications of Differentiation',
          topics: ['Related Rates', 'Optimization', 'Motion Problems']
        },
        {
          name: 'Analytical Applications of Differentiation',
          topics: ['Mean Value Theorem', 'Extreme Values', 'Curve Analysis']
        },
        {
          name: 'Integration and Accumulation of Change',
          topics: ['Antiderivatives', 'Definite Integrals', 'Fundamental Theorem of Calculus']
        },
        {
          name: 'Differential Equations',
          topics: ['Slope Fields', 'Separable Differential Equations']
        },
        {
          name: 'Applications of Integration',
          topics: ['Area', 'Volume', 'Average Value', 'Accumulation']
        }
      ],
      matchingNotes: 'Focuses on single-variable calculus concepts through integration'
    }
  },
  'AP Calculus BC': {
    description: 'Comprehensive calculus course covering AB topics plus advanced integration techniques and series',
    level: 'Very Advanced',
    syllabus: {
      units: [
        {
          name: 'Limits and Continuity',
          topics: ['Limit Definition', 'Finding Limits', 'Continuity']
        },
        {
          name: 'Differentiation: Definition and Fundamental Properties',
          topics: ['Derivative Definition', 'Basic Differentiation Rules', 'Chain Rule']
        },
        {
          name: 'Differentiation: Composite, Implicit, and Inverse Functions',
          topics: ['Implicit Differentiation', 'Inverse Function Derivatives']
        },
        {
          name: 'Contextual Applications of Differentiation',
          topics: ['Related Rates', 'Optimization', 'Motion Problems']
        },
        {
          name: 'Analytical Applications of Differentiation',
          topics: ['Mean Value Theorem', 'Extreme Values', 'Curve Analysis']
        },
        {
          name: 'Integration and Accumulation of Change',
          topics: ['Antiderivatives', 'Definite Integrals', 'Fundamental Theorem of Calculus']
        },
        {
          name: 'Differential Equations',
          topics: ['Slope Fields', 'Separable Differential Equations']
        },
        {
          name: 'Applications of Integration',
          topics: ['Area', 'Volume', 'Average Value', 'Accumulation']
        },
        {
          name: 'Parametric Equations, Polar Coordinates, and Vector-Valued Functions',
          topics: ['Parametric Curves', 'Polar Functions', 'Vector Functions']
        },
        {
          name: 'Infinite Sequences and Series',
          topics: ['Convergence Tests', 'Power Series', 'Taylor Series']
        }
      ],
      matchingNotes: 'Comprehensive calculus coverage including advanced topics not in AB'
    }
  },
  'AP Computer Science Principles': {
    description: 'Introduction to computing fundamentals, programming, and digital innovation',
    level: 'Intermediate',
    syllabus: {
      units: [
        {
          name: 'Computational Solution Design',
          topics: [
            'Problem Analysis',
            'Solution Planning',
            'Design Methodologies',
            'Solution Evaluation'
          ]
        },
        {
          name: 'Algorithms and Program Development',
          topics: [
            'Algorithm Design',
            'Programming Fundamentals',
            'Control Structures',
            'Data Manipulation'
          ]
        },
        {
          name: 'Abstraction in Program Development',
          topics: [
            'Data Abstraction',
            'Procedural Abstraction',
            'Object-Oriented Concepts',
            'APIs and Libraries'
          ]
        },
        {
          name: 'Code Analysis',
          topics: [
            'Program Testing',
            'Debugging Techniques',
            'Code Review',
            'Performance Evaluation'
          ]
        },
        {
          name: 'Computing Innovations',
          topics: [
            'Digital Technology Impact',
            'Emerging Technologies',
            'Data Processing',
            'Artificial Intelligence',
            'Cybersecurity'
          ]
        },
        {
          name: 'Responsible Computing',
          topics: [
            'Ethical Computing',
            'Collaborative Development',
            'Inclusive Practices',
            'Digital Privacy',
            'Social Impact'
          ]
        }
      ],
      matchingNotes: 'Focuses on broad computing concepts and programming fundamentals rather than advanced coding'
    }
  },
  'AP English': {
    description: 'Advanced composition and rhetorical analysis course',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Rhetorical Situation: Reading',
          topics: [
            'Writer Choice Analysis',
            'Context Evaluation',
            'Purpose Identification',
            'Audience Analysis'
          ]
        },
        {
          name: 'Rhetorical Situation: Writing',
          topics: [
            'Strategic Writing Choices',
            'Audience Targeting',
            'Purpose-driven Composition',
            'Situational Writing'
          ]
        },
        {
          name: 'Claims and Evidence: Reading',
          topics: [
            'Argument Analysis',
            'Evidence Identification',
            'Source Evaluation',
            'Supporting Details'
          ]
        },
        {
          name: 'Claims and Evidence: Writing',
          topics: [
            'Evidence Selection',
            'Claim Development',
            'Argument Construction',
            'Source Integration'
          ]
        },
        {
          name: 'Reasoning and Organization: Reading',
          topics: [
            'Argument Structure Analysis',
            'Development Patterns',
            'Logical Progression',
            'Organization Evaluation'
          ]
        },
        {
          name: 'Reasoning and Organization: Writing',
          topics: [
            'Logical Organization',
            'Commentary Development',
            'Argument Structure',
            'Coherence Strategies'
          ]
        },
        {
          name: 'Style: Reading',
          topics: [
            'Stylistic Analysis',
            'Purpose Impact',
            'Literary Devices',
            'Tone Evaluation'
          ]
        },
        {
          name: 'Style: Writing',
          topics: [
            'Word Choice',
            'Compositional Techniques',
            'Rhetorical Devices',
            'Style Development'
          ]
        }
      ],
      matchingNotes: 'Focuses on advanced rhetorical analysis and composition skills with emphasis on argument development'
    }
  },
  'AP Geography': {
    description: 'Analysis of human geography patterns, processes, and impacts',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Concepts and Processes',
          topics: [
            'Geographic Theories',
            'Geographic Models',
            'Spatial Concepts',
            'Applied Geography',
            'Theoretical Frameworks'
          ]
        },
        {
          name: 'Spatial Relationships',
          topics: [
            'Geographic Patterns',
            'Spatial Distribution',
            'Geographic Relationships',
            'Spatial Outcomes',
            'Pattern Analysis'
          ]
        },
        {
          name: 'Data Analysis',
          topics: [
            'Quantitative Data Interpretation',
            'Map Analysis',
            'Statistical Charts',
            'Satellite Imagery',
            'Infographic Interpretation'
          ]
        },
        {
          name: 'Source Analysis',
          topics: [
            'Qualitative Geographic Data',
            'Map Interpretation',
            'Photographic Analysis',
            'Landscape Analysis',
            'Visual Geographic Data'
          ]
        },
        {
          name: 'Scale Analysis',
          topics: [
            'Multi-scale Analysis',
            'Spatial Relationships',
            'Scale-dependent Processes',
            'Geographic Models',
            'Cross-scale Interactions'
          ]
        }
      ],
      matchingNotes: 'Focuses on human geography with emphasis on spatial analysis and data interpretation'
    }
  },
  'AP Chemistry': {
    description: 'College-level chemistry course covering physical and chemical processes',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Atomic Structure and Properties',
          topics: [
            'Atomic Theory',
            'Mass Spectroscopy',
            'Electron Configuration',
            'Periodic Trends'
          ]
        },
        {
          name: 'Molecular and Ionic Compound Structure',
          topics: [
            'Chemical Bonding',
            'VSEPR Theory',
            'Bond Polarity',
            'Intermolecular Forces'
          ]
        },
        {
          name: 'Chemical Reactions',
          topics: [
            'Reaction Types',
            'Net Ionic Equations',
            'Oxidation-Reduction',
            'Reaction Rates'
          ]
        },
        {
          name: 'Kinetics',
          topics: [
            'Reaction Rate Laws',
            'Rate Constants',
            'Activation Energy',
            'Mechanisms'
          ]
        },
        {
          name: 'Thermodynamics',
          topics: [
            'Enthalpy Changes',
            'Heat Capacity',
            'Entropy',
            'Gibbs Free Energy'
          ]
        },
        {
          name: 'Equilibrium',
          topics: [
            'Equilibrium Constants',
            'Reaction Quotient',
            'Le Chatelier Principle',
            'Solubility'
          ]
        },
        {
          name: 'Acids and Bases',
          topics: [
            'pH Scale',
            'Strong/Weak Acids-Bases',
            'Buffers',
            'Titrations'
          ]
        },
        {
          name: 'Applications of Thermodynamics',
          topics: [
            'Cell Potential',
            'Electrochemistry',
            'Electrolysis',
            'Free Energy'
          ]
        }
      ],
      matchingNotes: 'Comprehensive chemistry course with strong emphasis on laboratory work'
    }
  }
};

const SA_SUBJECTS = {
  'Mathematics': {
    description: 'Matric Mathematics',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Exponents and Surds',
          topics: ['Number System', 'Irrational Numbers', 'Exponents', 'Exponential Equations']
        },
        {
          name: 'Algebra',
          topics: ['Algebraic Expressions', 'Factorising', 'Quadratic Equations', 'Inequalities']
        },
        {
          name: 'Number Patterns and Sequences',
          topics: ['Arithmetic Sequences', 'Geometric Sequences', 'Series']
        },
        {
          name: 'Functions',
          topics: ['Function Notation', 'Basic Functions', 'Inverse Functions', 'Logarithmic Functions']
        },
        {
          name: 'Trigonometric Functions',
          topics: ['Trig Graphs', 'Amplitude', 'Period', 'Transformations']
        },
        {
          name: 'Finance',
          topics: ['Simple Interest', 'Compound Interest', 'Decay', 'Annuities']
        },
        {
          name: 'Calculus',
          topics: ['Average Gradient', 'Derivatives', 'Applications']
        },
        {
          name: 'Probability',
          topics: ['Theoretical Probability', 'Venn Diagrams', 'Tree Diagrams', 'Counting Principles']
        },
        {
          name: 'Analytical Geometry',
          topics: ['Line Equations', 'Circles', 'Inclination']
        },
        {
          name: 'Advanced Trigonometry',
          topics: ['Identities', 'Equations', 'Sine/Cosine Rules', '3D Problems']
        },
        {
          name: 'Euclidean Geometry',
          topics: ['Proportion', 'Similar Polygons']
        },
        {
          name: 'Statistics',
          topics: ['Central Tendency', 'Dispersion', 'Regression', 'Bivariate Data']
        }
      ],
      possibleMatches: ['AP Calculus AB', 'AP Calculus BC'],
      matchingNotes: 'Covers extensive pre-calculus topics and basic calculus concepts'
    }
  },
  'English': {
    description: 'Matric English',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Essays',
          topics: [
            'Narrative Essays',
            'Descriptive Essays',
            'Reflective Essays',
            'Discursive Essays',
            'Argumentative Essays',
            'Picture Essays',
            'Essay Structure and Planning'
          ]
        },
        {
          name: 'Longer Transactional Texts',
          topics: [
            'Formal Letters',
            'Informal Letters',
            'Letters to Press',
            'CV Writing',
            'Obituaries',
            'Reviews',
            'Newspaper Articles',
            'Magazine Articles',
            'Meeting Documents',
            'Formal Reports',
            'Dialogues',
            'Interviews',
            'Speeches'
          ]
        },
        {
          name: 'Shorter Transactional Texts',
          topics: [
            'Advertisements',
            'Invitation Cards',
            'Flyers',
            'Posters',
            'Diary Entries',
            'Postcards',
            'Instructions',
            'Directions'
          ]
        }
      ],
      possibleMatches: ['AP English'],
      matchingNotes: 'Focuses on practical writing skills and various text types with emphasis on structure and format'
    }
  },
  'Geography': {
    description: 'Matric Geography',
    level: 'Advanced',
    syllabus: {
      units: [
        {
          name: 'Climate and Weather',
          topics: [
            'Synoptic Weather Maps',
            'Global Winds',
            'Mid-latitude Cyclones',
            'Tropical Cyclones',
            'South African Climate Factors',
            'Ocean Currents Impact',
            'Local Climate',
            'City Climate'
          ]
        },
        {
          name: 'Geomorphology',
          topics: [
            'Fluvial Geomorphology',
            'Groundwater',
            'River Systems',
            'Drainage Basins',
            'River Profiles',
            'River Capture',
            'Catchment Management'
          ]
        },
        {
          name: 'Settlement Geography',
          topics: [
            'Rural Settlements',
            'Urban Settlements',
            'Settlement Functions',
            'Settlement Patterns',
            'Urban Structure',
            'Urban Problems',
            'Social and Environmental Justice'
          ]
        },
        {
          name: 'Economic Geography',
          topics: [
            'Primary Activities',
            'Secondary Activities',
            'Tertiary Activities',
            'Quaternary Activities',
            'South African Economy',
            'Data Analysis'
          ]
        },
        {
          name: 'Mapwork',
          topics: [
            'Map Calculations',
            'Topographic Maps',
            'Orthophoto Analysis',
            'GIS',
            'Geographical Analysis'
          ]
        }
      ],
      possibleMatches: ['AP Geography'],
      matchingNotes: 'Combines physical and human geography with strong emphasis on local context and practical skills'
    }
  }
};

const INTERNATIONAL_SUBJECTS = {
  'A-Level Mathematics': {
    description: 'Advanced mathematics course covering pure mathematics, mechanics, and statistics',
    level: 'Very Advanced',
    syllabus: {
      units: [
        {
          name: 'Pure Mathematics 1',
          topics: [
            'Quadratics',
            'Functions',
            'Coordinate Geometry',
            'Circular Measure',
            'Trigonometry',
            'Series',
            'Differentiation',
            'Integration'
          ]
        },
        {
          name: 'Pure Mathematics 2',
          topics: [
            'Advanced Algebra',
            'Logarithmic Functions',
            'Exponential Functions',
            'Advanced Trigonometry',
            'Further Differentiation',
            'Further Integration',
            'Numerical Solutions'
          ]
        },
        {
          name: 'Pure Mathematics 3',
          topics: [
            'Complex Numbers',
            'Vectors',
            'Differential Equations',
            'Advanced Integration',
            'Advanced Differentiation'
          ]
        },
        {
          name: 'Mechanics',
          topics: [
            'Forces and Equilibrium',
            'Kinematics',
            'Momentum',
            "Newton's Laws",
            'Energy and Power'
          ]
        },
        {
          name: 'Probability & Statistics 1',
          topics: [
            'Data Representation',
            'Permutations and Combinations',
            'Probability',
            'Discrete Random Variables',
            'Normal Distribution'
          ]
        },
        {
          name: 'Probability & Statistics 2',
          topics: [
            'Poisson Distribution',
            'Random Variables',
            'Continuous Random Variables',
            'Sampling and Estimation',
            'Hypothesis Testing'
          ]
        }
      ],
      matchingNotes: 'Comprehensive mathematics course with pure math, mechanics, and statistics components'
    }
  },
  'A-Level Computer Science': {
    description: 'Comprehensive computer science course covering theory and practical programming',
    level: 'Very Advanced',
    syllabus: {
      asLevel: {
        units: [
          {
            name: 'Information Representation',
            topics: [
              'Data Representation',
              'Multimedia Graphics and Sound',
              'Compression'
            ]
          },
          {
            name: 'Communication',
            topics: ['Networks', 'Internet']
          },
          {
            name: 'Hardware',
            topics: [
              'Computer Components',
              'Logic Gates',
              'Logic Circuits'
            ]
          },
          {
            name: 'Processor Fundamentals',
            topics: [
              'CPU Architecture',
              'Assembly Language',
              'Bit Manipulation'
            ]
          },
          {
            name: 'System Software',
            topics: [
              'Operating Systems',
              'Language Translators'
            ]
          },
          {
            name: 'Security and Ethics',
            topics: [
              'Data Security',
              'Data Integrity',
              'Ethics and Ownership'
            ]
          },
          {
            name: 'Databases',
            topics: [
              'Database Concepts',
              'DBMS',
              'DDL and DML'
            ]
          },
          {
            name: 'Algorithm Design',
            topics: [
              'Computational Thinking',
              'Algorithm Development'
            ]
          },
          {
            name: 'Data Types and Structures',
            topics: [
              'Basic Data Types',
              'Arrays',
              'Files',
              'Abstract Data Types'
            ]
          },
          {
            name: 'Programming',
            topics: [
              'Programming Basics',
              'Programming Constructs',
              'Structured Programming'
            ]
          },
          {
            name: 'Software Development',
            topics: [
              'Development Lifecycle',
              'Program Design',
              'Testing and Maintenance'
            ]
          }
        ]
      },
      aLevel: {
        units: [
          {
            name: 'Advanced Data Representation',
            topics: [
              'User-defined Types',
              'File Organization',
              'Floating-point Numbers'
            ]
          },
          {
            name: 'Advanced Communication',
            topics: [
              'Network Protocols',
              'Circuit/Packet Switching'
            ]
          },
          {
            name: 'Advanced Hardware',
            topics: [
              'Parallel Processing',
              'Virtual Machines',
              'Boolean Algebra'
            ]
          },
          {
            name: 'Advanced System Software',
            topics: [
              'OS Architecture',
              'Advanced Translation'
            ]
          },
          {
            name: 'Advanced Security',
            topics: [
              'Encryption',
              'Security Protocols',
              'Digital Certificates'
            ]
          },
          {
            name: 'Artificial Intelligence',
            topics: ['AI Fundamentals']
          },
          {
            name: 'Advanced Programming',
            topics: [
              'Programming Paradigms',
              'File Processing',
              'Exception Handling',
              'Recursion'
            ]
          }
        ]
      },
      matchingNotes: 'More comprehensive than AP CSP, covering both theoretical and practical aspects in depth'
    }
  },
  'A-Level Chemistry': {
    description: 'Advanced chemistry course covering physical, inorganic, and organic chemistry',
    level: 'Very Advanced',
    syllabus: {
      units: [
        {
          name: 'Physical Chemistry',
          topics: [
            'Atomic Structure',
            'Atoms, Molecules and Stoichiometry',
            'Chemical Bonding',
            'States of Matter',
            'Chemical Energetics',
            'Electrochemistry',
            'Equilibria',
            'Reaction Kinetics'
          ]
        },
        {
          name: 'Inorganic Chemistry',
          topics: [
            'Chemical Periodicity',
            'Group 2 Elements',
            'Group 17 Elements',
            'Nitrogen and Sulfur'
          ]
        },
        {
          name: 'Organic Chemistry',
          topics: [
            'Organic Chemistry Fundamentals',
            'Hydrocarbons',
            'Halogen Compounds',
            'Hydroxy Compounds',
            'Carbonyl Compounds',
            'Carboxylic Acids and Derivatives',
            'Nitrogen Compounds',
            'Polymerisation',
            'Organic Synthesis'
          ]
        },
        {
          name: 'Analysis',
          topics: [
            'Analytical Techniques',
            'Practical Skills'
          ]
        }
      ],
      matchingNotes: 'Comprehensive chemistry course covering theoretical and practical aspects'
    }
  }
};

async function matchSubject(saSubject) {
  try {
    // First verify the subject exists
    if (!SA_SUBJECTS[saSubject]) {
      throw new Error(`Subject "${saSubject}" not found in SA_SUBJECTS`);
    }

    // Verify possibleMatches exists
    const possibleMatches = SA_SUBJECTS[saSubject].possibleMatches || [];
    
    const prompt = `
    You are an expert in international education systems specializing in curriculum comparison, focusing on equivalency with AP (Advanced Placement) courses.
    
    Task: Analyze and compare this subject with AP equivalents to determine US system compatibility.
    IMPORTANT: You must respond with valid JSON only, following the exact format specified below.

    Subject: ${saSubject}
    Detailed Syllabus:
    ${JSON.stringify(SA_SUBJECTS[saSubject], null, 2)}

    Potential AP Matches:
    ${JSON.stringify(possibleMatches.map(match => ({
      subject: match,
      details: AP_SUBJECTS[match]
    })), null, 2)}

    Please perform a comprehensive analysis considering:

    1. Content Coverage (40% of evaluation):
    - Topic-by-topic comparison with AP curriculum
    - Depth of coverage relative to AP standards
    - Advanced concepts alignment
    - Practical components comparison

    2. Skills Development (30% of evaluation):
    - Critical thinking requirements for AP level
    - Analytical skills needed for US college preparation
    - Practical skills alignment
    - Research capabilities

    3. Academic Rigor (30% of evaluation):
    - Complexity relative to AP standards
    - Assessment methods comparison
    - College Board expectations
    - US higher education preparation

    You must format your entire response as a JSON object with these exact fields:
    {
      "subject": "subject name",
      "apMatches": [
        {
          "apSubject": "AP subject name",
          "matchPercentage": number (0-100),
          "contentOverlap": number (0-100),
          "skillsAlignment": number (0-100),
          "rigorComparison": number (0-100)
        }
      ],
      "bestMatch": {
        "apSubject": "best AP equivalent",
        "overallMatch": number (0-100)
      },
      "analysis": {
        "contentComparison": "detailed content analysis vs AP",
        "skillsComparison": "detailed skills analysis vs AP",
        "rigorComparison": "detailed rigor analysis vs AP"
      },
      "topicOverlap": {
        "fullyMatched": ["topics that match AP exactly"],
        "partiallyMatched": ["topics with partial AP overlap"],
        "uniqueToSubject": ["topics not in AP"],
        "uniqueToAP": ["topics only in AP curriculum"]
      },
      "recommendations": {
        "studentGuidance": "advice for US college preparation",
        "additionalPreparation": ["specific areas needing extra work for AP alignment"]
      }
    }

    Do not include any text before or after the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in international education systems. You must respond with valid JSON only, exactly matching the specified format. Do not include any additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error matching subject:', error);
    throw new Error(`Failed to match subject: ${error.message}`);
  }
}

export async function matchALevelSubject(aLevelSubject) {
  try {
    // First verify the subject exists
    if (!INTERNATIONAL_SUBJECTS[`A-Level ${aLevelSubject}`]) {
      throw new Error(`Subject "A-Level ${aLevelSubject}" not found in INTERNATIONAL_SUBJECTS`);
    }

    // Define AP subject mappings
    const apMappings = {
      'Computer Science': ['AP Computer Science Principles'],
      'Chemistry': ['AP Chemistry'],
      'Mathematics': ['AP Calculus AB', 'AP Calculus BC']
    };
    
    const prompt = `
    You are an expert in international education systems specializing in curriculum comparison, focusing on equivalency with AP (Advanced Placement) courses.
    
    Task: Analyze and compare this A-Level subject with AP equivalents to determine US system compatibility.
    IMPORTANT: You must respond with valid JSON only, following the exact format specified below.

    Subject: A-Level ${aLevelSubject}
    Detailed Syllabus:
    ${JSON.stringify(INTERNATIONAL_SUBJECTS[`A-Level ${aLevelSubject}`], null, 2)}

    Potential AP Matches:
    ${JSON.stringify(apMappings[aLevelSubject].map(match => ({
      subject: match,
      details: AP_SUBJECTS[match]
    })), null, 2)}

    Please perform a comprehensive analysis considering:

    1. Content Coverage (40% of evaluation):
    - Topic-by-topic comparison with AP curriculum
    - Depth of coverage relative to AP standards
    - Advanced concepts alignment
    - Practical components comparison

    2. Skills Development (30% of evaluation):
    - Critical thinking requirements for AP level
    - Analytical skills needed for US college preparation
    - Practical skills alignment
    - Research capabilities

    3. Academic Rigor (30% of evaluation):
    - Complexity relative to AP standards
    - Assessment methods comparison
    - College Board expectations
    - US higher education preparation

    You must format your entire response as a JSON object with these exact fields:
    {
      "subject": "subject name",
      "apMatches": [
        {
          "apSubject": "AP subject name",
          "matchPercentage": number (0-100),
          "contentOverlap": number (0-100),
          "skillsAlignment": number (0-100),
          "rigorComparison": number (0-100)
        }
      ],
      "bestMatch": {
        "apSubject": "best AP equivalent",
        "overallMatch": number (0-100)
      },
      "analysis": {
        "contentComparison": "detailed content analysis vs AP",
        "skillsComparison": "detailed skills analysis vs AP",
        "rigorComparison": "detailed rigor analysis vs AP"
      },
      "topicOverlap": {
        "fullyMatched": ["topics that match AP exactly"],
        "partiallyMatched": ["topics with partial AP overlap"],
        "uniqueToSubject": ["topics not in AP"],
        "uniqueToAP": ["topics only in AP curriculum"]
      },
      "recommendations": {
        "studentGuidance": "advice for US college preparation",
        "additionalPreparation": ["specific areas needing extra work for AP alignment"]
      }
    }

    Do not include any text before or after the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert in international education systems. You must respond with valid JSON only, exactly matching the specified format. Do not include any additional text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error matching A-Level subject:', error);
    throw new Error(`Failed to match A-Level subject: ${error.message}`);
  }
}

export {
  matchSubject,
  SA_SUBJECTS,
  AP_SUBJECTS,
  INTERNATIONAL_SUBJECTS
}; 