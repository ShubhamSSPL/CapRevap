# CAP SYSTEM - SIMPLE FLOWCHARTS

**Document Version:** 1.0  
**Date:** November 5, 2025

---

## 1. OVERALL CAP PROCESS FLOWCHART

```
START
  ↓
Registration (1-2 days)
  ↓
Application Form (7-10 days)
  ↓
Verification (7-15 days)
  ↓
Provisional Merit List (1 day)
  ↓
Grievance Period (3-4 days)
  ↓
Final Merit List (1 day)
  ↓
CAP Round I (14-21 days)
  ↓
Vacancy Report (1-2 days)
  ↓
CAP Round II (14-21 days)
  ↓
Vacancy Report (1-2 days)
  ↓
CAP Round III (14-21 days)
  ↓
END

Total Time: 10-12 weeks
```

---

## 2. REGISTRATION FLOWCHART

```
START
  ↓
Enter Exam Details
  ↓
Validate Exam Score ──NO→ Error: Not Eligible → END
  ↓ YES
Enter Personal Details
  ↓
Enter Mobile & Email
  ↓
Check Duplicate ──YES→ Error: Already Registered → END
  ↓ NO
Create Password
  ↓
Generate & Send OTP
  ↓
Enter OTP
  ↓
Verify OTP ──NO→ Retry (Max 3) → END
  ↓ YES
Generate Application ID
  ↓
Send Confirmation (SMS/Email)
  ↓
END (Success)
```

---

## 3. VERIFICATION FLOWCHART (E-Scrutiny)

```
START
  ↓
Application Submitted
  ↓
Auto-Assign to Officer
  ↓
Officer Reviews Documents
  ↓
Verify 7 Steps:
1. Personal Details
2. Candidature Type
3. Category
4. Special Reservations
5. Qualifications
6. Entrance Exam
7. Photo/Signature
  ↓
Mandatory Issue? ──YES→ REVERT to Candidate → Wait for Correction
  ↓ NO                                              ↓
Optional Issue? ──YES→ Remove Benefit           Re-Submit
  ↓ NO              ↓                              ↓
Full Confirmation   Provisional Confirmation    Re-Verify
  ↓                 ↓                              ↓
Generate Acknowledgement ←─────────────────────────┘
  ↓
END
```

---

## 4. MERIT LIST GENERATION FLOWCHART

```
START
  ↓
Collect All Confirmed Applications
  ↓
Extract 21 Merit Parameters
  ↓
Determine Primary Exam (JEE > MHT-CET)
  ↓
Categorize into 6 Lists:
- All India (PCM)
- All India (PCM/PCB)
- Maharashtra State (PCM)
- Maharashtra State (PCM/PCB)
- JK Migrant (PCM)
- JK Migrant (PCM/PCB)
  ↓
Sort by Primary Score + 12 Tie-breakers
  ↓
Assign Merit Numbers (1, 2, 3...)
  ↓
Publish Provisional Merit List
  ↓
Grievance Period (3-4 days)
  ↓
Resolve Grievances
  ↓
Recalculate if needed
  ↓
Publish Final Merit List
  ↓
END
```

---

## 5. SEAT ALLOTMENT ALGORITHM FLOWCHART

```
START
  ↓
Load: Merit Lists + Option Forms + Seat Matrix
  ↓
FOR Each Candidate (Merit Order)
  ↓
  Already FREEZE? ──YES→ Skip → Next Candidate
  ↓ NO
  Get Option Form Preferences
  ↓
  FOR Each Preference (1 to N)
    ↓
    Check Category Match? ──NO→ Next Preference
    ↓ YES
    Check HU/OHU/SL Eligibility? ──NO→ Next Preference
    ↓ YES
    Check Seat Vacant? ──NO→ Next Preference
    ↓ YES
    ALLOCATE SEAT!
    ↓
    Update Seat Matrix
    ↓
    Preference = 1? ──YES→ Set AUTO-FREEZE
    ↓ NO           ↓
    Set FREEZE/BETTERMENT Option
    ↓              ↓
    BREAK (Stop checking more preferences)
  ↓
  If No Seat: Mark "Not Allotted"
  ↓
Next Candidate
  ↓
All Done? ──NO→ Loop Back
  ↓ YES
Generate Allotment Letters
  ↓
Publish Results
  ↓
END
```

---

## 6. SEAT ACCEPTANCE FLOWCHART

```
START (After Allotment)
  ↓
STEP 1: Self-Verification
  ↓
Verify 21 Parameters
  ↓
All Correct? ──NO→ Auto-Grievance → FC Review → Cancel or Update
  ↓ YES
STEP 2: Choose Acceptance Option
  ↓
1st Preference? ──YES→ AUTO-FREEZE (No Choice)
  ↓ NO
Choose: FREEZE or BETTERMENT
  ↓
STEP 3: Pay Seat Acceptance Fee
  ↓
Payment via Razorpay
  ↓
Payment Success? ──NO→ Retry or Fail
  ↓ YES
Generate Receipt
  ↓
STEP 4: Confirm Acceptance
  ↓
Enter Password + OTP
  ↓
Generate Seat Acceptance Letter
  ↓
Send Notifications
  ↓
END (Must Report to Institute)
```

