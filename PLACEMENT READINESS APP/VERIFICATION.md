# Verification Steps — JD Analysis

## 1. Skill Extraction

Skill extraction uses case-insensitive keyword matching. Categories:

- **Core CS**: DSA, OOP, DBMS, OS, Networks
- **Languages**: Java, Python, JavaScript, TypeScript, C, C++, etc.
- **Web**: React, Next.js, Node.js, Express, REST, GraphQL
- **Data**: SQL, MongoDB, PostgreSQL, MySQL, Redis
- **Cloud/DevOps**: AWS, Azure, GCP, Docker, Kubernetes, CI/CD, Linux
- **Testing**: Selenium, Cypress, Playwright, JUnit, PyTest

If no keywords match → shows "General fresher stack".

## 2. Sample JD for Testing

Copy this into the Assessments form:

```
Google — Software Engineer Intern

Requirements:
- Strong foundation in DSA and algorithms
- Proficiency in Java or Python
- Experience with React and JavaScript
- Knowledge of SQL and database design
- Familiarity with AWS or GCP
- Understanding of REST APIs and GraphQL
- Experience with Docker and CI/CD pipelines
```

Expected: Core CS, Languages (Java, Python), Web (React, JavaScript, REST, GraphQL), Data (SQL), Cloud/DevOps (AWS, GCP, Docker, CI/CD).

## 3. History Persistence

1. Run `npm run dev`
2. Go to **Dashboard** → **Assessments**
3. Paste the sample JD above
4. Enter Company: Google, Role: SDE Intern
5. Click **Analyze**
6. You should see **Results** with score, skills, checklist, 7-day plan, questions
7. Go to **History** in the sidebar
8. You should see the entry with date, company, role, score
9. Refresh the page (F5) — History still shows the entry
10. Click the entry → opens Results with that analysis

## 4. Interactive Skill Toggles & Live Score

1. On **Results** page, find "Key Skills Extracted"
2. Each skill has **Know** / **Practice** toggle (default: Practice)
3. Click **Know** on 2–3 skills → readiness score increases by +2 per skill
4. Click **Practice** on a skill → score decreases by 2
5. Score updates in real time (0–100 bounds)
6. Refresh the page → toggles persist (Know/Practice state retained)
7. Go to **History** → click entry → Results shows same toggles and score

## 5. Export Tools

On **Results** page:
- **Copy 7-day plan** — copies plan as plain text
- **Copy round checklist** — copies checklist as plain text
- **Copy 10 questions** — copies questions as plain text
- **Download as TXT** — downloads single file with all sections

## 6. Action Next Box

At bottom of **Results**:
- Shows top 3 weak skills (marked "Need practice")
- Suggests: "Start Day 1 plan now."
- If all skills marked "Know" → shows "All skills marked as known..."

## 7. Readiness Score

- Base: 35 (from JD analysis)
- +5 per detected category (max 30)
- +10 if company provided
- +10 if role provided
- +10 if JD length > 800 chars
- **Live adjustments**: +2 per "Know" skill, -2 per "Practice" skill
- Cap: 0–100

## 8. Company Intel (when company provided)

- Company name, Industry, Estimated size (Startup/Mid-size/Enterprise)
- Typical Hiring Focus (Enterprise: DSA + fundamentals; Startup: practical + stack depth)
- Note: "Demo Mode: Company intel generated heuristically."

**Test scenarios:**
- **Amazon, Google, Infosys, TCS** → Enterprise (2000+)
- **Unknown company** → Startup (<200)
- **Company with "consulting" in name/JD** → Mid-size (200–2000)

## 9. Round Mapping (vertical timeline)

- Based on company size + detected skills
- Each round shows: title, focus, "Why this round matters"

**Test scenarios:**
- **Enterprise + DSA** → Round 1: Online Test (DSA + Aptitude), Round 2: Technical (DSA + Core CS), Round 3: Tech + Projects, Round 4: HR
- **Startup + React/Node** → Round 1: Practical Coding, Round 2: System Discussion, Round 3: Culture Fit
- **Mid-size + DSA** → Round 1: Technical Screen, Round 2: Technical Deep-dive, Round 3: Culture + HR

## 10. Input Validation (Assessments)

- JD textarea is **required**
- If JD < 200 characters: calm warning — "This JD is too short to analyze deeply. Paste full JD for better output."
- Company and Role remain optional

## 11. Schema & Edge Cases

- **Empty skills**: When no skills detected, "other" = [Communication, Problem solving, Basic coding, Projects]. Plan, checklist, questions adapt for general fresher.
- **baseScore**: Computed only on analyze. Never changes.
- **finalScore**: baseScore + skill confidence adjustments. Updates when user toggles skills. Persisted with updatedAt.
- **Corrupted history**: If localStorage has invalid entry, it is skipped. Message: "One saved entry couldn't be loaded. Create a new analysis."

## 13. Edge Case Verification Steps

1. **JD < 200 chars**: Paste "Short JD" (9 chars) → see warning. Analyze still works.
2. **Empty JD**: Click Analyze without JD → error "Please paste the job description text."
3. **No skills (general fresher)**: Paste JD with no tech keywords → see "other" skills, general fresher plan/checklist/questions.
4. **Skill toggles**: Toggle Know/Practice → finalScore updates, refresh → persists. Check History shows updated score.
5. **Corrupted entry**: In DevTools → Application → localStorage → edit placement_readiness_history, corrupt one entry (e.g. remove "jdText") → refresh → see "One saved entry couldn't be loaded."

## 14. Test Checklist & Ship Lock

- **/prp/07-test**: 10 test items with checkboxes and "How to test" hints. Summary: "Tests Passed: X / 10". Warning if <10: "Fix issues before shipping." Reset button. Stored in localStorage.
- **/prp/08-ship**: Locked until all 10 tests passed. Shows "Ship Locked" with link to Test Checklist when incomplete. Shows "Ready to Ship" when all passed.

**Verification:**
1. Visit /prp/07-test → check items persist after refresh.
2. Visit /prp/08-ship with 0/10 passed → see locked state.
3. Check all 10 items → visit /prp/08-ship → see "Ready to Ship".
4. Reset checklist → /prp/08-ship shows locked again.

## 15. Routes

- `/` — Landing
- `/dashboard` — Dashboard
- `/dashboard/practice` — Practice
- `/dashboard/assessments` — JD Analysis
- `/dashboard/results` — Analysis results (?id= for history)
- `/dashboard/history` — Past analyses
