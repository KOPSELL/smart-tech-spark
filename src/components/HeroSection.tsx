import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-technician.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container mx-auto grid min-h-[70vh] items-center gap-8 px-4 py-16 md:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Seu dispositivo novo,{" "}
            <span className="text-primary">de novo.</span>
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Especialistas em PC, Notebook, Games e Celulares. Diagnóstico rápido,
            peças de qualidade e garantia em todos os serviços.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2 bg-whatsapp text-primary-foreground hover:bg-whatsapp/90" asChild>
              <a
                href="https://wa.me/5500000000000?text=Olá! Gostaria de solicitar um orçamento."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar Orçamento via WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#servicos">Ver Serviços</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={heroImage}
              alt="Técnico trabalhando em reparo de equipamento eletrônico"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
