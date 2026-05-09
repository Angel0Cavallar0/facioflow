import { useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo-facioflow.png";

type SiteHeaderProps = {
  ctaLabel?: string;
  ctaHref?: string;
};

const ROUTE_LINKS = [
  { label: "Início", to: "/" },
  { label: "Serviços", to: "/servicos" },
  { label: "Privacidade", to: "/privacidade" },
];

const SiteHeader = ({
  ctaLabel = "Fale Conosco",
  ctaHref = "https://wa.me/",
}: SiteHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const blogPlaceholderClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md dark:border-white/10 dark:bg-facioflow-dark/80">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <NavLink to="/" aria-label="FacioFlow Home" onClick={() => setMobileMenuOpen(false)}>
          <img src={logo} alt="FacioFlow" className="h-8 md:h-10" />
        </NavLink>

        <ul className="hidden items-center gap-6 md:flex">
          {ROUTE_LINKS.map((link) => (
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
          <li>
            <a
              href="#"
              onClick={blogPlaceholderClick}
              className="cursor-not-allowed text-sm font-medium text-muted-foreground/70"
              aria-disabled
            >
              Blog
            </a>
          </li>
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          <ThemeToggle />
          <a href={ctaHref} className="inline-flex">
            <Button
              size="sm"
              className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              {ctaLabel}
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="text-facioflow-dark-foreground"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Alternar menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-border bg-card/95 px-4 pb-4 dark:border-white/10 dark:bg-facioflow-dark md:hidden">
          {ROUTE_LINKS.map((link) => (
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
          <a
            href="#"
            onClick={(e) => {
              blogPlaceholderClick(e);
              setMobileMenuOpen(false);
            }}
            className="block cursor-not-allowed py-2 text-sm text-muted-foreground/70"
            aria-disabled
          >
            Blog
          </a>
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
