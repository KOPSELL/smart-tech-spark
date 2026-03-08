import { Laptop, Gamepad2, Smartphone, Settings } from "lucide-react";

const services = [
  {
    icon: Laptop,
    title: "Computadores & Notebooks",
    description: "Formatação, upgrade de hardware, troca de telas, reparo de placa-mãe e muito mais.",
  },
  {
    icon: Gamepad2,
    title: "Conserto de Videogames",
    description: "PlayStation, Xbox, Nintendo Switch — conserto de controles, HDMI, drives e limpeza.",
  },
  {
    icon: Smartphone,
    title: "Troca de Telas de Celulares",
    description: "Troca de display original para todas as marcas com garantia e rapidez.",
  },
  {
    icon: Settings,
    title: "Manutenção Preventiva",
    description: "Limpeza interna, troca de pasta térmica e diagnóstico completo do seu equipamento.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Nossos Serviços
          </h2>
          <p className="mt-3 text-muted-foreground">
            Soluções completas para seus dispositivos eletrônicos
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                <service.icon className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
