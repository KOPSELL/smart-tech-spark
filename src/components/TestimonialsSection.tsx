import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Carlos Almeida",
    text: "Meu notebook voltou como novo! Atendimento super rápido e preço justo. Recomendo demais.",
    rating: 5,
    initials: "CA",
  },
  {
    name: "Fernanda Lima",
    text: "Troquei a tela do meu celular em menos de 1 hora. Qualidade excelente e garantia de 90 dias.",
    rating: 5,
    initials: "FL",
  },
  {
    name: "Ricardo Santos",
    text: "Levei meu PS5 com problema no HDMI e resolveram no mesmo dia. Profissionais de verdade!",
    rating: 5,
    initials: "RS",
  },
  {
    name: "Ana Paula Costa",
    text: "Fizeram a manutenção preventiva do meu PC gamer e a diferença na temperatura foi absurda.",
    rating: 5,
    initials: "AC",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="avaliacoes" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            O que nossos clientes dizem
          </h2>
          <p className="mt-3 text-muted-foreground">
            Avaliações reais de quem confiou na TechFix
          </p>
        </div>

        {/* Desktop grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <TestimonialCard {...testimonials[current]} />
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prev} className="rounded-full border bg-card p-2 shadow-sm hover:bg-muted">
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <button onClick={next} className="rounded-full border bg-card p-2 shadow-sm hover:bg-muted">
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ name, text, rating, initials }: { name: string; text: string; rating: number; initials: string }) => (
  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <div className="mb-4 flex gap-1">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-star text-star" />
      ))}
    </div>
    <p className="mb-4 text-sm text-muted-foreground italic">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {initials}
      </div>
      <span className="text-sm font-medium text-card-foreground">{name}</span>
    </div>
  </div>
);

export default TestimonialsSection;
