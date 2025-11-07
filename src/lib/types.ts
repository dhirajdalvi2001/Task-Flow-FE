export type UserDetails = {
  id: string | null;
  username: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
};

export type DashboardCharts = {
  cancelled_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  pending_tasks: number;
  tasks_due_in_three_days: number;
  tasks_overdue: number;
  total_tasks: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  priority: string;
  is_check_list: boolean;
  is_pinned: boolean;
  sequence: number;
};