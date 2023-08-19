import type { NextApiRequest, NextApiResponse } from 'next';
import { strapi } from '@/lib/api';

type ResponseData = Awaited<ReturnType<typeof strapi.getSearchResults>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Error['message']>
) {
  if (req.method !== 'POST') return;

  try {
    const searchQuery = req.body as string;

    const searchResults = await strapi.getSearchResults(searchQuery);

    res.status(200).json(searchResults);
  } catch (error) {
    const { message } = error as Error;

    console.error(message);

    res.status(500).json(message);
  }
}
