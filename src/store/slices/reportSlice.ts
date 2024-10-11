import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Report {
  id: string;
  title: string;
  type: 'CSR' | 'ESG';
  status: 'draft' | 'submitted' | 'approved';
  submissionDate: string;
}

interface ReportState {
  reports: Report[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: [],
  loading: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<Report[]>) => {
      state.reports = action.payload;
    },
    addReport: (state, action: PayloadAction<Report>) => {
      state.reports.push(action.payload);
    },
    updateReport: (state, action: PayloadAction<Report>) => {
      const index = state.reports.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setReports, addReport, updateReport, setLoading, setError } = reportSlice.actions;
export default reportSlice.reducer;