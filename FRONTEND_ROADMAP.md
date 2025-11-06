# FRONTEND ROADMAP - CAP Revamp Project
## Maharashtra Pharmacy Admission Portal - React Migration

**Project:** PH2025 Access Log System Revamp
**Current:** ASP.NET WebForms
**Target:** React + .NET Core API
**Configurable:** Multi-Degree Support (Pharmacy, Engineering, Medical, etc.)

---

## TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Design System - Header & Footer](#design-system---header--footer)
3. [Technology Stack](#technology-stack)
4. [Project Architecture](#project-architecture)
5. [Module-wise Implementation](#module-wise-implementation)
6. [Configurable Degree System](#configurable-degree-system)
7. [Component Library](#component-library)
8. [State Management](#state-management)
9. [API Structure](#api-structure)
10. [Phase-wise Development Plan](#phase-wise-development-plan)

---

## 1. PROJECT OVERVIEW

### Current System Analysis
- **Platform:** ASP.NET WebForms (.NET Framework 4.x)
- **Pages:** 400+ ASPX files
- **Modules:** 12 major modules
- **Users:** Candidates, Institutes, AFC, ARC, Admin, MV Officers
- **Current Degree:** Pharmacy (B.Pharm, Pharm.D)

### Target System
- **Frontend:** React 18+ with TypeScript
- **Backend:** .NET Core 8 Web API
- **Database:** SQL Server (migrated schema)
- **UI Framework:** Ant Design / Material-UI
- **State Management:** Redux Toolkit
- **Form Management:** React Hook Form + Yup
- **Multi-Degree:** Configurable for Pharmacy, Engineering, Medical, Arts, etc.

---

## 2. DESIGN SYSTEM - HEADER & FOOTER

### 2.1 Header Component

#### Logo Assets (from existing project)
```
Images/
├── WebsiteLogo.png        (Main Logo - Left)
├── ARAFINAL.png           (ARA Logo - Right)
├── DTE.ico                (Favicon)
```

#### Header Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo]  STATE COMMON ENTRANCE TEST CELL, GOV OF MAHARASHTRA [Logo]│
│          First Year UG Technical Course in B.Pharmacy & PG Pharm.D  │
│          Admissions A.Y. 2025                                       │
│                                                    Technical Helpline│
│                                                    (10:00 AM - 6 PM) │
│                                                +91-9175108612        │
│                                    cetcell.technicaledu@gmail.com   │
├─────────────────────────────────────────────────────────────────────┤
│  Home  |  Instructions  |  Important Dates  |  FAQs  |  Contact     │
└─────────────────────────────────────────────────────────────────────┘
```

#### React Component Structure
```tsx
// components/layout/Header.tsx
interface HeaderProps {
  degreeConfig: DegreeConfiguration;
  user?: User;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ degreeConfig, user, onLogout }) => {
  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo-left">
          <img src={degreeConfig.leftLogoUrl} alt="Logo" />
        </div>
        <div className="header-title">
          <h5>{degreeConfig.organizationName}</h5>
          <p>{degreeConfig.courseDescription} A.Y. {degreeConfig.admissionYear}</p>
        </div>
        <div className="logo-right">
          <img src={degreeConfig.rightLogoUrl} alt="Logo" />
        </div>
      </div>
      <div className="helpline-section">
        Technical Helpline: {degreeConfig.helplineNumbers.join(', ')}<br/>
        Email: {degreeConfig.helplineEmail}
      </div>
    </header>
  );
};
```

### 2.2 Footer Component

#### Footer Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│  STATE COMMON ENTRANCE TEST CELL, MAHARASHTRA STATE                 │
│  8th Floor, New Excelsior Building, A.K.Nayak Marg,                 │
│  Fort, Mumbai-400001. (M.S.)                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.3 Design Specifications

#### Color Palette
```css
:root {
  --primary-color: #0e3f8a;      /* Blue */
  --secondary-color: #b75b12;    /* Brown/Orange */
  --accent-color: #F6223F;       /* Red */
}
```

---

## 3. TECHNOLOGY STACK

### Frontend Stack
```json
{
  "core": {
    "react": "^18.2.0",
    "typescript": "^5.0.0",
    "react-router-dom": "^6.11.0"
  },
  "ui": {
    "antd": "^5.6.0",
    "styled-components": "^6.0.0"
  },
  "forms": {
    "react-hook-form": "^7.45.0",
    "yup": "^1.2.0"
  },
  "state": {
    "@reduxjs/toolkit": "^1.9.5",
    "react-redux": "^8.1.0"
  },
  "data": {
    "axios": "^1.4.0",
    "react-query": "^3.39.0"
  }
}
```

---

## 4. PROJECT ARCHITECTURE

### Folder Structure
```
cap-revamp/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │   ├── logos/
│   │   │   │   ├── pharmacy/
│   │   │   │   ├── engineering/
│   │   │   │   ├── medical/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header/
│   │   │   │   ├── Footer/
│   │   │   │   ├── Navigation/
│   │   │   ├── forms/
│   │   │   ├── layout/
│   │   ├── modules/
│   │   │   ├── registration/
│   │   │   ├── candidate/
│   │   │   ├── institute/
│   │   │   ├── afc/
│   │   │   ├── arc/
│   │   │   ├── admin/
│   │   ├── config/
│   │   │   ├── degreeConfigs/
│   │   │   │   ├── pharmacy.config.ts
│   │   │   │   ├── engineering.config.ts
│   │   ├── store/
│   │   ├── services/
│   │   ├── types/
│   │   ├── routes/
│   │   ├── App.tsx
├── backend/
│   ├── CAP.API/
│   ├── CAP.Application/
│   ├── CAP.Domain/
│   ├── CAP.Infrastructure/
```

---

## 5. MODULE-WISE IMPLEMENTATION

### 5.1 Registration Module (Priority 1)
- **Registration Form** (`/registration`)
  - Personal Details
  - Communication Details
  - Password Setup
  - Cascading Dropdowns (State > District > Taluka > Village)

- **OTP Verification** (`/registration/verify-otp`)
- **Registration Success**

### 5.2 Candidate Module (Priority 1)

#### Application Form (Multi-step Wizard)
1. **Personal & Category Details** (`/candidate/application/step-1`)
2. **Qualification Details** (`/candidate/application/step-2`)
   - SSC/HSC with marks table
   - Auto-calculation of percentages
   - "Get HSC Data" API integration
3. **Entrance Exam Details** (`/candidate/application/step-3`)
   - NEET Details with API
   - CET Details
4. **Bank Details** (`/candidate/application/step-4`)
5. **Photo & Signature Upload** (`/candidate/application/step-5`)
   - Image cropper component
6. **Document Upload** (`/candidate/application/step-6`)
   - Multi-document interface
7. **Preview & Confirm** (`/candidate/application/step-7`)
8. **Fee Payment** (`/candidate/application/fee-payment`)
9. **Print Application** (`/candidate/application/print`)

### 5.3 Option Form Module (Priority 1)
- **Search Choice Codes** (` /candidate/option-form/round-{n}/search`)
- **Manage Preferences** (`/candidate/option-form/round-{n}/preferences`)
  - Drag-and-drop ordering
- **Import from Previous Round**
- **Preview & Confirm**
- **Print Option Form**

### 5.4 Institute Module (Priority 2)
- **Confirm Admission** (`/institute/admission/confirm/:applicationId`)
  - Document checklist
  - Fee details entry
  - OTP verification
- **Admission Letter**
- **Cancel Admission**
- **Reports**

### 5.5 AFC Module (Priority 2)
- **Document Verification**
- **Edit Application**
- **Slot Booking Management**

### 5.6 ARC Module (Priority 2)
- **Seat Acceptance Confirmation**
- **Document Verification**

### 5.7 Admin Module (Priority 3)
- **User Management**
- **Degree Configuration Management**
- **Reports**
- **SMS/Email Management**

---

## 6. CONFIGURABLE DEGREE SYSTEM

### Degree Configuration Model

```typescript
export interface DegreeConfiguration {
  id: string;
  degreeCode: string; // 'PHARMACY', 'ENGINEERING', 'MEDICAL'
  degreeName: string;
  academicYear: string;

  // Branding
  organizationName: string;
  courseDescription: string;
  leftLogoUrl: string;
  rightLogoUrl: string;
  faviconUrl: string;

  // Contact
  helplineNumbers: string[];
  helplineEmail: string;
  footerAddress: string;

  // Theme
  primaryColor: string;
  secondaryColor: string;

  // Application Form Configuration
  applicationFormSteps: ApplicationFormStep[];
  entranceExams: EntranceExamConfig[];
  documentsRequired: DocumentRequirement[];
  categories: CategoryConfig[];
  homeUniversities: HomeUniversity[];
  capRounds: CAPRoundConfig[];
  feeStructure: FeeStructureConfig;
}
```

### Dynamic Form Rendering

```typescript
// components/forms/DynamicForm.tsx
export const DynamicForm: React.FC<{step: ApplicationFormStep}> = ({step}) => {
  const renderField = (field: FormFieldConfig) => {
    switch (field.fieldType) {
      case 'text': return <FormInput {...field} />;
      case 'dropdown': return <FormDropdown {...field} />;
      case 'date': return <FormDatePicker {...field} />;
      // ... other field types
    }
  };

  return (
    <form>
      {step.fields.map(field => renderField(field))}
    </form>
  );
};
```

---

## 7. COMPONENT LIBRARY

### Form Components to Build
1. **FormInput** - Text/Number/Email input
2. **FormDropdown** - Single select
3. **FormDatePicker** - Date picker
4. **FormCheckbox** - Checkbox
5. **FormRadio** - Radio buttons
6. **FormFileUpload** - File upload with preview
7. **FormImageCropper** - Image crop
8. **FormCascadingDropdown** - State > District > Taluka > Village
9. **FormOTP** - 6-digit OTP
10. **FormPasswordInput** - Password with strength meter

### Display Components
1. **DataTable** - Sortable, filterable table
2. **Card** - Info card
3. **StatCard** - Dashboard stats
4. **Alert** - Success/Error alerts
5. **Modal** - Dialog boxes
6. **DocumentViewer** - PDF/Image viewer
7. **PrintLayout** - Print-friendly layout

---

## 8. STATE MANAGEMENT

### Redux Store Structure

```typescript
export const store = configureStore({
  reducer: {
    auth: authReducer,
    degreeConfig: degreeConfigReducer,
    application: applicationReducer,
    optionForm: optionFormReducer,
    document: documentReducer,
    payment: paymentReducer,
  },
});
```

### Auth Slice Example
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
}
```

---

## 9. API STRUCTURE

### API Endpoints

```typescript
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/registration/register',
  VERIFY_OTP: '/api/registration/verify-otp',

  // Candidate
  APPLICATION: '/api/candidate/application',
  UPLOAD_PHOTO: '/api/candidate/upload/photo',
  GET_HSC_DATA: '/api/candidate/hsc-data',
  GET_NEET_DATA: '/api/candidate/neet-data',

  // Option Form
  SEARCH_CHOICE_CODES: (round: number) =>
    `/api/candidate/choice-codes/round-${round}/search`,

  // Institute
  CONFIRM_ADMISSION: '/api/institute/admission/confirm',

  // Masters
  STATES: '/api/masters/states',
  DISTRICTS: (stateId: string) => `/api/masters/districts/${stateId}`,
};
```

---

## 10. PHASE-WISE DEVELOPMENT PLAN

### PHASE 1: Foundation (Weeks 1-3)

#### Week 1: Project Setup
- [ ] Initialize React + TypeScript project
- [ ] Setup folder structure
- [ ] Install dependencies
- [ ] Configure Redux Toolkit
- [ ] Setup React Router
- [ ] Create base layouts
- [ ] Implement Header/Footer components

#### Week 2: Component Library
- [ ] Build all form components
- [ ] Implement form validation
- [ ] Create Storybook stories

#### Week 3: Authentication
- [ ] Login/Logout flow
- [ ] Protected Routes
- [ ] Role-based access
- [ ] Token management

### PHASE 2: Registration & Application (Weeks 4-8)

#### Week 4: Registration Module
- [ ] Registration form
- [ ] OTP verification
- [ ] Cascading dropdowns

#### Weeks 5-7: Application Form
- [ ] All 7 steps of application wizard
- [ ] HSC data fetch integration
- [ ] NEET data fetch integration
- [ ] Document upload with cropping

#### Week 8: Payment & Print
- [ ] Payment gateway integration
- [ ] Print application layout
- [ ] PDF generation

### PHASE 3: Option Form (Weeks 9-11)
- [ ] Choice code search with filters
- [ ] Drag-and-drop preferences
- [ ] Import from previous round
- [ ] Confirm & print

### PHASE 4: Institute Module (Weeks 12-14)
- [ ] Dashboard
- [ ] Confirm admission flow
- [ ] Document checklist
- [ ] Fee entry
- [ ] Reports

### PHASE 5: AFC & ARC Modules (Weeks 15-17)
- [ ] AFC document verification
- [ ] ARC seat acceptance
- [ ] Slot booking

### PHASE 6: Admin Module (Weeks 18-20)
- [ ] User management
- [ ] Degree configuration UI
- [ ] Reports
- [ ] SMS/Email management

### PHASE 7: Testing & Optimization (Weeks 21-22)
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Accessibility testing

### PHASE 8: Deployment (Weeks 23-24)
- [ ] CI/CD pipeline
- [ ] Staging deployment
- [ ] Production deployment
- [ ] Documentation

---

## KEY SUCCESS METRICS

- Page load time < 3 seconds
- Mobile responsiveness score > 90%
- Accessibility score > 90%
- Support for 10,000+ concurrent users
- 95% user satisfaction

---

**Document Version:** 1.0
**Last Updated:** 2025-01-06
**Status:** Ready for Implementation

---

## APPENDIX A: Complete Module List (from existing project)

### 12 Major Modules with 400+ Forms

1. **Registration Module** - Initial candidate registration
2. **Candidate Module** - Application form, documents, profile
3. **CandidateModuleCAPRound1/2/3/4** - Option form for each round
4. **Institute Module** - Admission confirmation, reports
5. **AFC Module** - Document verification at Facilitation Centers
6. **ARC Module** - Seat acceptance at Reporting Centers
7. **Admin Module** - System administration
8. **MV Module** - Merit verification
9. **Fee Process Module** - Payment gateway
10. **Grievance Module** - Ticket management
11. **CandidateAdmissionReportingModule** - Post-allotment reporting
12. **AccountRecoveryModule** - Password reset

For detailed form documentation, see [MODULE_DOCUMENTATION.md](./MODULE_DOCUMENTATION.md)
