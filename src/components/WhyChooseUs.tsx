import { useEffect, useRef, useState } from "react";

const features = [
  {
    label: "HONEST PRICING",
    title: "Transparent & Upfront Costs",
    description:
      "No hidden fees, no surprise charges. We provide clear, upfront pricing so you know exactly what to expect before we start work.",
  },
  {
    label: "EXPERT TECHNICIANS",
    title: "Years of Hands-On Experience",
    description:
      "Our team brings extensive experience with all water heater types. We stay current on the latest technologies and techniques.",
  },
  {
    label: "QUALITY WORK",
    title: "Done Right, Every Time",
    description:
      "We don't cut corners. Every installation and repair is completed to the highest standards, backed by our commitment to excellence.",
  },
  {
    label: "LOCAL & RELIABLE",
    title: "Your Neighbors, Your Service",
    description:
      "We understand the urgency of water heater issues. We respond quickly and treat your home with the respect it deserves.",
  },
];

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      id="why-choose-us"
      className="py-20 md:py-[120px] bg-accent"
    >
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Section Header */}
        <div
          className={`text-center mb-10 md:mb-[60px] section-animate ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[2px] uppercase mb-4">
            THE REDS DIFFERENCE
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold text-primary-foreground leading-tight">
            Why Choose Red's Water Heaters
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className={`bg-white rounded-2xl p-6 md:p-10 border border-[#E5E7EB] card-hover shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] section-animate ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 80 + 150}ms` : "0ms",
              }}
            >
              {/* Red Line Accent */}
              <div className="w-10 h-[3px] bg-primary mb-4" />

              {/* Label */}
              <span className="text-primary font-bold text-xs tracking-[1.5px] uppercase">
                {feature.label}
              </span>

              {/* Title */}
              <h3 className="text-[22px] font-bold text-accent mt-3 mb-4 leading-[1.3]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-[#6B7280] text-base leading-[1.7]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
