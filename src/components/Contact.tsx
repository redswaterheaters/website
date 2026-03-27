import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const contactInfo = [
  {
    icon: Mail,
    label: "EMAIL US",
    value: "info@redswaterheaters.com",
    href: "mailto:info@redswaterheaters.com",
  },
  {
    icon: Phone,
    label: "CALL US",
    value: "555-555-5555",
    href: "tel:+15555555555",
  },
  {
    icon: MapPin,
    label: "SERVICE AREA",
    value: "Fairfield, Pickaway, Perry & Hocking Counties",
  },
  {
    icon: Clock,
    label: "SERVICE HOURS",
    value: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: By Appointment\nEmergency Service Available",
  },
];

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [service, setService] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phoneNumber = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const emailAddress = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!fullName || !phoneNumber || !emailAddress || !service) {
      toast({
        title: "Missing required fields",
        description: "Please fill in your name, phone number, email, and select a service.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("contact_submissions").insert({
      full_name: fullName,
      phone_number: phoneNumber,
      email_address: emailAddress,
      service_needed: service,
      message: message || null,
    });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again or call us directly.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      full_name: fullName,
      phone_number: phoneNumber,
      email_address: emailAddress,
      service_needed: service,
      message: message || null,
    };

    // Fire-and-forget: sync to Google Sheets (non-blocking)
    // Use text/plain to avoid CORS preflight — Google Apps Script doesn't handle OPTIONS
    fetch("https://script.google.com/macros/s/AKfycbwSErcQYYHsbdLCwlMfGbu0iVAnPf3F-YDUAXj659lpyRfkxRgaTyzHPeGJzR-GpmZ0rg/exec", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      redirect: "follow",
    }).catch(() => {});

    // Fire-and-forget: send notification + acknowledgment emails (non-blocking)
    supabase.functions.invoke("send-contact-emails", {
      body: payload,
    }).catch(() => {});

    toast({
      title: "Message sent!",
      description: "We've received your request and will get back to you shortly.",
    });

    formRef.current?.reset();
    setService("");
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-28 bg-secondary"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Side - Form */}
          <div
            className={`lg:col-span-3 section-animate ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Section Label */}
            <span className="inline-block text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              CONTACT US
            </span>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Ready for Reliable Water Heater Service?
            </h2>

            {/* Subtext */}
            <p className="text-muted-foreground mb-8">
              Get in touch today for a free quote or to schedule service.
            </p>

            {/* Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-card p-6 md:p-8 rounded-lg shadow-lg"
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name" className="text-accent">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                    className="mt-1.5 border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-accent">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="555-555-5555"
                    required
                    className="mt-1.5 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="email" className="text-accent">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="mt-1.5 border-border focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="service" className="text-accent">
                  Service Needed *
                </Label>
                <Select required value={service} onValueChange={setService}>
                  <SelectTrigger className="mt-1.5 border-border focus:border-primary bg-card">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="installation">
                      Water Heater Installation
                    </SelectItem>
                    <SelectItem value="repair">Water Heater Repair</SelectItem>
                    <SelectItem value="other">
                      Not Sure / Need Guidance
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <Label htmlFor="message" className="text-accent">
                  Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your water heater needs..."
                  rows={4}
                  className="mt-1.5 border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-brand-red-dark text-primary-foreground text-lg font-semibold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>

          {/* Right Side - Contact Info */}
          <div
            className={`lg:col-span-2 section-animate ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            <div className="bg-card p-6 md:p-8 rounded-lg shadow-lg h-fit sticky top-24">
              <h3 className="text-primary font-semibold text-sm tracking-widest uppercase mb-8">
                CALL US OR REQUEST AN INSPECTION
              </h3>

              <div className="space-y-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                        {info.label}
                      </span>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="block text-accent font-medium hover:text-primary transition-colors mt-1 whitespace-pre-line"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-accent font-medium mt-1 whitespace-pre-line">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
