import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = (req) => {
  if (req.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/movie/discover', req.url));
  }

  return NextResponse.next();
};
