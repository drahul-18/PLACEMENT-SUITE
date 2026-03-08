# AI Resume Builder — Test Checklist

Use this checklist to verify all features work correctly.

## 1. All form sections save to localStorage

- [ ] Fill Personal Info (name, email, phone, location) → Refresh → Data persists
- [ ] Add Summary → Refresh → Data persists
- [ ] Add Education entry → Refresh → Data persists
- [ ] Add Experience entry → Refresh → Data persists
- [ ] Add Project → Refresh → Data persists
- [ ] Add Skills (Technical, Soft, Tools) → Refresh → Data persists
- [ ] Add Links (GitHub, LinkedIn) → Refresh → Data persists

## 2. Live preview updates in real-time

- [ ] Type in any form field → Preview updates immediately
- [ ] Add/remove experience, education, project → Preview reflects changes
- [ ] Add/remove skills → Preview shows grouped pills

## 3. Template switching preserves data

- [ ] Fill resume data
- [ ] Switch Classic → Modern → Minimal
- [ ] Verify all content remains; only layout changes

## 4. Color theme persists after refresh

- [ ] Select a color (e.g. Navy, Burgundy)
- [ ] Refresh page
- [ ] Verify same color is selected and applied

## 5. ATS score calculates correctly

- [ ] Empty resume → Score 0
- [ ] Add name (+10) → Score updates
- [ ] Add email (+10) → Score updates
- [ ] Add summary 50+ chars (+10) → Score updates
- [ ] Add experience with bullets (+15) → Score updates
- [ ] Add education (+10) → Score updates
- [ ] Add 5+ skills (+10) → Score updates
- [ ] Add 1 project (+10) → Score updates
- [ ] Add phone (+5), LinkedIn (+5), GitHub (+5) → Score updates
- [ ] Add action verbs in summary (+10) → Score updates

## 6. Score updates live on edit

- [ ] On /builder: Edit any field → ATS meter updates immediately
- [ ] On /preview: Edit on builder, navigate to preview → Circular score matches

## 7. Export buttons work (copy/download)

- [ ] **Print / Save as PDF**: Opens print dialog; toast shows "PDF export ready!"
- [ ] **Copy Resume as Text**: Paste in editor → Plain text with all sections

## 8. Empty states handled gracefully

- [ ] Empty name shows "Your Name" in preview
- [ ] No experience/projects → Sections hidden
- [ ] No skills → Skills section hidden
- [ ] Incomplete resume → Warning "Your resume may look incomplete" (does not block export)

## 9. Mobile responsive layout works

- [ ] Resize to ~640px width → Preview header stacks
- [ ] Builder form stacks (single column)
- [ ] Template thumbnails wrap
- [ ] No horizontal scroll

## 10. No console errors on any page

- [ ] Open DevTools Console
- [ ] Visit /, /builder, /preview, /proof
- [ ] No red errors in console
