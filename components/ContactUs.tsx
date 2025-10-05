import React, { useState } from 'react';

const InputBase: React.FC<{
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  as?: 'input' | 'textarea';
}> = ({ label, id, type = 'text', placeholder, required, as = 'input' }) => {
  const [focused, setFocused] = useState(false);
  const shared = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#B73239] transition";
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm text-white/80">{label}</label>
      {as === 'textarea' ? (
        <textarea id={id} placeholder={placeholder} required={required} className={`${shared} min-h-[120px] resize-y`} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} required={required} className={shared} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      )}
    </div>
  );
};

const ContactUs: React.FC = () => {
  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 md:px-5 lg:px-12 bg-[#0d0f12] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#B73239]/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#0F7156]/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Contactez-nous</h2>
          <p className="mt-2 text-white/70">Parlez-nous de votre projet. Nous reviendrons vers vous rapidement.</p>

          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert('Message envoyé'); }}>
            <InputBase id="name" label="Nom complet" placeholder="Votre nom" required />
            <InputBase id="email" label="Email" type="email" placeholder="vous@exemple.com" required />
            <InputBase id="company" label="Société" placeholder="Nom de société" />
            <InputBase id="phone" label="Téléphone" type="tel" placeholder="+212 ..." />
            <div className="md:col-span-2">
              <InputBase id="subject" label="Sujet" placeholder="Objet du message" />
            </div>
            <div className="md:col-span-2">
              <InputBase id="message" label="Message" as="textarea" placeholder="Décrivez votre besoin..." required />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-3">
              <label className="text-xs text-white/70 flex items-center gap-2">
                <input type="checkbox" required className="accent-[#B73239]" />
                J'accepte la politique de confidentialité
              </label>
              <button type="submit" className="inline-flex items-center gap-2 bg-[#B73239] hover:bg-[#a12a31] text-white px-5 py-3 rounded-xl border border-[#B73239] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B73239] focus:ring-offset-[#0d0f12]">
                Envoyer le message
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </form>
        </div>

        <aside className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">Coordonnées</h3>
            <p className="mt-2 text-white/70">Groupe Marocain de Création Audiovisuelle et de la Formation (GMCF)</p>
            <div className="mt-4 space-y-3 text-white/80">
              <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#0F7156]"></span> Casablanca, Maroc</div>
              <a href="mailto:contact@gmcf.ma" className="flex items-center gap-3 hover:text-white transition"><span className="w-2 h-2 rounded-full bg-[#B73239]"></span> contact@gmcf.ma</a>
              <a href="tel:+212000000000" className="flex items-center gap-3 hover:text-white transition"><span className="w-2 h-2 rounded-full bg-[#5A3E85]"></span> +212 00 00 00 00</a>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-sm uppercase tracking-wide text-white/60">Suivez-nous</h4>
            <div className="mt-3 flex gap-3">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.1c.5-.9 1.8-2.2 3.7-2.2 4 0 4.7 2.6 4.7 6V24h-4v-6.8c0-1.6 0-3.6-2.2-3.6s-2.6 1.7-2.6 3.5V24h-4z"/></svg></a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"/></svg></a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 12 8.09v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg></a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactUs;


