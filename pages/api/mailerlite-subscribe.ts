// pages/api/mailerlite-subscribe.ts (or .js)
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const apiKey = process.env.MAILERLITE_API_KEY; // Make sure this exists in .env.local
    const groupId = process.env.MAILERLITE_GROUP_ID; // Add this to .env.local

    if (!apiKey || !groupId) {
      return res.status(500).json({ message: 'MailerLite API key or group ID is missing' });
    }

    try {
      const { firstName, lastName, email } = req.body;

      const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': apiKey,
        },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`,
          fields: {
            first_name: firstName,
            last_name: lastName,
          },
          groups: [groupId],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ message: data.error || 'Subscription failed' });
      }

      return res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
