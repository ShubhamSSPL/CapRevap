# CAP System - Modular Feature Architecture

**Based on:** CAP System Complete Documentation
**Architecture Pattern:** Feature-First / Domain-Driven Design
**Date:** 2025-01-06

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Folder Structure](#folder-structure)
3. [Module List](#module-list)
4. [Module Template](#module-template)
5. [Shared Resources](#shared-resources)
6. [Module Communication](#module-communication)

---

## 1. ARCHITECTURE OVERVIEW

### Principle: Feature-First Organization

Instead of grouping by technical type (all components together, all services together), we group by business feature (module). Each module is self-contained with all its resources.

### Benefits
- **Scalability:** Easy to add/remove modules
- **Team Collaboration:** Different teams can work on different modules
- **Code Organization:** Related code stays together
- **Lazy Loading:** Modules can be loaded on-demand
- **Testing:** Each module can be tested independently
- **Configurable:** Modules can be enabled/disabled per degree

---

## 2. FOLDER STRUCTURE

```
frontend/src/
├── modules/                              # Feature Modules (Core)
│   ├── registration/                     # Module 1: Registration
│   │   ├── pages/                        # Page components
│   │   │   ├── RegistrationForm.tsx
│   │   │   ├── OTPVerification.tsx
│   │   │   └── RegistrationSuccess.tsx
│   │   ├── components/                   # Module-specific components
│   │   │   ├── PersonalDetailsSection.tsx
│   │   │   ├── CommunicationDetailsSection.tsx
│   │   │   └── PasswordSetup.tsx
│   │   ├── hooks/                        # Module-specific hooks
│   │   │   ├── useRegistration.ts
│   │   │   └── useOTPVerification.ts
│   │   ├── services/                     # Module-specific API calls
│   │   │   └── registration.service.ts
│   │   ├── store/                        # Module state slice
│   │   │   └── registrationSlice.ts
│   │   ├── types/                        # Module types
│   │   │   └── registration.types.ts
│   │   ├── utils/                        # Module utilities
│   │   │   └── validation.ts
│   │   ├── routes.tsx                    # Module routes
│   │   └── index.ts                      # Module barrel export
│   │
│   ├── candidate/                        # Module 2: Candidate
│   │   ├── features/                     # Sub-features within module
│   │   │   ├── application/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── ApplicationWizard.tsx
│   │   │   │   │   ├── PersonalDetails.tsx
│   │   │   │   │   ├── QualificationDetails.tsx
│   │   │   │   │   ├── ExamDetails.tsx
│   │   │   │   │   ├── BankDetails.tsx
│   │   │   │   │   ├── PhotoSignature.tsx
│   │   │   │   │   ├── DocumentUpload.tsx
│   │   │   │   │   └── PreviewConfirm.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── StepIndicator.tsx
│   │   │   │   │   ├── HSCMarksTable.tsx
│   │   │   │   │   └── DocumentUploadCard.tsx
│   │   │   │   ├── hooks/
│   │   │   │   ├── services/
│   │   │   │   └── store/
│   │   │   │
│   │   │   ├── option-form/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── OptionFormDashboard.tsx
│   │   │   │   │   ├── SearchChoiceCodes.tsx
│   │   │   │   │   ├── ManagePreferences.tsx
│   │   │   │   │   └── PreviewOptionForm.tsx
│   │   │   │   ├── components/
│   │   │   │   │   ├── ChoiceCodeSearchFilters.tsx
│   │   │   │   │   ├── PreferenceList.tsx
│   │   │   │   │   └── DragDropPreferences.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── seat-acceptance/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── SelfVerification.tsx
│   │   │   │   │   ├── ChooseOption.tsx
│   │   │   │   │   ├── PayFee.tsx
│   │   │   │   │   └── ConfirmAcceptance.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── pages/
│   │   │       │   └── CandidateDashboard.tsx
│   │   │       └── components/
│   │   │           ├── StatusCard.tsx
│   │   │           └── TimelineView.tsx
│   │   │
│   │   ├── components/                   # Candidate module shared components
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   │   ├── candidateSlice.ts
│   │   │   ├── applicationSlice.ts
│   │   │   ├── optionFormSlice.ts
│   │   │   └── seatAcceptanceSlice.ts
│   │   ├── types/
│   │   ├── routes.tsx
│   │   └── index.ts
│   │
│   ├── verification/                     # Module 3: Verification (AFC/E-Scrutiny)
│   │   ├── pages/
│   │   │   ├── VerificationDashboard.tsx
│   │   │   ├── ApplicationReview.tsx
│   │   │   ├── DocumentVerification.tsx
│   │   │   ├── CertificateVerification.tsx
│   │   │   └── SlotBookingManagement.tsx
│   │   ├── components/
│   │   │   ├── VerificationSteps.tsx
│   │   │   ├── DocumentViewer.tsx
│   │   │   └── VerificationActions.tsx
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── routes.tsx
│   │   └── index.ts
│   │
│   ├── merit-list/                       # Module 4: Merit List
│   │   ├── pages/
│   │   │   ├── ProvisionalMeritList.tsx
│   │   │   ├── FinalMeritList.tsx
│   │   │   └── MeritParameters.tsx
│   │   └── ...
│   │
│   ├── grievance/                        # Module 5: Grievance
│   │   ├── pages/
│   │   │   ├── CreateGrievance.tsx
│   │   │   ├── ViewGrievance.tsx
│   │   │   ├── GrievanceList.tsx
│   │   │   └── AdminReply.tsx
│   │   └── ...
│   │
│   ├── allotment/                        # Module 6: Allotment
│   │   ├── pages/
│   │   │   ├── AllotmentResults.tsx
│   │   │   ├── AllotmentLetter.tsx
│   │   │   └── VacancyReport.tsx
│   │   ├── services/
│   │   │   └── allotment-algorithm.service.ts
│   │   └── ...
│   │
│   ├── institute/                        # Module 7: Institute
│   │   ├── features/
│   │   │   ├── admission/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── ConfirmAdmission.tsx
│   │   │   │   │   ├── AdmissionLetter.tsx
│   │   │   │   │   └── CancelAdmission.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   ├── reports/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── AllotmentReport.tsx
│   │   │   │   │   ├── CompositeReport.tsx
│   │   │   │   │   └── InstituteSummary.tsx
│   │   │   │   └── ...
│   │   │   │
│   │   │   └── profile/
│   │   │       └── pages/
│   │   │           └── InstituteProfile.tsx
│   │   └── ...
│   │
│   ├── arc/                              # Module 8: ARC (Admission Reporting Center)
│   │   ├── pages/
│   │   │   ├── ARCDashboard.tsx
│   │   │   ├── SeatAcceptanceConfirmation.tsx
│   │   │   └── ARCReports.tsx
│   │   └── ...
│   │
│   ├── mv/                               # Module 9: Merit Verification
│   │   ├── pages/
│   │   │   ├── MVDashboard.tsx
│   │   │   ├── MeritListVerification.tsx
│   │   │   ├── InstituteVerification.tsx
│   │   │   └── MLVCertificate.tsx
│   │   └── ...
│   │
│   ├── payment/                          # Module 10: Payment
│   │   ├── pages/
│   │   │   ├── FeeCart.tsx
│   │   │   ├── PaymentGateway.tsx
│   │   │   ├── PaymentHistory.tsx
│   │   │   └── PaymentReceipt.tsx
│   │   ├── services/
│   │   │   ├── razorpay.service.ts
│   │   │   └── payment.service.ts
│   │   └── ...
│   │
│   ├── admin/                            # Module 11: Admin
│   │   ├── features/
│   │   │   ├── user-management/
│   │   │   ├── degree-config/
│   │   │   ├── reports/
│   │   │   ├── communications/
│   │   │   └── system-config/
│   │   └── ...
│   │
│   ├── support/                          # Module 12: Support/Ticketing
│   │   └── ...
│   │
│   ├── notification/                     # Module 13: Notifications
│   │   ├── pages/
│   │   │   └── NotificationCenter.tsx
│   │   ├── components/
│   │   │   ├── NotificationBell.tsx
│   │   │   └── NotificationItem.tsx
│   │   └── ...
│   │
│   └── account/                          # Module 14: Account Management
│       ├── pages/
│       │   ├── Login.tsx
│       │   ├── ForgotPassword.tsx
│       │   ├── ResetPassword.tsx
│       │   ├── ChangePassword.tsx
│       │   └── ProfileSettings.tsx
│       └── ...
│
├── shared/                               # Shared Resources
│   ├── components/                       # Reusable UI components
│   │   ├── forms/
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormDropdown.tsx
│   │   │   ├── FormDatePicker.tsx
│   │   │   ├── FormFileUpload.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── PublicLayout.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Alert.tsx
│   │   │   ├── DataTable.tsx
│   │   │   └── ...
│   │   └── feature/
│   │       ├── DocumentViewer.tsx
│   │       ├── PrintLayout.tsx
│   │       └── ...
│   │
│   ├── hooks/                            # Shared custom hooks
│   │   ├── useAuth.ts
│   │   ├── useDegreeConfig.ts
│   │   ├── usePermissions.ts
│   │   ├── useApi.ts
│   │   └── ...
│   │
│   ├── services/                         # Shared services
│   │   ├── api/
│   │   │   ├── base.service.ts
│   │   │   ├── http-client.ts
│   │   │   └── endpoints.ts
│   │   ├── storage/
│   │   │   └── local-storage.service.ts
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── helpers.ts
│   │   └── external/
│   │       ├── hsc-board.service.ts
│   │       └── neet.service.ts
│   │
│   ├── types/                            # Shared types
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── DegreeConfig.ts
│   │   │   ├── Common.ts
│   │   │   └── ...
│   │   ├── api/
│   │   │   ├── Request.ts
│   │   │   └── Response.ts
│   │   └── enums/
│   │       ├── UserRole.ts
│   │       ├── ApplicationStatus.ts
│   │       └── ...
│   │
│   ├── store/                            # Global store configuration
│   │   ├── store.ts                      # Store setup
│   │   ├── rootReducer.ts                # Combine all slices
│   │   └── slices/
│   │       ├── authSlice.ts
│   │       ├── degreeConfigSlice.ts
│   │       └── uiSlice.ts
│   │
│   ├── constants/                        # App-wide constants
│   │   ├── routes.ts
│   │   ├── config.ts
│   │   └── messages.ts
│   │
│   └── utils/                            # Utility functions
│       ├── date.utils.ts
│       ├── string.utils.ts
│       └── validation.utils.ts
│
├── config/                               # Configuration files
│   ├── theme.config.ts                   # Ant Design theme
│   ├── degreeConfigs/
│   │   ├── pharmacy.config.ts
│   │   ├── engineering.config.ts
│   │   └── medical.config.ts
│   └── env.config.ts
│
├── routes/                               # Route configuration
│   ├── index.tsx                         # Main router
│   ├── PublicRoutes.tsx
│   ├── PrivateRoutes.tsx
│   └── RoleBasedRoutes.tsx
│
├── App.tsx                               # Root component
├── main.tsx                              # Entry point
└── vite-env.d.ts                         # Vite types
```

---

## 3. MODULE LIST (14 Modules)

Based on CAP System documentation:

### 3.1 Registration Module
**Purpose:** Initial candidate registration and OTP verification
**Routes:** `/registration`, `/registration/verify-otp`, `/registration/success`
**Users:** Candidates (Public)

### 3.2 Candidate Module
**Purpose:** Complete candidate application lifecycle
**Sub-Features:**
- Application Form (10 steps)
- Option Form (CAP Rounds 1-4)
- Seat Acceptance
- Dashboard

**Routes:** `/candidate/*`
**Users:** Candidates (Authenticated)

### 3.3 Verification Module (AFC/E-Scrutiny)
**Purpose:** Document verification by Facilitation Centers
**Routes:** `/verification/*`
**Users:** AFC Officers, Sub-AFC Officers

### 3.4 Merit List Module
**Purpose:** Generate and publish merit lists
**Routes:** `/merit-list/*`
**Users:** Admin, Candidates (view only)

### 3.5 Grievance Module
**Purpose:** Ticket management system
**Routes:** `/grievance/*`
**Users:** All users

### 3.6 Allotment Module
**Purpose:** Seat allotment algorithm and results
**Routes:** `/allotment/*`
**Users:** Admin (execute), Candidates (view results)

### 3.7 Institute Module
**Purpose:** Institute admission confirmation
**Routes:** `/institute/*`
**Users:** Institute Staff

### 3.8 ARC Module
**Purpose:** Seat acceptance verification at ARCs
**Routes:** `/arc/*`
**Users:** ARC Officers

### 3.9 MV Module
**Purpose:** Merit verification by officers
**Routes:** `/mv/*`
**Users:** MV Officers, DTE, RO, ARA

### 3.10 Payment Module
**Purpose:** Fee payment processing
**Routes:** `/payment/*`
**Users:** Candidates, Institutes

### 3.11 Admin Module
**Purpose:** System administration
**Sub-Features:**
- User Management
- Degree Configuration
- Reports
- Communications
- System Config

**Routes:** `/admin/*`
**Users:** Admin, Super Admin

### 3.12 Support Module
**Purpose:** Support ticketing
**Routes:** `/support/*`
**Users:** All users

### 3.13 Notification Module
**Purpose:** SMS/Email notifications
**Routes:** `/notifications`
**Users:** All users (component in header)

### 3.14 Account Module
**Purpose:** Authentication and account management
**Routes:** `/login`, `/forgot-password`, `/profile`
**Users:** All users

---

## 4. MODULE TEMPLATE

Each module follows this structure:

```typescript
// modules/[module-name]/
//
// ├── features/              (for complex modules with sub-features)
// ├── pages/                 (page components)
// ├── components/            (module-specific components)
// ├── hooks/                 (module-specific hooks)
// ├── services/              (API calls for this module)
// ├── store/                 (Redux slice for this module)
// ├── types/                 (TypeScript types)
// ├── utils/                 (utility functions)
// ├── constants.ts           (module constants)
// ├── routes.tsx             (module route definitions)
// └── index.ts               (barrel export)
```

### Example: Registration Module

```typescript
// modules/registration/index.ts
export { default as RegistrationRoutes } from './routes';
export * from './types/registration.types';
export * from './hooks/useRegistration';

// modules/registration/routes.tsx
import { Route } from 'react-router-dom';
import RegistrationForm from './pages/RegistrationForm';
import OTPVerification from './pages/OTPVerification';
import RegistrationSuccess from './pages/RegistrationSuccess';

const RegistrationRoutes = (
  <Route path="/registration">
    <Route index element={<RegistrationForm />} />
    <Route path="verify-otp" element={<OTPVerification />} />
    <Route path="success" element={<RegistrationSuccess />} />
  </Route>
);

export default RegistrationRoutes;

// modules/registration/services/registration.service.ts
import { apiService } from '@/shared/services/api/base.service';
import { RegistrationData, RegistrationResponse } from '../types/registration.types';

export class RegistrationService {
  static async register(data: RegistrationData): Promise<RegistrationResponse> {
    return apiService.post('/api/registration/register', data);
  }

  static async verifyOTP(applicationId: string, otp: string) {
    return apiService.post('/api/registration/verify-otp', { applicationId, otp });
  }

  static async resendOTP(applicationId: string) {
    return apiService.post('/api/registration/resend-otp', { applicationId });
  }
}

// modules/registration/store/registrationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState } from '../types/registration.types';

const initialState: RegistrationState = {
  applicationId: null,
  mobileNumber: null,
  step: 1,
  isLoading: false,
  error: null,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setApplicationId: (state, action: PayloadAction<string>) => {
      state.applicationId = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.mobileNumber = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    resetRegistration: (state) => {
      return initialState;
    },
  },
});

export const { setApplicationId, setMobileNumber, nextStep, resetRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;

// modules/registration/hooks/useRegistration.ts
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegistrationService } from '../services/registration.service';
import { setApplicationId, setMobileNumber, nextStep } from '../store/registrationSlice';

export const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = async (data: RegistrationData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await RegistrationService.register(data);
      dispatch(setApplicationId(response.applicationId));
      dispatch(setMobileNumber(data.mobile));
      dispatch(nextStep());
      navigate('/registration/verify-otp');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (applicationId: string, otp: string) => {
    // ... implementation
  };

  return {
    register,
    verifyOTP,
    loading,
    error,
  };
};
```

---

## 5. SHARED RESOURCES

### 5.1 Shared Components

```typescript
// shared/components/forms/FormInput.tsx
import { useFormContext } from 'react-hook-form';
import { Input } from 'antd';

interface FormInputProps {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ name, label, required, ...props }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-field">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <Input
        {...register(name)}
        status={errors[name] ? 'error' : ''}
        {...props}
      />
      {errors[name] && <span className="error">{errors[name]?.message}</span>}
    </div>
  );
};
```

### 5.2 Shared Hooks

```typescript
// shared/hooks/useDegreeConfig.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/store/store';

export const useDegreeConfig = () => {
  const config = useSelector((state: RootState) => state.degreeConfig.current);

  return {
    config,
    isPharmacy: config?.degreeCode === 'PHARMACY',
    isEngineering: config?.degreeCode === 'ENGINEERING',
    isMedical: config?.degreeCode === 'MEDICAL',
  };
};
```

### 5.3 Shared Services

```typescript
// shared/services/api/base.service.ts
import axios, { AxiosInstance } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        // Handle errors globally
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: any): Promise<T> {
    return this.api.get(url, config);
  }

  post<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.api.post(url, data, config);
  }

  put<T>(url: string, data?: any, config?: any): Promise<T> {
    return this.api.put(url, data, config);
  }

  delete<T>(url: string, config?: any): Promise<T> {
    return this.api.delete(url, config);
  }
}

export const apiService = new ApiService();
```

---

## 6. MODULE COMMUNICATION

### 6.1 Through Redux Store
Modules communicate via shared Redux store:

```typescript
// Module A dispatches action
dispatch(setApplicationId('APP12345'));

// Module B reads from store
const applicationId = useSelector(state => state.registration.applicationId);
```

### 6.2 Through Services
Modules can call shared services:

```typescript
// Any module can call
import { DocumentService } from '@/shared/services/document.service';

const document = await DocumentService.upload(file);
```

### 6.3 Through Events
For loose coupling, use custom events:

```typescript
// Module A emits event
window.dispatchEvent(new CustomEvent('application:submitted', { detail: { id: 'APP123' } }));

// Module B listens
useEffect(() => {
  const handler = (e: CustomEvent) => {
    console.log('Application submitted:', e.detail.id);
  };
  window.addEventListener('application:submitted', handler);
  return () => window.removeEventListener('application:submitted', handler);
}, []);
```

---

## 7. MODULE ENABLEMENT (Per Degree)

Modules can be enabled/disabled based on degree configuration:

```typescript
// config/degreeConfigs/pharmacy.config.ts
export const pharmacyConfig: DegreeConfiguration = {
  // ... other config
  enabledModules: [
    'registration',
    'candidate',
    'verification',
    'merit-list',
    'grievance',
    'allotment',
    'institute',
    'arc',
    'mv',
    'payment',
    'admin',
    'support',
    'notification',
    'account',
  ],
};

// routes/index.tsx
const router = createBrowserRouter([
  // Only render routes for enabled modules
  degreeConfig.enabledModules.includes('registration') && RegistrationRoutes,
  degreeConfig.enabledModules.includes('candidate') && CandidateRoutes,
  // ...
].filter(Boolean));
```

---

## 8. LAZY LOADING MODULES

For better performance, lazy load module routes:

```typescript
// routes/index.tsx
import { lazy } from 'react';

const RegistrationRoutes = lazy(() => import('@/modules/registration/routes'));
const CandidateRoutes = lazy(() => import('@/modules/candidate/routes'));
const InstituteRoutes = lazy(() => import('@/modules/institute/routes'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <RouterProvider router={router} />
</Suspense>
```

---

## 9. MODULE CHECKLIST

When creating a new module:

- [ ] Create module folder under `src/modules/[module-name]`
- [ ] Add `pages/` folder with page components
- [ ] Add `components/` folder for module-specific components
- [ ] Add `services/` folder with API service file
- [ ] Add `store/` folder with Redux slice
- [ ] Add `types/` folder with TypeScript interfaces
- [ ] Add `hooks/` folder with custom hooks
- [ ] Create `routes.tsx` with module routes
- [ ] Create `index.ts` with barrel exports
- [ ] Register module routes in main router
- [ ] Add module slice to store
- [ ] Update navigation/menu to include module links
- [ ] Add module to degree configuration

---

## 10. BENEFITS OF THIS ARCHITECTURE

1. **Scalability:** Easy to add new modules without affecting others
2. **Maintainability:** Related code stays together
3. **Team Collaboration:** Different teams can work independently
4. **Code Reusability:** Shared components are centralized
5. **Lazy Loading:** Modules loaded on-demand for better performance
6. **Testing:** Each module can be tested in isolation
7. **Configurability:** Modules can be enabled/disabled per degree
8. **Clear Boundaries:** Well-defined module interfaces
9. **Reduced Coupling:** Modules don't depend on each other's internals
10. **Easy Debugging:** Issues isolated to specific modules

---

**Next Steps:**
1. Implement this folder structure
2. Create shared components library
3. Implement modules one by one following the template
4. Use the CAP flowcharts documentation for business logic

**Reference Documents:**
- [CAP_System_Compact_Diagrams (1).md](../CAP_System_Compact_Diagrams%20(1).md)
- [CAP_Simple_Flowcharts.md](../CAP_Simple_Flowcharts.md)
- [FRONTEND_ROADMAP.md](../FRONTEND_ROADMAP.md)
