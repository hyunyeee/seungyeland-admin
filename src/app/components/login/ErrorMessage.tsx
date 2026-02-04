export function ErrorMessage({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="text-xs text-rose-600">{text}</p>;
}
