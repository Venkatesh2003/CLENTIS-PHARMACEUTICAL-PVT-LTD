# Clentis Marketing App

Static Clentis Pharmaceutical marketing and admin application.

## Run Locally

Open `index.html` in a browser, or serve the folder:

```powershell
python -m http.server 8080
```

Then visit:

- `http://localhost:8080/index.html`
- `http://localhost:8080/admin.html`

## GitHub Pages

This app is ready to publish from the repository root using GitHub Pages.

## Shared Database

The app uses Supabase for shared medicines and doctor presets across phone, PC, and any other device.

Before using the shared database, open your Supabase project, go to **SQL Editor**, and run the SQL in `supabase-schema.sql` once.
