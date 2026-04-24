## Local development

Install dependencies and start Expo:

```bash
npm install
npm start
```

For web-only development:

```bash
npm run web
```

## Vercel deployment

This project is an Expo app that deploys to Vercel as a static web export.

### Build locally

```bash
npm run build:web
```

The production files are generated in `dist/`.

### Vercel settings

If you import this repository into Vercel, use:

- Install Command: `npm install`
- Build Command: `npm run build:web`
- Output Directory: `dist`

`vercel.json` is already included with these settings.

### Requirements before deploying

- Vercel can only host the web build, not the native iOS/Android app binaries.
- The app must stay compatible with Expo web and `react-native-web`.
- If you add environment variables later, define them in the Vercel project settings.
- If you add API calls, make sure the backend allows requests from your Vercel domain.
- Use a supported Node.js version in Vercel, preferably Node 20.

### Optional CLI deploy

```bash
npm install -g vercel
vercel
```
