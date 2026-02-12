# Internet Redactor

Internet Redactor is a cross-platform desktop application (Mac and Windows) built with **TypeScript** and **Electron**. The goal of the project is to help people reclaim their privacy by identifying and removing user-generated content from websites they have used over time.

## Project Intentions

The intention behind Internet Redactor is to make privacy actions practical for everyday users. Many people have years of posts, comments, media uploads, and account activity spread across multiple services. Manually removing that content is often tedious and inconsistent.

Internet Redactor is being developed to:

- Provide a user-friendly way to connect supported websites.
- Help users discover previously submitted content (posts, comments, videos, and more).
- Support bulk and selective redaction workflows.
- Prioritize privacy-conscious architecture and transparent behavior.
- Reduce the amount of personal data publicly exposed across online platforms.

## Core Beta Direction

The upcoming beta is focused on proving a safe, clear, and reliable redaction workflow.

Planned beta capabilities include:

- Cross-platform desktop support for macOS and Windows.
- A guided setup experience for linking supported accounts.
- Website-specific redaction modules for initial platform coverage (starting with Reddit, Facebook, and YouTube).
- Progress tracking, action history, and clear status messaging.
- Foundational privacy and security controls for local user data.

## Initial Supported Websites

The first release wave will support:

- Reddit
- Facebook
- YouTube

## Milestones

### Milestone 1 — Foundation & Architecture

- Initialize Electron + TypeScript application structure.
- Establish secure credential/session handling strategy.
- Define plugin/module interface for website integrations.
- Implement baseline logging and diagnostics (privacy-safe).

### Milestone 2 — Account Connection & Discovery

- Build onboarding and account connection flows.
- Add content discovery engine for the first supported websites (Reddit, Facebook, and YouTube).
- Display discovered items in a reviewable queue.
- Implement robust error reporting for failed discovery operations.

### Milestone 3 — Redaction Execution Engine

- Build a redaction engine capable of selective and bulk actions.
- Add safeguards (confirmation prompts, dry-run mode where possible).
- Implement retry and resume behavior for long-running operations.
- Add operation summaries for transparency.

### Milestone 4 — Beta Readiness

- Polish UX for clarity, accessibility, and trust.
- Add settings for privacy preferences and data retention controls.
- Expand platform compatibility testing across Mac and Windows.
- Prepare beta distribution process, documentation, and release notes.

### Milestone 5 — Post-Beta Expansion

- Incorporate beta feedback into usability and reliability improvements.
- Expand supported website integrations.
- Improve automation resilience as third-party website flows change.
- Publish a public roadmap and contribution guidelines.

## Project Status

Internet Redactor is currently in active development. A beta release is planned soon.

## Vision

Internet Redactor aims to become a dependable, privacy-first companion for people who want meaningful control over their digital history.
