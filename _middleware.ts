import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Add the user token to the response
  const { nextUrl: url } = req;
  const city = req.cookies['city'];

  if (city) {
    url.searchParams.set('city', city);

    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
