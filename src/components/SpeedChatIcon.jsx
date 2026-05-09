export function SpeedChatIcon({ className, size = 48, ...props }) {
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
      {/* balão 1 — pergunta (sobe pela direita) */}
      <g>
        <path
          d="M34 8h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H44l-6 5v-5h-4a4 4 0 0 1-4-4V12a4 4 0 0 1 4-4z"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="round"
          opacity="0"
          transform="translate(0 12)"
        >
          <animate
            attributeName="opacity"
            values="0;1;1;1;0"
            keyTimes="0;0.08;0.25;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 12; 0 0; 0 0; 0 0; 0 -4"
            keyTimes="0;0.08;0.25;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        {/* 3 dotinhos dentro do balão da pergunta */}
        <g opacity="0">
          <circle cx="40" cy="19" r="1.5" fill="currentColor" />
          <circle cx="44" cy="19" r="1.5" fill="currentColor" />
          <circle cx="48" cy="19" r="1.5" fill="currentColor" />
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes="0;0.1;0.16;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 12; 0 0; 0 0; 0 0; 0 -4"
            keyTimes="0;0.08;0.25;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </g>

      {/* balão 2 — resposta (sobe pela esquerda, depois) */}
      <g>
        <path
          d="M10 32h20a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H20l-6 5v-5h-4a4 4 0 0 1-4-4V36a4 4 0 0 1 4-4z"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="round"
          opacity="0"
          transform="translate(0 12)"
        >
          <animate
            attributeName="opacity"
            values="0;0;1;1;0"
            keyTimes="0;0.22;0.32;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 12; 0 12; 0 0; 0 0; 0 -4"
            keyTimes="0;0.22;0.32;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
        {/* check duplo dentro do balão da resposta — comunica "respondido" */}
        <g opacity="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M14 44 l3 3 l6 -7" />
          <path d="M21 44 l3 3 l6 -7" />
          <animate
            attributeName="opacity"
            values="0;0;0;1;0"
            keyTimes="0;0.32;0.36;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 12; 0 12; 0 0; 0 0; 0 -4"
            keyTimes="0;0.22;0.32;0.92;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </g>
    </svg>
  )
}
