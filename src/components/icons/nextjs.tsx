import type { SVGProps } from "react"

export function NextjsIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" {...props}>
            <mask
                height="180"
                id="nextjs-mask0"
                maskUnits="userSpaceOnUse"
                width="180"
                x="0"
                y="0"
                style={{ maskType: "alpha" }}
            >
                <circle cx="90" cy="90" fill="black" r="90" />
            </mask>
            <g mask="url(#nextjs-mask0)">
                <circle cx="90" cy="90" fill="black" r="90" />
                <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="url(#nextjs-paint0)"
                />
                <rect fill="url(#nextjs-paint1)" height="72" width="12" x="115" y="54" />
            </g>
            <defs>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="nextjs-paint0"
                    x1="109"
                    x2="144.5"
                    y1="116.5"
                    y2="160.5"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="nextjs-paint1"
                    x1="121"
                    x2="120.799"
                    y1="54"
                    y2="106.875"
                >
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function NextjsDarkIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" {...props}>
            <mask
                height="180"
                id="nextjs-dark-mask0"
                maskUnits="userSpaceOnUse"
                width="180"
                x="0"
                y="0"
                style={{ maskType: "alpha" }}
            >
                <circle cx="90" cy="90" fill="black" r="90" />
            </mask>
            <g mask="url(#nextjs-dark-mask0)">
                <circle cx="90" cy="90" fill="white" r="90" />
                <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="url(#nextjs-dark-paint0)"
                />
                <rect fill="url(#nextjs-dark-paint1)" height="72" width="12" x="115" y="54" />
            </g>
            <defs>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="nextjs-dark-paint0"
                    x1="109"
                    x2="144.5"
                    y1="116.5"
                    y2="160.5"
                >
                    <stop stopColor="black" />
                    <stop offset="1" stopColor="black" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="nextjs-dark-paint1"
                    x1="121"
                    x2="120.799"
                    y1="54"
                    y2="106.875"
                >
                    <stop stopColor="black" />
                    <stop offset="1" stopColor="black" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    )
}
