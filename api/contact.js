export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Basic email validation
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // For now, just log it
    console.log('Message received:', { name, email, message });

    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
