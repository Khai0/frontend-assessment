export default function ArrowIcon({ direction = "left" }) {
  const path =
    direction === "left"
      ? "M11.0774 5.24414L6.32161 9.99997L11.0774 14.7558L12.2558 13.5775L8.67828 9.99997L12.2558 6.42247L11.0774 5.24414Z"
      : "M8.08919 14.1247L12.845 9.36887L8.08919 4.61304L6.91086 5.79137L10.4884 9.36887L6.91086 12.9464L8.08919 14.1247Z";

  return (
    <svg
      className="w-5 h-5 md:w-8 md:h-8"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}
