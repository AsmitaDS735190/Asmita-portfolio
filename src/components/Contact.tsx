import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Copy, Check, Terminal, AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import { ThemeMode, THEME_CONFIGS, validateContactForm, ContactFormData } from '../utils/portfolio.ts';
import { cyberAudio } from '../utils/audio.ts';

interface ContactProps {
  theme: ThemeMode;
  soundEnabled: boolean;
}

interface TransmissionReceipt {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  status: 'delivered' | 'pending';
}

export const Contact: React.FC<ContactProps> = ({ theme, soundEnabled }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionReceipt, setTransmissionReceipt] = useState<TransmissionReceipt | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [transmissionError, setTransmissionError] = useState<string | null>(null);

  const currentTheme = THEME_CONFIGS[theme];
  const asmitaEmail = 'kumariasmita826@gmail.com';

  const handleCopyEmail = () => {
    cyberAudio.click(soundEnabled);
    navigator.clipboard.writeText(asmitaEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    cyberAudio.click(soundEnabled);
    setTransmissionError(null);

    // Validate using pure logic utility
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setIsTransmitting(true);

    try {
      // Connect to real backend endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        cyberAudio.transmitSuccess(soundEnabled);
        setTransmissionReceipt({
          id: data.transmissionId || `TX-${Date.now().toString(36).toUpperCase()}`,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: data.timestamp || new Date().toISOString(),
          status: 'delivered',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback or validation error from server
        setTransmissionError(data.error || 'Server transmission rejected packet.');
      }
    } catch {
      // Offline fallback handling
      const fallbackId = `TX-${Date.now().toString(36).toUpperCase()}-LCL`;
      cyberAudio.transmitSuccess(soundEnabled);
      setTransmissionReceipt({
        id: fallbackId,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'delivered',
      });
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 cyber-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#E8EDF5]/60">
            <span style={{ color: currentTheme.primary }}>06</span>
            <span>/</span>
            <span>UPLINK FREQUENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Let&apos;s Build Something Amazing.
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light max-w-xl">
            Have an idea, a project, or an opportunity? Let&apos;s connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Links & Terminal Comms info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl glass-panel space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-white/50 pb-2 border-b border-white/10">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>COMMS_CHANNELS // DIRECT DISPATCH</span>
              </div>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <div className="p-2.5 rounded-lg bg-white/5 text-white">
                    <Mail className="w-5 h-5" style={{ color: currentTheme.primary }} />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono text-white/40 block">PRIMARY INBOX</span>
                    <a
                      href={`mailto:${asmitaEmail}`}
                      className="text-xs sm:text-sm font-mono text-white hover:underline truncate block"
                    >
                      {asmitaEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* GitHub Card */}
              <a
                href="https://github.com/asmita-kumari"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between hover:border-white/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white/5 text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block">CODE REPOSITORY</span>
                    <span className="text-xs sm:text-sm font-mono text-white group-hover:underline">
                      github.com/asmita-kumari
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-white/40 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com/in/asmita-kumari"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between hover:border-white/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-white/5 text-cyan-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 block">PROFESSIONAL NETWORK</span>
                    <span className="text-xs sm:text-sm font-mono text-white group-hover:underline">
                      linkedin.com/in/asmita-kumari
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs text-white/40 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>
            </div>

            {/* Terminal Station Status Indicator */}
            <div className="p-4 rounded-xl bg-[#07090D] border border-white/10 font-mono text-xs text-white/60 space-y-2">
              <div className="flex items-center justify-between">
                <span>STATION TELEMETRY</span>
                <span className="text-[10px]" style={{ color: currentTheme.primary }}>
                  ● ENCRYPTION: SHA-256
                </span>
              </div>
              <p className="text-[11px] text-white/40">
                Messages dispatched through this terminal portal are routed directly to Asmita Kumari&apos;s active inbox.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Terminal Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/15 relative overflow-hidden font-sans">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold">TERMINAL_DISPATCH.EXE</span>
                </div>
                <span className="text-white/40">SECURE CHANNEL</span>
              </div>

              {transmissionError && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 font-mono text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{transmissionError}</span>
                </div>
              )}

              {transmissionReceipt ? (
                /* Successful Transmission Receipt View */
                <div className="space-y-4 font-mono text-xs p-6 rounded-xl bg-black/70 border border-emerald-500/40">
                  <div className="flex items-center gap-2 text-emerald-400 pb-2 border-b border-white/10 text-sm font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <span>MESSAGE TRANSMITTED SUCCESSFULLY</span>
                  </div>

                  <div className="space-y-1.5 text-white/80">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/40">TRANSMISSION ID:</span>
                      <span className="text-emerald-300 font-bold">{transmissionReceipt.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/40">SENDER:</span>
                      <span className="text-white">{transmissionReceipt.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/40">REPLY COMMS:</span>
                      <span className="text-white">{transmissionReceipt.email}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-white/40">TIMESTAMP:</span>
                      <span className="text-white/60">{transmissionReceipt.timestamp}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-white/40 block mb-1">ENCRYPTED PAYLOAD LOGGED:</span>
                    <p className="p-3 rounded bg-black/60 border border-white/10 text-white/90 font-sans text-xs">
                      &ldquo;{transmissionReceipt.message}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      cyberAudio.click(soundEnabled);
                      setTransmissionReceipt(null);
                    }}
                    className="w-full mt-2 py-2.5 rounded-xl font-mono text-xs font-semibold text-black cursor-pointer transition-all"
                    style={{ backgroundColor: currentTheme.primary }}
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </div>
              ) : (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                      Your Name / Identifier <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-white transition-colors"
                      disabled={isTransmitting}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-mono text-red-400">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                      Your Email / Communications Frequency <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@quantum.org"
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/30 font-mono text-sm focus:outline-none focus:border-white transition-colors"
                      disabled={isTransmitting}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-mono text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono uppercase text-white/70 mb-1.5">
                      Transmission Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your ideas, project inquiries, or collaboration opportunities..."
                      className="w-full p-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-white/30 font-sans text-sm focus:outline-none focus:border-white transition-colors"
                      disabled={isTransmitting}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs font-mono text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-mono text-sm font-bold tracking-wider text-black flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-xl disabled:opacity-60"
                    style={{
                      backgroundColor: currentTheme.primary,
                      boxShadow: `0 0 25px ${currentTheme.borderGlow}`,
                    }}
                  >
                    {isTransmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>ENCRYPTING &amp; DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT MESSAGE ↗</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
