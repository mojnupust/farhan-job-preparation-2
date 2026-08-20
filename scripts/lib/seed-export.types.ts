/** Portable dump shapes. Source IDs are metadata only — never inserted into a new DB. */

export interface ExportedQuestionSet {
  sourceId: string;
  title: string;
  date: string;
  totalMarks: number;
  duration: number;
  subject: string;
  topics: string | null;
  sourceMaterial: string | null;
  markPerQuestion: number;
  negativeMark: number;
  isFree: boolean;
  isLive: boolean;
  isActive: boolean;
}

export interface QuestionSetDumpFile {
  kind: 'question-sets';
  exportedAt: string;
  source: {
    subExamCategoryId: string;
    name: string;
    slug: string;
    examCategoryName: string | null;
    examCategorySlug: string | null;
  };
  sets: ExportedQuestionSet[];
}

export interface ExportedQuestion {
  sourceId: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation: string | null;
  examName: string | null;
  subject: string | null;
  topic: string | null;
  subTopic: string | null;
  slug: string | null;
  frequencyTag: string | null;
  sortOrder: number;
}

export interface QuestionDumpFile {
  kind: 'questions';
  exportedAt: string;
  source: {
    questionSetId: string;
    title: string;
    date: string;
    subject: string;
    subExamCategory: {
      id: string;
      name: string;
      slug: string;
    };
    examCategory: {
      id: string;
      name: string;
      slug: string;
    };
  };
  questions: ExportedQuestion[];
}
