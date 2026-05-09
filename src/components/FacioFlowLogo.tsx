import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import logoDarkMode from "@/assets/logo-facioflow.png";
import logoLightMode from "@/assets/logo-facioflow-preta.png";

type FacioFlowLogoProps = {
  className?: string;
};

/** Logo padrão (clara) no dark mode; versão preta no light mode. */
const FacioFlowLogo = ({ className }: FacioFlowLogoProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const src = mounted && resolvedTheme === "light" ? logoLightMode : logoDarkMode;

  return <img src={src} alt="FacioFlow" className={className} decoding="async" />;
};

export default FacioFlowLogo;
