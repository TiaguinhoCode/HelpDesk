export type Department = {
  id: string;
  sector: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  department: Department;
  photo: string | null;
}
