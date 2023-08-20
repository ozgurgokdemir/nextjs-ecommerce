import { NextResponse, type NextRequest } from 'next/server';
import { strapi } from '@/lib/api';

type ResponseData =
  | Awaited<ReturnType<typeof strapi.getSearchResults>>
  | { error: Error['message'] };

export async function POST(request: NextRequest) {
  try {
    const searchQuery = (await request.json()) as string;

    const searchResults = await strapi.getSearchResults(searchQuery);

    return NextResponse.json<ResponseData>(searchResults, { status: 200 });
  } catch (error) {
    const { message } = error as Error;

    console.error(message);

    return NextResponse.json<ResponseData>({ error: message }, { status: 500 });
  }
}
