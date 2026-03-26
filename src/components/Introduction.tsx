import { useEffect, useRef, useState } from "react";

export function Introduction() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4">
        <div
          className={`max-w-3xl mx-auto text-center section-animate ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Label */}
          <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            YOUR TRUSTED WATER HEATER EXPERTS
          </span>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-6 leading-tight">
            Reliable Water Heater Solutions for Central Ohio Homes
          </h2>

          {/* Body Text */}
          <p className="text-lg text-muted-foreground leading-relaxed">
            Reds Water-heaters provides expert water heater installation and repair
            services throughout Central Ohio. We specialize in gas, electric, and
            tankless systems, delivering honest work and transparent pricing. Our
            experienced technicians treat every home with care and ensure your water
            heater is installed or repaired right the first time.
          </p>
        </div>
      </div>
    </section>
  );
}
