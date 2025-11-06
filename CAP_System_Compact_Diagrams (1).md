# CAP SYSTEM - COMPACT DIAGRAMS

## 1. CONTEXT DIAGRAM (Level 0 DFD)

```
                    Exam Results
    ENTRANCE EXAM ──────────────┐
    SYSTEMS                     │
                                ↓
    CANDIDATES ────────────→ ┌─────────┐ ────────→ INSTITUTES
      • Register            │         │  Allotment
      • Apply               │   CAP   │  Lists
                            │ SYSTEM  │
    E-SCRUTINY ────────────→│         │←────────── FACILITATION
    OFFICERS                │         │  Verify    CENTERS
      • Verify              └────┬────┘
                                 │
    PAYMENT    ←────────────────┼────────────────→ DOCUMENT
    GATEWAY     Process          │      Store      STORAGE
                                 ↓
                            NOTIFICATIONS
                            (SMS/Email)
```

## 2. LEVEL 1 DFD - MAIN PROCESSES

```
CANDIDATES
    │
    ↓
┌────────────────────┐        ┌──────────────┐
│ 1.0 REGISTRATION   │───────→│ D1: Users    │
│ & APPLICATION      │        └──────────────┘
└─────────┬──────────┘
          │ Apps              ┌──────────────┐
          ↓                   │ D2: Documents│
┌────────────────────┐───────→│              │
│ 2.0 VERIFICATION   │        └──────────────┘
└─────────┬──────────┘
          │ Confirmed         ┌──────────────┐
          ↓                   │ D3: Merit    │
┌────────────────────┐───────→│              │
│ 3.0 MERIT LIST     │        └──────────────┘
└─────────┬──────────┘
          │ Merit Lists       ┌──────────────┐
          ↓                   │ D4: Options  │
┌────────────────────┐───────→│              │
│ 4.0 OPTION FORM    │        └──────────────┘
└─────────┬──────────┘
          │ Choices           ┌──────────────┐
          ↓                   │ D5: Allotment│
┌────────────────────┐───────→│              │
│ 5.0 ALLOTMENT      │        └──────────────┘
└─────────┬──────────┘
          │ Allotments        ┌──────────────┐
          ↓                   │ D6: Payment  │
┌────────────────────┐───────→│              │
│ 6.0 SEAT           │        └──────────────┘
│    ACCEPTANCE      │
└─────────┬──────────┘
          │ Confirmed         ┌──────────────┐
          ↓                   │ D7: Institute│
┌────────────────────┐───────→│              │
│ 7.0 INSTITUTE      │        └──────────────┘
│    REPORTING       │
└────────────────────┘
```

## 3. COMPLETE CAP PROCESS FLOWCHART

```
START
  │
  ↓
[REGISTRATION] 1-2 days
  • Exam Validation
  • Get Application ID
  │
  ↓
[APPLICATION FORM] 7-10 days
  • 10 Steps
  • Document Upload
  • Payment
  │
  ↓
[VERIFICATION] 7-15 days
  • E-Scrutiny OR P-Scrutiny
  • Confirm/Revert
  │
  ↓
[PROVISIONAL MERIT LIST] 1 day
  • 6 Merit Lists
  │
  ↓
[GRIEVANCE PERIOD] 3-4 days
  • Corrections
  │
  ↓
[FINAL MERIT LIST] 1 day
  • Locked Rankings
  │
  ↓
╔═══════════════════╗
║ CAP ROUND I       ║ 14-21 days
║ • Option Form     ║
║ • Allotment       ║
║ • Seat Acceptance ║
║ • Institute Report║
╚═══════════════════╝
  │
  ↓
[VACANCY REPORT] 1-2 days
  │
  ↓
╔═══════════════════╗
║ CAP ROUND II      ║ 14-21 days
╚═══════════════════╝
  │
  ↓
[VACANCY REPORT] 1-2 days
  │
  ↓
╔═══════════════════╗
║ CAP ROUND III     ║ 14-21 days
╚═══════════════════╝
  │
  ↓
END

Total: 10-12 weeks
```

## 4. REGISTRATION FLOWCHART

