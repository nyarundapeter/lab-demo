// Generated API mount — PS.NOTIF
// This file is the ONLY place in this app that imports @dbp/ps-notif/server.
// Covered by the narrow ESLint exception in packages/config/eslint/index.mjs.
import { dispatch } from "@dbp/ps-notif/server";
import { type NextRequest } from "next/server";

async function handle(req: NextRequest): Promise<Response> {
  return dispatch(req as unknown as Request);
}

export { handle as GET, handle as POST, handle as DELETE, handle as PATCH, handle as PUT };
