export function ScalabilityIcon({ className, size = 48, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
      {...props}
    >
      {/* path da engrenagem reutilizado em cada bloco — 8 dentes */}
      <defs>
        <path
          id="ff-gear"
          d="M0 -7 L1.4 -7 L2 -5 L3.8 -4.2 L5.4 -5.2 L6.4 -4.2 L5.2 -2.6 L6 -0.8 L7 0 L7 1.4 L5 2 L4.2 3.8 L5.2 5.4 L4.2 6.4 L2.6 5.2 L0.8 6 L0 7 L-1.4 7 L-2 5 L-3.8 4.2 L-5.4 5.2 L-6.4 4.2 L-5.2 2.6 L-6 0.8 L-7 0 L-7 -1.4 L-5 -2 L-4.2 -3.8 L-5.2 -5.4 L-4.2 -6.4 L-2.6 -5.2 L-0.8 -6 Z"
        />
      </defs>

      {/* BLOCO 1 — operação base, sempre visível */}
      <g>
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="4"
          fill="currentColor"
          fillOpacity="0.85"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* engrenagem girando dentro */}
        <g transform="translate(16 16)">
          <use href="#ff-gear" fill="hsl(222 47% 5%)" fillOpacity="0.6" stroke="hsl(222 47% 5%)" strokeWidth="0.5" strokeOpacity="0.4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="4s"
              repeatCount="indefinite"
            />
          </use>
          {/* furo central */}
          <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.85" />
        </g>
      </g>

      {/* BLOCO 2 — replica pra direita */}
      <g opacity="0">
        <rect
          x="36"
          y="4"
          width="24"
          height="24"
          rx="4"
          fill="currentColor"
          fillOpacity="0.6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <g transform="translate(48 16)">
          <use href="#ff-gear" fill="hsl(222 47% 5%)" fillOpacity="0.6" stroke="hsl(222 47% 5%)" strokeWidth="0.5" strokeOpacity="0.4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360"
              to="0"
              dur="4s"
              repeatCount="indefinite"
            />
          </use>
          <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.6" />
        </g>
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.08;0.16;0.92;1"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>

      {/* BLOCO 3 — replica pra baixo */}
      <g opacity="0">
        <rect
          x="4"
          y="36"
          width="24"
          height="24"
          rx="4"
          fill="currentColor"
          fillOpacity="0.6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <g transform="translate(16 48)">
          <use href="#ff-gear" fill="hsl(222 47% 5%)" fillOpacity="0.6" stroke="hsl(222 47% 5%)" strokeWidth="0.5" strokeOpacity="0.4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="4s"
              repeatCount="indefinite"
            />
          </use>
          <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.6" />
        </g>
        <animate
          attributeName="opacity"
          values="0;0;0;1;1;0"
          keyTimes="0;0.16;0.2;0.24;0.92;1"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>

      {/* BLOCO 4 — completa o quadrante (canto inferior direito) */}
      <g opacity="0">
        <rect
          x="36"
          y="36"
          width="24"
          height="24"
          rx="4"
          fill="currentColor"
          fillOpacity="0.6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <g transform="translate(48 48)">
          <use href="#ff-gear" fill="hsl(222 47% 5%)" fillOpacity="0.6" stroke="hsl(222 47% 5%)" strokeWidth="0.5" strokeOpacity="0.4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360"
              to="0"
              dur="4s"
              repeatCount="indefinite"
            />
          </use>
          <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.6" />
        </g>
        <animate
          attributeName="opacity"
          values="0;0;0;0;0;1;1;0"
          keyTimes="0;0.16;0.2;0.24;0.28;0.32;0.92;1"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>

      {/* setinha de crescimento — aparece no canto após todos os blocos */}
      <g opacity="0">
        {/* círculo de fundo pra destacar a seta sobre o bloco azul */}
        <circle
          cx="56"
          cy="8"
          r="7"
          fill="hsl(222 47% 5%)"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* seta reta pra cima */}
        <g
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M56 12 L56 4" />
          <path d="M52.5 7 L56 4 L59.5 7" />
        </g>
        <animate
          attributeName="opacity"
          values="0;0;0;0;0;0;1;1;0"
          keyTimes="0;0.24;0.28;0.3;0.32;0.34;0.4;0.92;1"
          dur="6s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 4;0 4;0 4;0 4;0 4;0 4;0 0;0 0;0 -4"
          keyTimes="0;0.24;0.28;0.3;0.32;0.34;0.4;0.92;1"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  )
}
