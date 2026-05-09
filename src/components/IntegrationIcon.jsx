export function IntegrationIcon({ className, size = 48, ...props }) {
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
      {/* === LINHAS DE CONEXÃO === */}
      {/* desenhadas com stroke-dasharray pra crescer do retângulo periférico até a borda do hub central */}

      {/* linha topo → centro (hub começa em y=22) */}
      <line
        x1="32"
        y1="14"
        x2="32"
        y2="22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8"
        strokeDashoffset="8"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="8;8;0;0;0;8"
          keyTimes="0;0.05;0.15;0.25;0.92;1"
          dur="12s"
          repeatCount="indefinite"
        />
      </line>

      {/* linha direita → centro (hub termina em x=42) */}
      <line
        x1="50"
        y1="32"
        x2="42"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8"
        strokeDashoffset="8"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="8;8;8;0;0;0;8"
          keyTimes="0;0.1;0.15;0.25;0.32;0.92;1"
          dur="12s"
          repeatCount="indefinite"
        />
      </line>

      {/* linha base → centro (hub termina em y=42) */}
      <line
        x1="32"
        y1="50"
        x2="32"
        y2="42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8"
        strokeDashoffset="8"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="8;8;8;8;0;0;0;8"
          keyTimes="0;0.15;0.2;0.25;0.32;0.4;0.92;1"
          dur="12s"
          repeatCount="indefinite"
        />
      </line>

      {/* linha esquerda → centro (hub começa em x=22) */}
      <line
        x1="14"
        y1="32"
        x2="22"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8"
        strokeDashoffset="8"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="8;8;8;8;8;0;0;0;8"
          keyTimes="0;0.2;0.25;0.3;0.35;0.4;0.48;0.92;1"
          dur="12s"
          repeatCount="indefinite"
        />
      </line>

      {/* === RETÂNGULOS PERIFÉRICOS (sistemas) === */}
      {/* sempre visíveis (representam os sistemas existentes do cliente) */}

      {/* retângulo topo */}
      <rect
        x="24"
        y="3"
        width="16"
        height="11"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.6"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* retângulo direita */}
      <rect
        x="50"
        y="26.5"
        width="11"
        height="11"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.6"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* retângulo base */}
      <rect
        x="24"
        y="50"
        width="16"
        height="11"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.6"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* retângulo esquerda */}
      <rect
        x="3"
        y="26.5"
        width="11"
        height="11"
        rx="2.5"
        fill="currentColor"
        fillOpacity="0.6"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* === HUB CENTRAL (retângulo maior) === */}
      <g>
        {/* anel pulsante de fundo — aparece após todas as conexões */}
        <rect
          x="22"
          y="22"
          width="20"
          height="20"
          rx="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0"
        >
          <animate
            attributeName="x"
            values="22;22;22;22;22;22;22;22;22;18;22;18;22"
            keyTimes="0;0.05;0.15;0.2;0.25;0.3;0.35;0.4;0.48;0.55;0.65;0.75;0.85"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values="22;22;22;22;22;22;22;22;22;18;22;18;22"
            keyTimes="0;0.05;0.15;0.2;0.25;0.3;0.35;0.4;0.48;0.55;0.65;0.75;0.85"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="width"
            values="20;20;20;20;20;20;20;20;20;28;20;28;20"
            keyTimes="0;0.05;0.15;0.2;0.25;0.3;0.35;0.4;0.48;0.55;0.65;0.75;0.85"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="height"
            values="20;20;20;20;20;20;20;20;20;28;20;28;20"
            keyTimes="0;0.05;0.15;0.2;0.25;0.3;0.35;0.4;0.48;0.55;0.65;0.75;0.85"
            dur="12s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0;0;0;0;0;0;0;0;0.6;0;0.6;0"
            keyTimes="0;0.05;0.15;0.2;0.25;0.3;0.35;0.4;0.48;0.55;0.65;0.75;0.85"
            dur="12s"
            repeatCount="indefinite"
          />
        </rect>

        {/* hub retangular central — maior e com fill mais forte */}
        <rect
          x="22"
          y="22"
          width="20"
          height="20"
          rx="3.5"
          fill="currentColor"
          fillOpacity="0.85"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* núcleo central — recorte na cor de fundo pra dar profundidade */}
        <circle
          cx="32"
          cy="32"
          r="2.5"
          fill="hsl(222 47% 5%)"
          fillOpacity="0.6"
        />
      </g>
    </svg>
  )
}
