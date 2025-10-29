
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const repo = 'putraborz/VerifikasiScWata';
  const path = 'Loader/vip.txt';

  try {
    const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
    });
    const fileData = await getRes.json();
    const sha = fileData.sha;

    const body = {
      message: 'Update via web editor',
      content: Buffer.from(req.body.content).toString('base64'),
      sha,
    };

    const updateRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!updateRes.ok) throw new Error('Failed to commit to GitHub');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
