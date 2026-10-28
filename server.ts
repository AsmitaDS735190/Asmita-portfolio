import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TransmissionMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  receivedAt: string;
}

const transmissions: TransmissionMessage[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Contact transmission endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and message must be provided.',
      });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedMessage = String(message).trim();

    if (trimmedName.length < 2 || !trimmedEmail.includes('@') || trimmedMessage.length < 5) {
      return res.status(422).json({
        success: false,
        error: 'Transmission failed payload validation check.',
      });
    }

    const txId = `TX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const newTx: TransmissionMessage = {
      id: txId,
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      receivedAt: new Date().toISOString(),
    };

    transmissions.unshift(newTx);
    console.log(`[CYBER-COMMS] Received transmission ${txId} from ${trimmedName} <${trimmedEmail}>`);

    return res.status(200).json({
      success: true,
      message: 'Transmission successfully received and encrypted at Asmita Kumari terminal.',
      transmissionId: txId,
      timestamp: newTx.receivedAt,
    });
  });

  // Query transmissions
  app.get('/api/contact/transmissions', (_req, res) => {
    return res.json({
      success: true,
      count: transmissions.length,
      transmissions: transmissions.slice(0, 20),
    });
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cyber Terminal Server online at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start cyber terminal server:', err);
  process.exit(1);
});
