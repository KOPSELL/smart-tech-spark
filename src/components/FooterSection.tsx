import { Wrench, MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="sobre" className="border-t bg-accent text-accent-foreground">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Wrench className="h-5 w-5" />
            TechFix
          </div>
          <p className="text-sm opacity-80">
            Assistência técnica multimarcas com profissionais qualificados e
            garantia em todos os serviços.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="rounded-full border border-accent-foreground/20 p-2 transition-colors hover:bg-accent-foreground/10">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-full border border-accent-foreground/20 p-2 transition-colors hover:bg-accent-foreground/10">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Contato</h3>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> (00) 0000-0000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> contato@techfix.com.br
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Seg–Sex: 9h às 18h | Sáb: 9h às 13h
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">Localização</h3>
          <p className="mb-3 flex items-start gap-2 text-sm opacity-80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            Rua Exemplo, 123 – Centro, Cidade – UF
          </p>
          <div className="overflow-hidden rounded-lg">
            <iframe
              title="Localização TechFix"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197538776898!2d-46.65499398447553!3d-23.561684384682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzQyLjEiUyA0NsKwMzknMTEuMCJX!5e0!3m2!1spt-BR!2sbr!4v1710000000000"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-accent-foreground/10 py-4 text-center text-xs opacity-60">
        © 2026 TechFix – Assistência Técnica Multimarcas. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default FooterSection;
