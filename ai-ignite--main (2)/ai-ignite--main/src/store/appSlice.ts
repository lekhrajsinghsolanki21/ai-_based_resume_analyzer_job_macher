import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailedMatch {
  category: string;
  matches: string[];
  missing: string[];
  score: number;
}

interface Course {
  title: string;
  platform: string;
  duration: string;
  rating: string;
}

interface CandidateResult {
  id: string;
  name: string;
  atsScore: number;
  detailedMatcher: DetailedMatch[];
  feedback: string;
  enhancements: string[];
  recommendedCourses: Course[];
  isInvalid?: boolean;
  errorMessage?: string;
}

interface AppState {
  activeTab: string;
  isDark: boolean;
  analysis: {
    jobTitle: string;
    skillsRequired: string;
    location: string;
    isAnalyzing: boolean;
    progress: number;
    results: CandidateResult[];
  };
}

const initialState: AppState = {
  activeTab: 'home',
  isDark: false,
  analysis: {
    jobTitle: '',
    skillsRequired: '',
    location: '',
    isAnalyzing: false,
    progress: 0,
    results: [],
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
    setJobDetails: (state, action: PayloadAction<{ jobTitle?: string; skillsRequired?: string; location?: string }>) => {
      state.analysis = { ...state.analysis, ...action.payload };
    },
    startAnalysis: (state) => {
      state.analysis.isAnalyzing = true;
      state.analysis.progress = 0;
      state.analysis.results = [];
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.analysis.progress = action.payload;
    },
    completeAnalysis: (state, action: PayloadAction<CandidateResult[]>) => {
      state.analysis.isAnalyzing = false;
      state.analysis.progress = 100;
      state.analysis.results = action.payload;
    },
    resetAnalysis: (state) => {
      state.analysis.isAnalyzing = false;
      state.analysis.progress = 0;
      state.analysis.results = [];
    },
  },
});

export const { 
  setActiveTab, 
  toggleDarkMode, 
  setDarkMode, 
  setJobDetails, 
  startAnalysis, 
  updateProgress, 
  completeAnalysis,
  resetAnalysis
} = appSlice.actions;

export default appSlice.reducer;
