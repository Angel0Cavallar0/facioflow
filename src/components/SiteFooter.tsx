import { Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import FacioFlowLogo from "@/components/FacioFlowLogo";

const FOOTER_NAV = [
  { label: "Início", to: "/" },
  { label: "Serviços", to: "/servicos" },
  { label: "Privacidade", to: "/privacidade" },
];

const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-muted/40 py-12 dark:border-white/10 dark:bg-facioflow-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <FacioFlowLogo className="h-8 w-auto" />

          <ul className="flex items-center gap-6">
            {FOOTER_NAV.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/facioflow" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="https://linkedin.com/company/facioflow/" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="contato@facioflow.com.br" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FacioFlow. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
