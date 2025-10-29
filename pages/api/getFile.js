
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const repo = 'putraborz/VerifikasiScWata';
  const path = 'Loader/vip.txt';

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    });
    if (!response.ok) throw new Error('GitHub API error');
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
