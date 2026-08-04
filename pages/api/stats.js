export default async function handler(req, res) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!token || !accountId) {
    return res.status(500).json({ error: 'API anahtarları eksik.' });
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&access_token=${token}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    return res.status(200).json({ media: data.data || [] });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
