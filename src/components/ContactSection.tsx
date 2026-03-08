import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-lg">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Solicite um Orçamento
            </h2>
            <p className="mt-3 text-muted-foreground">
              Preencha o formulário e entraremos em contato rapidamente
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border bg-card p-6 shadow-sm md:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-card-foreground">
                Nome
              </label>
              <Input id="name" placeholder="Seu nome completo" required />
            </div>
            <div>
              <label htmlFor="device" className="mb-1.5 block text-sm font-medium text-card-foreground">
                Modelo do Aparelho
              </label>
              <Input id="device" placeholder="Ex: iPhone 14, Dell Inspiron..." required />
            </div>
            <div>
              <label htmlFor="problem" className="mb-1.5 block text-sm font-medium text-card-foreground">
                Descrição do Problema
              </label>
              <Textarea id="problem" placeholder="Descreva o problema do seu aparelho..." rows={4} required />
            </div>

            <Button type="submit" className="w-full gap-2" size="lg" disabled={submitted}>
              {submitted ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Enviado com Sucesso!
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Enviar Orçamento
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