---

## 7. OPTION FORM FLOWCHART

```
START
  ↓
Eligible Candidate Logs In
  ↓
STEP 1: Shortlist Institutes
  ↓
Search & Filter:
- Course Name
- District
- University
- Institute Type
  ↓
Add to Shortlist (Max 300)
  ↓
STEP 2: Set Preferences
  ↓
Drag & Drop to Order
(1st = Most Important)
  ↓
STEP 3: Review Summary
  ↓
Check All Selections
  ↓
STEP 4: Confirm
  ↓
Enter Password + OTP
  ↓
Lock Option Form
  ↓
END (Cannot Edit After Deadline)
```

---

## 8. PAYMENT PROCESSING FLOWCHART

```
START
  ↓
Calculate Fee Amount
  ↓
Fee = 0? ──YES→ Mark Exempted → END
  ↓ NO
Create Payment Order (Razorpay)
  ↓
Redirect to Payment Gateway
  ↓
User Enters Payment Details
  ↓
Payment Processing
  ↓
Success? ──NO→ Payment Failed → Retry? ──NO→ END
  ↓ YES             ↓                    ↓ YES
Verify Signature    Send Failure Email  Loop Back
  ↓
Valid? ──NO→ Fraud Alert → END
  ↓ YES
Update Database (Status: Success)
  ↓
Generate Receipt
  ↓
Send Confirmation (SMS/Email)
  ↓
END (Success)
```

---

## 9. DOCUMENT UPLOAD FLOWCHART

```
START
  ↓
Select Document File
  ↓
Validate:
- File Type (PDF/JPG/PNG)
- File Size (Max 5MB)
- Dimensions (for photo/sign)
  ↓
Valid? ──NO→ Error: Invalid File → END
  ↓ YES
Generate Unique Filename
  ↓
Upload to Server
  ↓
Server Validation
  ↓
Upload to Cloud Storage (Azure Blob)
  ↓
Store Metadata in Database:
- Document ID
- File URL
- Upload Time
- Version
  ↓
Update Application Version
  ↓
Send Success Response
  ↓
Display Uploaded Document
  ↓
END
```

---

## 10. CONTEXT DIAGRAM (Level 0 DFD)

```
            Entrance Exam Systems
                    ↓
    Candidates → CAP SYSTEM → Institutes
                    ↕
              Verification Officers
                    ↕
            Facilitation Centers
                    ↕
              Payment Gateway
                    ↕
             Document Storage
                    ↕
             Support Officers
                    ↕
              System Admins
```

---

## 11. KEY DECISION POINTS

### A. Scrutiny Mode Selection
```
Application Complete
       ↓
Choose Mode?
  ↓         ↓
E-Scrutiny  P-Scrutiny
  ↓         ↓
Online      Physical
Verify      Verify at FC
```

### B. Allotment Accept Options
```
Got Allotment
       ↓
1st Preference?
  ↓         ↓
YES         NO
  ↓         ↓
AUTO-FREEZE  Choose:
(No choice)  ↓    ↓
           FREEZE BETTERMENT
           (Final)(Next Round)
```

### C. Category Conversion
```
Apply with Category
       ↓
Documents Valid?
  ↓         ↓
YES         NO
  ↓         ↓
Keep       Auto-Convert
Category    to OPEN
```

---

## 12. TIMELINE SUMMARY

```
Week 1-2:   Registration & Application
Week 3-4:   Verification
Week 5:     Provisional Merit + Grievance
Week 6:     Final Merit List
Week 7-9:   CAP Round I
Week 10:    Vacancy Report
Week 11-13: CAP Round II
Week 14:    Vacancy Report
Week 15-17: CAP Round III

Total: ~12 weeks (3 months)
```

---

## 13. USER JOURNEY MAP

```
CANDIDATE JOURNEY:

Register → Apply → Verify → Check Merit → Fill Options
   ↓         ↓       ↓          ↓             ↓
 App ID   10 Steps  E/P      Merit No.     Up to 300
          Upload   Scrutiny                Choices
   ↓
Get Allotment → Self-Verify → Pay Fee → Confirm → Report
       ↓             ↓           ↓          ↓        ↓
   Institute     21 Params   Razorpay   Password  Original
   & Course                             + OTP     Documents
```

---

## 14. SYSTEM MODULES OVERVIEW

```
CAP SYSTEM
    ├── Registration Module
    ├── Application Module
    ├── Verification Module
    ├── Merit List Module
    ├── Grievance Module
    ├── Option Form Module
    ├── Allotment Module
    ├── Self-Verification Module
    ├── Seat Acceptance Module
    ├── Payment Module
    ├── Institute Reporting Module
    ├── Support/Ticketing Module
    ├── Notification Module
    └── Admin/Configuration Module
```

---

## 15. DATA ENTITIES

```
MAIN ENTITIES:
    Candidate
       ↓
    Application
       ↓
    Documents
       ↓
    Verification
       ↓
    Merit Record
       ↓
    Option Form
       ↓
    Allotment
       ↓
    Seat Acceptance
       ↓
    Payment
       ↓
    Institute Admission
```

---

**END OF DOCUMENT**

Total Pages: ~15 pages
Format: Simple ASCII flowcharts
