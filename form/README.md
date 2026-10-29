# Black & Red Registration Form

React + Vite registration form with seven required fields, field-specific validation, accessible feedback banners and a disabled submit button with a loading spinner.

## Run
Install Node.js 20.19+ or 22.12+ (Node 22 LTS recommended). Open a terminal inside this folder:

```bash
npm install
npm run dev
```
Open the Local URL printed by Vite. Do not use Live Server for this React app.

## Build and tests
```bash
npm test
npm run build
npm run preview
```

## Manual checks
- Submit an empty form: individual errors appear and the first invalid field receives focus.
- Enter an invalid email, short password or future birth date: corresponding errors appear.
- Upload a non-image or an image larger than 2 MB: upload is rejected.
- Submit valid details: controls are disabled and a spinner appears for 1.5 seconds, followed by a success banner.
- Use error@example.com with otherwise valid details to test the error banner; entered data is preserved for retry.
- Check the layout on a narrow screen and navigate with Tab.

## Submission
This is a frontend demo. The request is simulated; no details or images are uploaded, saved or registered. Replace the delay in src/App.jsx with your backend API and validate again on the server for production.

## Push to GitHub
Create an empty repository, then run these commands in this folder. Replace YOUR_USERNAME and YOUR_REPO:

```bash
git init
git add .
git commit -m "Build registration form with validation and feedback"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
If origin already exists, check it with git remote -v instead of adding it again. This ZIP has not been pushed to GitHub.

## Updated visual design
Split-screen black and red layout with a bundled original SVG illustration, feature cards and responsive mobile layout. No external image downloads or font services are required.
