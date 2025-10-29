
import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');

  async function loadFile() {
    setStatus('Loading...');
    const res = await fetch('/api/getFile');
    if (!res.ok) return setStatus('Failed to load file');
    const data = await res.json();
    setContent(data.content || '');
    setStatus('File loaded');
  }

  async function saveFile() {
    setStatus('Saving...');
    const res = await fetch('/api/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) return setStatus('Failed to save');
    setStatus('Saved successfully!');
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h2>GitHub File Editor</h2>
      <button onClick={loadFile}>Load File</button>
      <button onClick={saveFile} style={{ marginLeft: 10 }}>Save</button>
      <p>{status}</p>
      <textarea
        style={{ width: '100%', height: 400 }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
