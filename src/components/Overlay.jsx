export default function Overlay({ show, close }) {
  if (!show) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
    />
  );
}
