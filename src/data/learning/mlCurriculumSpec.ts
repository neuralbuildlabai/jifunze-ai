/**
 * **Machine Learning Foundations and Practical ML** — second core tech library family for Jifunze.
 * Compiled by `machineLearningCurriculum.ts`; access tiers map to product layers (public starter → signed-in → premium depth).
 */

export type MlSpecModule = { title: string; lessons: string[] }

export type MlSpecCategory = {
  id: string
  title: string
  summary: string
  modules: MlSpecModule[]
}

export const ML_LIBRARY_FAMILY_TITLE = 'Machine Learning Foundations and Practical ML'

export const ML_CURRICULUM_SPEC: MlSpecCategory[] = [
  {
    id: 'machine-learning-foundations',
    title: 'Machine Learning Foundations',
    summary:
      'Definitions, data fundamentals, and realistic expectations—what ML means in practice before tooling and notebooks.',
    modules: [
      {
        title: 'What Machine Learning Is',
        lessons: [
          'What Machine Learning Means',
          'AI vs Machine Learning vs Deep Learning',
          'Supervised, Unsupervised, and Reinforcement Learning',
          'Real-World ML Use Cases',
        ],
      },
      {
        title: 'Data and Learning Basics',
        lessons: [
          'Features, Labels, and Training Data',
          'Patterns, Generalization, and Overfitting',
          'Training, Validation, and Testing',
          'Why Data Quality Matters',
        ],
      },
    ],
  },
  {
    id: 'core-ml-concepts',
    title: 'Core ML Concepts',
    summary:
      'Supervised vs unsupervised patterns—how common methods show up in products, analytics, and research workflows.',
    modules: [
      {
        title: 'Supervised Learning',
        lessons: [
          'Classification',
          'Regression',
          'Common Supervised Learning Problems',
          'Evaluating Supervised Models',
        ],
      },
      {
        title: 'Unsupervised Learning',
        lessons: [
          'Clustering',
          'Dimensionality Reduction',
          'Pattern Discovery',
          'Business and Research Use Cases',
        ],
      },
    ],
  },
  {
    id: 'model-quality-and-evaluation',
    title: 'Model Quality and Evaluation',
    summary:
      'Metrics that matter in context—failure modes that look good on paper until real-world drift and leakage appear.',
    modules: [
      {
        title: 'Measuring Model Performance',
        lessons: [
          'Accuracy, Precision, Recall, and F1',
          'Confusion Matrices',
          'Error Analysis',
          'When Accuracy Misleads',
        ],
      },
      {
        title: 'Model Reliability',
        lessons: [
          'Bias and Variance',
          'Overfitting and Underfitting',
          'Data Leakage',
          'Why Production ML Fails',
        ],
      },
    ],
  },
  {
    id: 'practical-ml-workflow',
    title: 'Practical ML Workflow',
    summary:
      'From problem framing to iteration—baseline models, oversight, and responsibility before scaling complexity.',
    modules: [
      {
        title: 'From Problem to Model',
        lessons: [
          'Defining the Problem',
          'Preparing the Data',
          'Choosing a Baseline',
          'Iterating on a Model',
        ],
      },
      {
        title: 'Responsible ML Practice',
        lessons: [
          'Interpreting Model Output',
          'Risks, Fairness, and Bias',
          'Monitoring and Drift Basics',
          'Human Oversight in ML Systems',
        ],
      },
    ],
  },
  {
    id: 'applied-ml-paths',
    title: 'Applied ML Paths',
    summary:
      'Where ML shows up in everyday products—and how professionals continue study without implying guaranteed mastery.',
    modules: [
      {
        title: 'ML in Everyday Products',
        lessons: [
          'Recommendations',
          'Forecasting',
          'Risk Scoring',
          'Personalization',
        ],
      },
      {
        title: 'From Foundations to Deeper Study',
        lessons: [
          'ML for Analytics',
          'ML for Engineering',
          'ML for AI Product Work',
          'Next Steps Into Deeper ML Learning',
        ],
      },
    ],
  },
]
