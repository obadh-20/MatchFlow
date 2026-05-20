// components/match-detail/Footer.tsx
// Minimal 4-column footer with brand, links, and newsletter
const currentYear = new Date().getFullYear();
export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-[var(--color-bg-card)] mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3">
              MatchFlow
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Premium football analytics platform delivering real-time match insights, tactical breakdowns, and player performance data.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Explore
            </h4>
            <ul className="space-y-2">
              {["Leagues", "Teams", "Players", "Standings", "Transfers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Support
            </h4>
            <ul className="space-y-2">
              {["Help Center", "API Documentation", "Contact Us", "Privacy Policy", "Terms of Service"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              Newsletter
            </h4>
            <p className="text-xs text-gray-500 mb-3">
              Get the latest match insights delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] placeholder:text-gray-400"
              />
              <button className="px-4 py-2 text-xs font-semibold bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} MatchFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-gray-400 hover:text-[var(--color-primary)] transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}