```
START
  │
  ↓
[Enter Exam Details]
  │
  ↓
<Validate Exam> ─NO→ ERROR
  │ YES
  ↓
<Score > 0?> ─NO→ ERROR
  │ YES
  ↓
[Personal Details]
  │
  ↓
[Address Details]
  │
  ↓
[Mobile + Email]
  │
  ↓
<Duplicate?> ─YES→ ERROR
  │ NO
  ↓
[Create Password]
  │
  ↓
[Generate OTP]
  │
  ↓
[Send SMS/Email]
  │
  ↓
[Enter OTP]
  │
  ↓
<OTP Valid?> ─NO→ RETRY (Max 3)
  │ YES
  ↓
[Generate App ID]
  │
  ↓
[Send Confirmation]
  │
  ↓
END
```

## 5. VERIFICATION FLOWCHART (E-Scrutiny)

```
START
  │
  ↓
[Auto-Assign Officer]
  │
  ↓
[Officer Picks Up]
  │
  ↓
┌─────────────────┐
│ Verify 7 Steps: │
│ 1. Personal     │
│ 2. Candidature  │
│ 3. Category     │
│ 4. Special Res  │
│ 5. Qualification│
│ 6. Exam Scores  │
│ 7. Photo/Sign   │
└────────┬────────┘
         │
         ↓
<Mandatory Issue?> ─YES→ [REVERT] → Wait
         │ NO                          │
         ↓                             │
<Optional Issue?> ─YES→ [Remove       │
         │ NO          Benefit]       │
         ↓                │            │
    [CONFIRM]            ↓            │
         │          [PROVISIONAL       │
         │           CONFIRM]          │
         │                │            │
         └────────┬───────┘            │
                  ↓                    │
         [Acknowledgement]             │
                  ↓                    │
                 END                   │
                                      │
         [Candidate Corrects] ←───────┘
```

## 6. ALLOTMENT ALGORITHM FLOWCHART

```
START
  │
  ↓
[Load: Merit Lists + Options + Seats]
  │
  ↓
FOR Each Candidate (Merit Order)
  │
  ↓
<Already FREEZE/> ─YES→ SKIP
<AUTO-FREEZE?>
  │ NO
  ↓
[Get Option Form]
  │
  ↓
FOR Each Preference (1 to N)
  │
  ↓
  ┌────────────────┐
  │ Check:         │
  │ • Category?    │
  │ • HU/OHU/SL?   │
  │ • Seat Vacant? │
  │ • Reservations?│
  └───────┬────────┘
          │
          ↓
   <All OK?> ─NO→ NEXT PREF
          │ YES
          ↓
   [ALLOCATE SEAT]
          │
          ↓
   [Update Matrix]
          │
          ↓
   <Pref = 1?> ─YES→ [AUTO-FREEZE]
          │ NO            │
          ↓               │
   [FREEZE/BETTERMENT]    │
          │               │
          └───────┬───────┘
                  │
                 BREAK
                  │
NEXT CANDIDATE
  │
  ↓
<All Done?> ─NO→ LOOP
  │ YES
  ↓
[Generate Letters]
  │
  ↓
[Publish Results]
  │
  ↓
END
```

## 7. SEAT ACCEPTANCE FLOWCHART

```
START (After Allotment)
  │
  ↓
╔══════════════════╗
║ STEP 1: VERIFY   ║
║ 21 Parameters    ║
╚═══════┬══════════╝
        │
        ↓
<All Correct?> ─NO→ [Auto-Grievance] → FC Review
        │ YES                              │
        ↓                                  ↓
╔══════════════════╗            <Benefit Wrong?>
║ STEP 2: CHOOSE   ║                     │
║ Accept Option    ║            ┌───YES──┴──NO───┐
╚═══════┬══════════╝            ↓                ↓
        │                    [CANCEL]        [UPDATE]
        ↓                       │                │
<Pref=1?>─YES→[AUTO-FREEZE]     END             │
        │ NO        │                            │
        ↓           │←───────────────────────────┘
   [Choose:         │
    FREEZE or       │
    BETTERMENT]     │
        │           │
        └─────┬─────┘
              │
              ↓
╔══════════════════╗
║ STEP 3: PAY FEE  ║
╚═══════┬══════════╝
        │
        ↓
[Razorpay Gateway]
        │
        ↓
<Payment OK?> ─NO→ ERROR/RETRY
        │ YES
        ↓
[Generate Receipt]
        │
        ↓
╔══════════════════╗
║ STEP 4: CONFIRM  ║
╚═══════┬══════════╝
        │
        ↓
[Enter Password]
        │
        ↓
[Enter OTP]
        │
        ↓
[Generate Acceptance Letter]
        │
        ↓
[Send Notifications]
        │
        ↓
END (Report to Institute)
```

