import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo-facioflow.png";

type SiteHeaderProps = {
  ctaLabel?: string;
  ctaHref?: string;
};

const MENU_LINKS = [
  { label: "Home", to: "/" },
  { label: "Nossos Serviços", to: "/servicos" },
];

const SECTION_LINKS = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Segurança", href: "/#seguranca" },
  { label: "Como Trabalhamos", href: "/#como-trabalhamos" },
];

const SiteHeader = ({
  ctaLabel = "Fale Conosco",
  ctaHref = "https://wa.me/",
}: SiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-facioflow-dark/80 backdrop-blur-lg">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <NavLink to="/" aria-label="FacioFlow Home" onClick={() => setMobileMenuOpen(false)}>
          <img src={logo} alt="FacioFlow" className="h-8 md:h-10" />
        </NavLink>

        <ul className="hidden items-center gap-6 md:flex">
          {MENU_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeClassName="text-primary"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {SECTION_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={ctaHref} className="hidden md:inline-flex">
          <Button
            size="sm"
            className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            {ctaLabel}
          </Button>
        </a>

        <button
          className="text-facioflow-dark-foreground md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Alternar menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-white/10 bg-facioflow-dark px-4 pb-4 md:hidden">
          {MENU_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-primary"
            >
              {link.label}
            </NavLink>
          ))}
          {SECTION_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a href={ctaHref}>
            <Button size="sm" className="w-full rounded-full bg-primary text-primary-foreground">
              {ctaLabel}
            </Button>
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
