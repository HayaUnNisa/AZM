import { contact } from '../data/site'

/** Opens WhatsApp with a pre-filled message to the gym's number. */
export function openWhatsApp(message: string) {
  const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
