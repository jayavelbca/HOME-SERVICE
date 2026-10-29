
export default function WhatsAppButton() {
  // Replace with the business WhatsApp number.
  // Include country code, without + or spaces.
  const phoneNumber = "9514127195";

  const message = encodeURIComponent(
    "Hello! I would like to enquire about your home services."
  );

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg transition hover:scale-110 hover:bg-green-600"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-7 w-7"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.1.55 4.15 1.6 5.95L.12 24l6.34-1.66a11.9 11.9 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.41ZM12.1 21.75a9.9 9.9 0 0 1-5.05-1.39l-.36-.21-3.76.99 1-3.66-.23-.38a9.85 9.85 0 0 1-1.51-5.22c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89Zm5.43-7.4c-.3-.15-1.77-.88-2.04-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.26-.47-2.4-1.49-.89-.8-1.49-1.79-1.67-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.77-.73 2.02-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}
