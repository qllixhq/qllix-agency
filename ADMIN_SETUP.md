# Admin security setup

Before deploying, create environment variables in the hosting provider and in `.env.local` for local development:

```env
ADMIN_PASSCODE=use-a-long-unique-passcode
ADMIN_SESSION_SECRET=use-a-random-32-plus-character-secret
```

The access code is now checked on the server. The session is an HttpOnly, same-site cookie that expires after eight hours. Do not store either value in CMS settings, client-side code, or version control.
