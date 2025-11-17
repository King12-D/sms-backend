# sms_portal

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Super_Admin

### Post

```
{
  "email": "your email"
  "password": "super_admin password"
}
```

### Example super admin_login

```
const res = await fetch("auth/login", {
  method: "POST"
  headers: { "Content-Type: "application/json" },
  body: JSON.stringify({ email, password })
});

const data = await res.json();
localStorage.setItem("token", data.token);
```
