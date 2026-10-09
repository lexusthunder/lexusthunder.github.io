// ONE place to set up the whole site. Owner edits only this file.
// - PAYMENT_LINK: hosted checkout link (Stripe Payment Link https://buy.stripe.com/..., Payhip, Gumroad). "" = email-order fallback.
// - SUBSCRIBE_URL: HTTPS endpoint of your email-list form (the consent form posts here). "" = form stays hidden.
// - ANALYTICS.domain: Plausible site domain for cookieless aggregate stats. "" = off.
// - SELLER: legal trader details shown on Terms and Contact. address is REQUIRED before launch (EU trader rules).
// - BANK: bank-transfer details, shown only when iban is filled in. Keep empty on a public site if you prefer
//   to send them privately by email.
window.SITE = {
  PRICE: "€14.99",
  PAYMENT_LINK: "",
  SUBSCRIBE_URL: "",
  ANALYTICS: { domain: "", src: "" },
  SELLER: { name: "Ureche Ionel Alexandru", email: "hello@aureumcrm.com", address: "" },
  BANK: { name: "", iban: "", bic: "" }
};
