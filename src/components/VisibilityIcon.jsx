export function VisibilityIcon({ className, size = 48, ...props }) {
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
      {/* lente da lupa — círculo grande sempre visível */}
      <circle
        cx="26"
        cy="26"
        r="20"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2.75"
      />

      {/* cabo da lupa — linha grossa diagonal */}
      <line
        x1="40.5"
        y1="40.5"
        x2="56"
        y2="56"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* clipPath pra confinar o gráfico dentro do círculo da lente */}
      <defs>
        <clipPath id="ff-lens-clip">
          <circle cx="26" cy="26" r="18" />
        </clipPath>
      </defs>

      {/* conteúdo dentro da lente — gráfico de linha */}
      <g clipPath="url(#ff-lens-clip)">
        {/* eixo base sutil */}
        <line
          x1="14"
          y1="34"
          x2="38"
          y2="34"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* linha do gráfico — desenhada progressivamente via stroke-dasharray */}
        <path
          d="M14 32 L19 28 L24 30 L29 22 L34 24 L38 16"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="50"
          strokeDashoffset="50"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="50;50;0;0;0;50"
            keyTimes="0;0.05;0.32;0.4;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>

        {/* pontinho final do gráfico — pulsa quando o desenho termina */}
        <circle
          cx="38"
          cy="16"
          r="2"
          fill="currentColor"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0;1;1;0"
            keyTimes="0;0.3;0.32;0.4;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="2;2;2;2;3.5;2;3.5;2"
            keyTimes="0;0.3;0.32;0.4;0.5;0.6;0.7;0.8"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* highlight da lupa — meia-luna sutil pra dar ideia de vidro/lente */}
      <path
        d="M14 18 Q14 12 20 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}
