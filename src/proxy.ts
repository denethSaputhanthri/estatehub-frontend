import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/properties',
  '/login',
  '/register',
  '/unauthorized',
];

const PUBLIC_PREFIXES = [
  '/properties/',
  '/_next',
  '/api',
  '/favicon',
  '/public',
  '/_error',
];

const ROLE_ROUTES: Record<string, string[]> = {
  ADMIN: ['/admin'],
  AGENT: ['/agent'],
  SELLER: ['/seller'],
  CUSTOMER: ['/customer'],
};

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) {
    return true;
  }

  return PUBLIC_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
}

function getRequiredRole(pathname: string): string | null {
  for (const [role, prefixes] of Object.entries(ROLE_ROUTES)) {
    if (
      prefixes.some((prefix) =>
        pathname.startsWith(prefix)
      )
    ) {
      return role;
    }
  }

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. Read authentication cookies
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('role')?.value;

  // 3. User is not authenticated
  if (!token) {
    const loginUrl = new URL('/login', request.url);

    loginUrl.searchParams.set(
      'from',
      pathname
    );

    return NextResponse.redirect(loginUrl);
  }

  // 4. Determine required role for the requested route
  const requiredRole = getRequiredRole(pathname);

  // 5. Check role authorization
  if (requiredRole && role !== requiredRole) {
    return NextResponse.redirect(
      new URL('/unauthorized', request.url)
    );
  }

  // 6. Authentication + role are valid
  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};