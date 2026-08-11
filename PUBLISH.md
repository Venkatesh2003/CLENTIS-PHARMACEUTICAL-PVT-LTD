# Publish To GitHub Pages

Use this after creating an empty GitHub repository named `clentis-marketing-app` under the `Venkatesh2003` account.

## Push The App

```powershell
cd "C:\Users\m7967\.gemini\antigravity-ide\scratch\clentis-marketing"
git push -u origin main
```

If GitHub asks you to sign in, complete the browser sign-in or use a GitHub personal access token.

## Enable GitHub Pages

1. Open `https://github.com/Venkatesh2003/clentis-marketing-app/settings/pages`
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/root`.
4. Save.

After GitHub finishes deploying, the app should be available at:

`https://venkatesh2003.github.io/clentis-marketing-app/`

Admin page:

`https://venkatesh2003.github.io/clentis-marketing-app/admin.html`

## Daily Workflow

```powershell
cd "C:\Users\m7967\.gemini\antigravity-ide\scratch\clentis-marketing"
git status
git add .
git commit -m "Describe your change"
git push
```

## Supabase Setup

Open your Supabase project, go to **SQL Editor**, paste the contents of `supabase-schema.sql`, and run it once. Without this step, the app will still open but will fall back to each browser's local storage.
