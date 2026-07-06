export const siteContact = {
  brandName: "Chandelier Solderie",
  tagline: "Luxury lighting catalogue, Lebanon",
  location:
    process.env.NEXT_PUBLIC_CONTACT_LOCATION ?? "Beirut, Lebanon",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@chandeliersolderie.com",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "96170123456",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://instagram.com/chandeliersolderie",
};

export function getWhatsAppNumber() {
  return siteContact.whatsappNumber.replace(/\D/g, "");
}

export function buildGeneralWhatsAppUrl() {
  const message = [
    "Hello, I'm interested in your lighting collection.",
    "",
    "Could you please share more information?",
  ].join("\n");

  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppTelUrl() {
  return `https://wa.me/${getWhatsAppNumber()}`;
}

export function getInstagramUrl() {
  return siteContact.instagramUrl;
}

export function getMailtoUrl() {
  return `mailto:${siteContact.email}`;
}
