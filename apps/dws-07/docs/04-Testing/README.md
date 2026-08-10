# Testing — BioTest Diagnostics Servicing

```bash
pnpm install
pnpm build          # production build (type-checks the app)
pnpm test           # vitest (passes with no tests)
```

## Verify data at runtime

A green build does NOT prove data survived. Start the app and confirm the platform-data
plane returns seeded rows:

```bash
node node_modules/next/dist/bin/next start -p 9030
curl -H "x-tenant-id: tenant-alpha" http://localhost:9030/api/platform/data/entities/lab-service
curl -H "x-tenant-id: tenant-alpha" http://localhost:9030/api/platform/data/entities/exam-order
curl -H "x-tenant-id: tenant-alpha" http://localhost:9030/api/platform/data/entities/service-offering-request
```

## UAT sign-off

Automated tests (above) cover functional/NFR gates the factory enforces. Business
sign-off is a separate, manual activity — see the generated
[UAT Checklist](UAT-CHECKLIST.md).
