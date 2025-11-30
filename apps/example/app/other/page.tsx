import Link from "next/link";

export default function OtherPage() {
  return (
    <div>
      <h1>Other Page</h1>

      <Link
        className="cursor-pointer text-blue-500 hover:text-blue-600
          hover:underline"
        href="/"
        // force prefetch for testing
        prefetch
      >
        Home
      </Link>
    </div>
  );
}
