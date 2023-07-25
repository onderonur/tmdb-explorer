import { getPopularPeople } from '@/people/people-fetchers';
import { NextRequest, NextResponse } from 'next/server';

// TODO: Route handler file'larının nereye konulması öneriliyor bi bak.

// TODO: Route handler'lar için error handling.

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const peoplePage = await getPopularPeople(Number(page));
  return NextResponse.json(peoplePage);
}
