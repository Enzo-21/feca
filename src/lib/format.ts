export function formatARS(value: number): string {
  return (
    "$" + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

export function formatNumber(value: number): string {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
