
export interface FormState {
    title: string;
    body: string;
  }
  
export type ActionType = 
    | { type: 'SET_FORM'; payload: Partial<FormState> }
    | { type: 'RESET_FORM' };