import redsLogo from "@/assets/reds-logo-new.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 bg-accent">
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <img
          src={redsLogo}
          alt="Reds Water-heaters"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-56 md:w-72 max-h-24 object-contain mx-auto mb-6"
        />

        {/* County List */}
        <p className="text-primary-foreground/80 mb-6">
          Fairfield • Pickaway • Perry • Hocking
        </p>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />

        {/* Copyright */}
        <p className="text-primary-foreground/60 text-sm mb-2">
          © {currentYear} Reds Water-heaters. All rights reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-primary-foreground/40 text-xs italic">
          ​
        </p>
      </div>
    </footer>
  );
}
