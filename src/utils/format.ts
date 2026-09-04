const priceFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(euro: number): string {
  return priceFormatter.format(euro);
}