## 8. DATA FLOW - REGISTRATION TO ADMISSION

```
┌──────────┐
│CANDIDATE │
└────┬─────┘
     │ (1) Register
     ↓
┌─────────────┐
│ Application │
│   ID        │
└────┬────────┘
     │ (2) Fill Form
     ↓
┌─────────────┐
│ Application │
│   Data      │
└────┬────────┘
     │ (3) Verify
     ↓
┌─────────────┐
│ Confirmed   │
│ Application │
└────┬────────┘
     │ (4) Merit Calc
     ↓
┌─────────────┐
│   Merit     │
│   Number    │
└────┬────────┘
     │ (5) Option Form
     ↓
┌─────────────┐
│ Preferences │
│   List      │
└────┬────────┘
     │ (6) Allotment
     ↓
┌─────────────┐
│   Seat      │
│  Allotted   │
└────┬────────┘
     │ (7) Accept
     ↓
┌─────────────┐
│   Seat      │
│ Confirmed   │
└────┬────────┘
     │ (8) Report
     ↓
┌─────────────┐
│  ADMISSION  │
│  CONFIRMED  │
└─────────────┘
```

## 9. MODULE INTERACTION DIAGRAM

```
┌─────────────┐
│ REGISTRATION│
└──────┬──────┘
       │
       ↓
┌─────────────┐     ┌──────────┐
│ APPLICATION │────→│ PAYMENT  │
└──────┬──────┘     └──────────┘
       │
       ↓
┌─────────────┐     ┌──────────┐
│VERIFICATION │────→│ DOCUMENT │
└──────┬──────┘     │ STORAGE  │
       │            └──────────┘
       ↓
┌─────────────┐     ┌──────────┐
│ MERIT LIST  │────→│GRIEVANCE │
└──────┬──────┘     └──────────┘
       │
       ↓
┌─────────────┐
│ OPTION FORM │
└──────┬──────┘
       │
       ↓
┌─────────────┐     ┌──────────┐
│ ALLOTMENT   │────→│   SEAT   │
└──────┬──────┘     │  MATRIX  │
       │            └──────────┘
       ↓
┌─────────────┐
│    SEAT     │
│ ACCEPTANCE  │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│  INSTITUTE  │
│  REPORTING  │
└─────────────┘
       ↓
┌─────────────┐
│  ADMISSION  │
│  COMPLETE   │
└─────────────┘

       ↕
┌─────────────┐
│NOTIFICATION │
│   MODULE    │
└─────────────┘
```

## 10. ENTITY RELATIONSHIP DIAGRAM

```
┌──────────┐
│ CANDIDATE│
└────┬─────┘
     │ 1
     │ has
     │ M
     ↓
┌──────────┐     M     ┌──────────┐
│APPLICATION│──uploads─→│DOCUMENTS │
└────┬─────┘           └──────────┘
     │ 1
     │ receives
     │ 1
     ↓
┌──────────┐
│VERIFICATION│
└────┬─────┘
     │ 1
     │ generates
     │ M
     ↓
┌──────────┐
│MERIT LIST│
└────┬─────┘
     │ 1
     │ creates
     │ 1
     ↓
┌──────────┐     M     ┌──────────┐
│OPTION FORM├─chooses─→│INSTITUTE │
└────┬─────┘           └────┬─────┘
     │ 1                    │ M
     │ gets                 │ offers
     │ M                    │ M
     ↓                      ↓
┌──────────┐           ┌──────────┐
│ALLOTMENT │───────────│  COURSE  │
└────┬─────┘  allocates└──────────┘
     │ 1
     │ requires
     │ 1
     ↓
┌──────────┐
│ PAYMENT  │
└────┬─────┘
     │ 1
     │ confirms
     │ 1
     ↓
┌──────────┐
│   SEAT   │
│ACCEPTANCE│
└────┬─────┘
     │ 1
     │ leads to
     │ 1
     ↓
┌──────────┐
│ADMISSION │
└──────────┘
```

---

**END OF COMPACT DIAGRAMS**

*Total Pages: ~10 pages in PDF format*
