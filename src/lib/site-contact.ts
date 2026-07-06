export const siteContact = {
  brandName: "Chandelier Solderie",
  tagline: "Luxury lighting catalogue, Lebanon",
  location:
    process.env.NEXT_PUBLIC_CONTACT_LOCATION ??
    "Forn Chebek, Near Credit Bank",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "96171568063",
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
