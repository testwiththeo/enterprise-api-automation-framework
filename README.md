# Enterprise API Automation Suite: E-Commerce & Fintech Integration

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![AJV](https://img.shields.io/badge/AJV_Validation-C0A000?style=for-the-badge)

## Overview
This project is a professional-grade API Automation Framework designed to ensure the reliability of a complex integrated system between an **E-Commerce Catalog** and a **Fintech Wallet**. 

The primary goal is to validate the critical path of the checkout process, ensuring that business logic (such as inventory availability and wallet balance) is strictly enforced before a transaction is finalized.

## Engineering Architecture
Instead of writing simple test scripts, this framework is built with a **Modular Architecture** to ensure scalability and maintainability.

### Key Architectural Decisions:
- **API Wrapper Pattern:** I implemented a layer of abstraction (API Wrappers) between the test scripts and the raw request calls. This ensures that any change in the API endpoint only requires a update in one place, not across multiple test files.
- **Data-Driven Testing (DDT):** Test scenarios are decoupled from the code. I used JSON-based data providers to run multiple test cases (Positive, Negative, and Edge Cases) through a single test engine, significantly increasing coverage with minimal code redundancy.
- **Contract Testing (Schema Validation):** Using **AJV (Another JSON Schema Validator)**, the framework validates the structure of the API response. This prevents "silent failures" where a status code is 200 OK but the data contract is broken (e.g., missing fields or wrong data types).
- **Shift-Left Approach:** The framework is designed to be integrated into the CI/CD pipeline, providing fast feedback to developers before code is merged into the main branch.

## Tech Stack
- **Language:** TypeScript
- **Test Runner:** Playwright (API Testing)
- **Contract Validation:** AJV (JSON Schema)
- **Environment Simulation:** Mockoon (Enterprise Mock Server)
- **CI/CD:** GitHub Actions
- **API Client:** Bruno (for manual verification & collection management)

## Testing Strategy
The suite covers a comprehensive set of scenarios focusing on the **Checkout Flow**:

| Scenario | Type | Expectation | Validation |
| :--- | :--- | :--- | :--- |
| **Happy Path** | Positive | `200 OK` | Schema Valid $\rightarrow$ Status: PAID |
| **Insufficient Balance** | Negative | `402 Payment Required` | Schema Valid $\rightarrow$ Error: Insufficient Balance |
| **Out of Stock** | Negative | `409 Conflict` | Schema Valid $\rightarrow$ Error: Out of Stock |
| **Invalid Token** | Negative | `401 Unauthorized` | Schema Valid $\rightarrow$ Error: Invalid Token |

## Getting Started

### Prerequisites
- Node.js (v18+)
- Mockoon (To run the sandbox server)

### Installation & Execution
1. **Clone the repository:**
   ```bash
   git clone https://github.com/[USERNAME]/[REPO-NAME].git
   cd [REPO-NAME]

2. **Install dependencies:**
   ```bash
    npm install

3. **Setup Environment:**
   Create a .env file in the root directory:
   ```bash
    BASE_URL=http://localhost:3000

4. **Run the tests:**
   ```bash
    npx playwright test

### Impact & Results

    Coverage: Achieved 100% coverage of critical checkout business paths.

    Efficiency: Reduced regression testing time from hours (manual) to seconds (automated).

    Reliability: Eliminated false-positives by implementing strict contract validation, ensuring 0% regression bugs in the response structure.
