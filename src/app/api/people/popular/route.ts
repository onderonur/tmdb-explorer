import { getPopularPeople } from '@/features/people/people.data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page');
  const peoplePage = await getPopularPeople(Number(page));
  return NextResponse.json(peoplePage);
}
