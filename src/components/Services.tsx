import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import technicianInstall from "@/assets/technician-install.png";
import technicianRepair from "@/assets/technician-repair.png";

const services = [
  {
    image: technicianInstall,
    label: "INSTALLATION",
    title: "Professional Water Heater Installation",
    description:
      "From traditional tank models to modern tankless systems, we install all types of water heaters with precision. Gas, electric, or hybrid. We help you choose the right solution and install it properly the first time. Our installations meet all local codes and manufacturer specifications.",
  },
  {
    image: technicianRepair,
    label: "REPAIR",
    title: "Fast & Effective Water Heater Repair",
    description:
      "Water heater not working? Our experienced technicians diagnose and fix issues quickly. We service all major brands and models. No job too big or small. From heating element replacement to gas valve repairs, we get your hot water flowing again fast.",
  },
];

export function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 md:py-28 bg-secondary"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 section-animate ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
            Complete Water Heater Solutions
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.label}
              className={`overflow-hidden bg-card border-0 shadow-lg card-hover section-animate ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 80 + 150}ms` : "0ms",
              }}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain bg-muted/30"
                />
              </div>

              <CardContent className="p-6 md:p-8">
                {/* Label */}
                <span className="text-primary font-semibold text-xs tracking-widest uppercase">
                  {service.label}
                </span>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-accent mt-2 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Contact Us Button */}
                <button 
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:text-primary transition-colors group"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
