import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userID: null, 
  policyID: null, 
  option1: false,
  option2: false,
  dateRange: [null, null],
  selectedAssurances: {},
  assurances: [],
  totalPrice: 0,
  activeStep: 0,
};

const travelSlice = createSlice({
  name: "travel",
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setPolicyID: (state, action) => {
      state.policyID = action.payload; 
    },
    toggleOption1: (state) => {
      state.option1 = !state.option1;
      state.option2 = false;
    },
    toggleOption2: (state) => {
      state.option2 = !state.option2;
      state.option1 = false;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setAssurances: (state, action) => {
      state.assurances = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    toggleAssuranceSelection: (state, action) => {
      const { assuranceCode, isSelected } = action.payload;
      state.selectedAssurances[assuranceCode] = isSelected;

      state.totalPrice = Object.keys(state.selectedAssurances).reduce(
        (total, code) => {
          const assurance = state.assurances.find(
            (a) => a.assuranceCode === code
          );
          return total + (state.selectedAssurances[code] ? assurance.price : 0);
        },
        0
      );
    },
  },
});

export const {
  setUserID,
  setPolicyID,
  toggleOption1,
  toggleOption2,
  setDateRange,
  setAssurances,
  toggleAssuranceSelection,
  setActiveStep,
} = travelSlice.actions;

export default travelSlice.reducer;
