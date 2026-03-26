import { useState, useEffect } from "react";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import redsLogo from "@/assets/reds-logo-new.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-accent backdrop-blur-md shadow-lg border-b border-white/10"
          : "bg-accent/90 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={scrollToTop} className="flex-shrink-0">
            <img
              src={redsLogo}
              alt="Reds Water-heaters"
              className="h-12 md:h-14 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-primary-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+10000000000"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-brand-red-dark transition-colors"
            >
              <Phone className="w-5 h-5 text-primary-foreground" />
            </a>
            <a
              href="mailto:info@redswaterheaters.com"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary hover:bg-brand-red-dark transition-colors"
            >
              <Mail className="w-5 h-5 text-primary-foreground" />
            </a>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-primary-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-accent border-accent">
                <div className="flex flex-col gap-8 mt-12">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-primary-foreground hover:text-primary transition-colors text-lg font-medium text-left"
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="flex gap-4 mt-4">
                    <a
                      href="tel:+10000000000"
                      className="flex items-center gap-2 text-primary-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call Us</span>
                    </a>
                    <a
                      href="mailto:info@redswaterheaters.com"
                      className="flex items-center gap-2 text-primary-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
