// Generated API mount — PS.SEARCH
// This file is the ONLY place in this app that imports @dbp/ps-search/server.
// Covered by the narrow ESLint exception in packages/config/eslint/index.mjs.
import { dispatch } from "@dbp/ps-search/server";
import { type NextRequest } from "next/server";

async function handle(req: NextRequest): Promise<Response> {
  return dispatch(req as unknown as Request);
}

export { handle as GET, handle as POST, handle as DELETE, handle as PATCH, handle as PUT };
