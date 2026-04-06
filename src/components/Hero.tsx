
import { Button } from "@/components/ui/button";
import redsLogo from "@/assets/reds-logo-new.png";

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-accent">
      {/* Navy Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-navy-light opacity-100" />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center py-20">
        {/* Logo */}
        <img
          src={redsLogo}
          alt="Reds Water-heaters"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="w-72 md:w-96 mx-auto mb-8 animate-fade-up"
        />

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-up-delay-1 max-w-4xl mx-auto leading-tight">
          EXPERT WATER HEATER SERVICE YOU CAN TRUST.
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 animate-fade-up-delay-2 max-w-2xl mx-auto">
          Professional installation and repair for gas, electric, and tankless
          water heaters across Fairfield, Pickaway, Perry, and Hocking Counties
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-primary hover:bg-brand-red-dark text-primary-foreground px-8 py-6 text-lg font-semibold rounded-lg"
          >
            Request an Inspection
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-accent px-8 py-6 text-lg font-semibold rounded-lg bg-transparent"
          >
            222222222
          </Button>
        </div>
      </div>

    </section>
  );
}
