# Playwright-demo
Playwright UI + API Automation Tests

This repository contains automated UI and API tests implemented with Playwright and TypeScript as a demo of modern test automation practices.

What’s Where

Tests
All test specs are under the tests folder.

UI tests (SauceDemo) are in tests/UI

API tests (JSONPlaceholder) are in tests/API

Page Object Models
Reusable classes are in pages folder.
These are used by UI tests to interact with the browser in a clean and maintainable way.

API Client & Fixture

API client is in API/Clients folder.

Custom API fixture that set up API client for tests is in fixtures folder.
Tests use the API client fixture to avoid manual setup of new object inside tests.

Configuration & CI

Playwright config (playwright.config.ts) defines test runner settings.

GitHub Actions workflow in .github/workflows run tests on every push and generate HTML report.

The project covers:

UI tests for the SauceDemo website — https://www.saucedemo.com/

API tests for JSONPlaceholder — https://jsonplaceholder.typicode.com/

Page Object Model architecture

Custom Playwright fixture for API

GitHub Actions CI with HTML report generation

Technology Stack

Tests are implemented using Playwright Test and TypeScript. Playwright is used for both browser automation and API testing. The project follows the Page Object Model pattern for UI tests and uses a dedicated client layer for API endpoint. GitHub Actions is configured to automatically execute tests on every push to GitHub and generate report.

UI Tests

UI tests target the SauceDemo website and are built using the Page Object Model pattern. Page classes contain selectors and reusable page actions, while test files focus mostly on business flows and assertions. This keeps tests readable and maintainable.

API Tests

API tests target the JSONPlaceholder service. A dedicated API client wraps endpoint calls. The fixture creates the client object based on Playwright’s request context.

CI Integration

GitHub Actions runs the full test suite on every push to the repository. The pipeline installs dependencies, runs Playwright tests, and publishes the HTML report.

HTML report after tests:

<img width="1242" height="715" alt="image" src="https://github.com/user-attachments/assets/4f801118-82c6-4d42-9c7e-de9c5c20ecce" />
<img width="1235" height="551" alt="image" src="https://github.com/user-attachments/assets/64751c66-ee73-465b-b430-e68ecd8f7c6e" />


