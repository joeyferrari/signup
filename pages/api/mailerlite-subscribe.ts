import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const apiKey = process.env.MAILERLITE_API_KEY; // Ensure this is in your .env.local file
  const groupId = process.env.MAILERLITE_GROUP_ID; // Ensure this is in your .env.local file

  // Check if API key and group ID are available
  if (!apiKey || !groupId) {
    return res.status(500).json({ message: 'MailerLite API key or group ID is missing' });
  }

  try {
    const { firstName, lastName, email } = req.body;

    // Validate that the required fields are present
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Missing required fields: firstName, lastName, and email' });
    }

    // MailerLite API request
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

    // Handle API errors from MailerLite
    if (!response.ok) {
      return res.status(response.status).json({ message: data.error || 'Subscription failed' });
    }

    // Success response
    return res.status(200).json({ message: 'Subscription successful' });
  } catch (error: unknown) {
    // Log the error and return a response with the error
    console.error('Subscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
