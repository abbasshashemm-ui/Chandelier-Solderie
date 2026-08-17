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

  mapLat: 33.87142,
  mapLng: 35.524329,
  mapsUrl: "https://maps.app.goo.gl/PCbJYrK225J4SxNC6",
};

export function getWhatsAppNumber() {
  return siteContact.whatsappNumber.replace(/\D/g, "");
}

export function getWhatsAppDisplay() {
  const digits = getWhatsAppNumber();
  if (digits.startsWith("961") && digits.length === 11) {
    return `+961 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  return `+${digits}`;
}

export function buildGeneralWhatsAppUrl() {
  const message = [
    "Hello, I'm interested in your lighting collection.",
    "",
    "Could you please share more information?",
  ].join("\n");

  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

export function getInstagramUrl() {
  return siteContact.instagramUrl;
}

export function getMapsEmbedUrl(queryOverride?: string) {
  if (queryOverride?.trim()) {
    return `https://www.google.com/maps?q=${encodeURIComponent(queryOverride.trim())}&hl=en&z=17&output=embed`;
  }

  return `https://www.google.com/maps?q=${siteContact.mapLat},${siteContact.mapLng}&hl=en&z=17&output=embed`;
}

export function getMapsDirectionsUrl(queryOverride?: string) {
  if (queryOverride?.trim()) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryOverride.trim())}`;
  }

  return siteContact.mapsUrl;
}
