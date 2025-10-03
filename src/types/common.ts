// src/types/common.ts
import { Company } from './company';

export interface CommonPageProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onAddCompany: () => void;
  userName: string;
  userRole: string;
  companies: Company[];
  activeCompany: Company;
  onCompanySwitch: (company: Company) => void;
  onLogout: () => void;
}