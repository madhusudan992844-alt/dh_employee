
export type AppScreen = 
  | 'SPLASH' 
  | 'ONBOARDING' 
  | 'WELCOME' 
  | 'LOGIN_SELECT' 
  | 'LOGIN_FACE' 
  | 'LOGIN_MPIN' 
  | 'REGISTRATION' 
  | 'DASHBOARD';

export type DashboardTab = 'HOME' | 'REPORTS' | 'LEAVE' | 'PROFILE';

export interface User {
  name: string;
  role: string;
  id: string;
  avatar: string;
  onDuty: boolean;
}

export interface AttendanceLog {
  id: string;
  type: 'SHIFT_START' | 'SHIFT_END' | 'BREAK_START' | 'BREAK_END';
  time: string;
  status?: string;
}

export interface LeaveRequest {
  id: string;
  type: 'Sick' | 'Casual' | 'Emergency' | 'WFH';
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}
