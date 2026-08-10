import { NextResponse } from "next/server";

// Stateless JWT session: clearing the dbp_session cookie IS the logout. We do it
// here (not via @dbp/ps-auth/server) so app/* never imports a service's /server
// internals — the import boundary forbids that outside the api/platform mount seam.
export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/login", request.url), { status: 302 });
  response.cookies.delete("dbp_session");
  return response;
}
