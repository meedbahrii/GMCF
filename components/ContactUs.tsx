import React, { useState } from 'react';
import { SiLinkedin, SiVimeo, SiDailymotion, SiYoutube, SiTiktok } from 'react-icons/si';
import SocialLink from './SocialLink';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 md:px-5 lg:px-12 bg-[#0d0f12] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#B73239]/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#0F7156]/20 blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t('contact.title')}</h2>
          <p className="mt-2 text-white/70">{t('contact.subtitle')}</p>

          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); alert('Message envoyé'); }}>
            <InputBase id="name" label={t('contact.form.name')} placeholder="Votre nom" required />
            <InputBase id="email" label={t('contact.form.email')} type="email" placeholder="vous@exemple.com" required />
            <InputBase id="company" label={t('contact.form.company')} placeholder="Nom de société" />
            <InputBase id="phone" label={t('contact.form.phone')} type="tel" placeholder="+212 ..." />
            <div className="md:col-span-2">
              <InputBase id="subject" label={t('contact.form.subject')} placeholder="Objet du message" />
            </div>
            <div className="md:col-span-2">
              <InputBase id="message" label={t('contact.form.message')} as="textarea" placeholder="Décrivez votre besoin..." required />
            </div>
            <div className="md:col-span-2 flex items-center justify-between gap-3">
              <label className="text-xs text-white/70 flex items-center gap-2">
                <input type="checkbox" required className="accent-[#B73239]" />
                {t('contact.form.privacy')}
              </label>
              <button type="submit" className="inline-flex items-center gap-2 bg-[#B73239] hover:bg-[#a12a31] text-white px-5 py-3 rounded-xl border border-[#B73239] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B73239] focus:ring-offset-[#0d0f12]">
                {t('contact.form.submit')}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </form>
        </div>

        <aside className="bg-gradient-to-b from-white/5 to-white/0 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">{t('contact.coordinates')}</h3>
            <p className="mt-2 text-white/70">Groupe Marocain de Création Audiovisuelle et de la Formation (GMCF)</p>
            <div className="mt-4 space-y-3 text-white/80">
              <div className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#0F7156]"></span> Casablanca, Maroc</div>
              <a href="mailto:contact@gmcf.ma" className="flex items-center gap-3 hover:text-white transition"><span className="w-2 h-2 rounded-full bg-[#B73239]"></span> contact@gmcf.ma</a>
              <a href="tel:+212000000000" className="flex items-center gap-3 hover:text-white transition"><span className="w-2 h-2 rounded-full bg-[#5A3E85]"></span> +212 00 00 00 00</a>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-sm uppercase tracking-wide text-white/60">{t('contact.follow')}</h4>
            <div className="mt-3 flex gap-3">
              <SocialLink href="https://www.linkedin.com/company/gmcf-group/" label="LinkedIn">
                <SiLinkedin className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://vimeo.com/user249139979" label="Vimeo">
                <SiVimeo className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://dailymotion.com/gmcf-official" label="Dailymotion">
                <SiDailymotion className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://youtube.com/@gmcfofficial" label="YouTube">
                <SiYoutube className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@gcmfofficial" label="TikTok">
                <SiTiktok className="w-5 h-5" />
              </SocialLink>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ContactUs;


