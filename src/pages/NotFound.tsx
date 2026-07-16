import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
      <div className="text-center px-6">
        <h1 className="text-8xl font-bold text-[#1d1d1f] mb-4">404</h1>
        <p className="text-[#86868b] text-lg mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block bg-[#0078d4] text-white px-8 py-3 rounded-xl hover:bg-[#0062b1] transition font-semibold">Go Home</Link>
      </div>
    </div>
  );
}
