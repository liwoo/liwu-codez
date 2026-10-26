import { KeyboardEvent, ReactNode } from "react"

export type HotspotId =
  | "me"
  | "monitors"
  | "whiteboard"
  | "plant"
  | "window"
  | "mic"
  | "shelf"
  | "mug"
  | "posters"
  | "lamp"

export interface HotspotInfo {
  id: HotspotId
  label: string
  // Where the pulsing marker sits, in the scene's 1600×900 coordinates
  marker: [number, number]
}

export const HOTSPOTS: HotspotInfo[] = [
  { id: "me", label: "Say hi to Jeremiah", marker: [896, 404] },
  { id: "monitors", label: "What I do", marker: [1072, 338] },
  { id: "whiteboard", label: "The journey so far", marker: [1455, 135] },
  { id: "posters", label: "Faith, family & football", marker: [612, 140] },
  { id: "window", label: "From Thyolo to Manchester", marker: [355, 140] },
  { id: "plant", label: "In my mates' words", marker: [470, 505] },
  { id: "mic", label: "Liwu the rapper", marker: [548, 432] },
  { id: "shelf", label: "Latest writing", marker: [1428, 470] },
  { id: "mug", label: "Buy me a coffee", marker: [1046, 506] },
  { id: "lamp", label: "Flip the lights", marker: [1158, 418] },
]

// On narrow screens the room is walked through frame by frame (see pages/about.tsx).
// `center` is the x the frame centres on, in scene coordinates.
export const FRAMES = [
  { label: "The window", center: 250 },
  { label: "Plants, mic & posters", center: 560 },
  { label: "At the desk", center: 840 },
  { label: "Coffee & the lamp", center: 1090 },
  { label: "Whiteboard & bookshelf", center: 1320 },
]

const hotspot = (id: HotspotId) => HOTSPOTS.find(h => h.id === id)

// CSS variables (see styles/studio.css) drive every colour, so day/night is pure CSS
const fill = (name: string) => ({ fill: `var(--${name})` })
const stroke = (name: string) => ({ stroke: `var(--${name})` })

interface SceneHandlers {
  onSelect: (id: HotspotId) => void
  // Lets the page bring an off-screen object into view when it gets keyboard focus
  onFocusHotspot?: (id: HotspotId) => void
}

interface HotspotProps extends SceneHandlers {
  id: HotspotId
  children: ReactNode
}

function Hotspot({ id, onSelect, onFocusHotspot, children }: HotspotProps) {
  const { label, marker } = hotspot(id)
  const [x, y] = marker
  const tipWidth = label.length * 9.4 + 28
  // Keep labels inside the area that survives a 16:10 crop, and below the dot near the top (the nav lives there)
  const tipX = Math.min(Math.max(x - tipWidth / 2, 100), 1500 - tipWidth)
  const tipY = y < 200 ? y + 26 : y - 58
  const onKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onSelect(id)
    }
  }
  return (
    <g className="hotspot" role="button" tabIndex={0} aria-label={label} onClick={() => onSelect(id)} onKeyDown={onKeyDown} onFocus={() => onFocusHotspot?.(id)}>
      <g className="art">{children}</g>
      <g className="marker" aria-hidden="true">
        <circle className="pulse" cx={x} cy={y} r={15} />
        <circle className="focus-ring" cx={x} cy={y} r={22} />
        <circle className="dot" cx={x} cy={y} r={8} />
      </g>
      <g className="tip" aria-hidden="true">
        <rect x={tipX} y={tipY} width={tipWidth} height={34} rx={17} />
        <text x={tipX + tipWidth / 2} y={tipY + 23} textAnchor="middle">{label}</text>
      </g>
    </g>
  )
}

export default function RoomScene({ onSelect, onFocusHotspot }: SceneHandlers) {
  const handlers = { onSelect, onFocusHotspot }
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="block w-full h-full theme-fade"
      role="group"
      aria-label="Jeremiah's studio. Select objects in the room to learn more about him.">
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--wall-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--wall-bottom)" }} />
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--sky-top)" }} />
          <stop offset="1" style={{ stopColor: "var(--sky-bottom)" }} />
        </linearGradient>
        <radialGradient id="screen-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7fb2ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7fb2ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lamp-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rgb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff3d6e" />
          <stop offset="0.33" stopColor="#ffd23d" />
          <stop offset="0.66" stopColor="#3dffb5" />
          <stop offset="1" stopColor="#3d8bff" />
        </linearGradient>
        <clipPath id="window-clip"><rect x="98" y="128" width="264" height="324" /></clipPath>
        <clipPath id="screen-left"><rect x="594" y="327" width="229" height="162" rx="3" /></clipPath>
        <clipPath id="screen-right"><rect x="857" y="327" width="229" height="162" rx="3" /></clipPath>
      </defs>

      {/* ── Room shell ─────────────────────────────── */}
      <rect width="1600" height="640" fill="url(#wall)" />
      <rect y="0" width="1600" height="18" style={fill("wall-bottom")} opacity="0.6" />
      <rect y="640" width="1600" height="260" style={fill("floor")} />
      {[675, 720, 775, 840].map(y => <line key={y} x1="0" y1={y} x2="1600" y2={y} style={stroke("floor-line")} strokeWidth="3" />)}
      {[[120, 640, 60, 900], [420, 640, 360, 900], [760, 675, 735, 720], [1080, 640, 1140, 900], [1380, 640, 1500, 900], [600, 775, 580, 840], [980, 720, 1000, 775]].map(([x1, y1, x2, y2], i) =>
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} style={stroke("floor-line")} strokeWidth="3" />)}
      <rect y="628" width="1600" height="14" style={fill("baseboard")} />

      {/* Sunlight from the window by day */}
      <polygon points="98,452 362,452 640,900 160,900" fill="#fff6c8" style={{ opacity: "var(--sunbeam-opacity)" as unknown as number }} />

      {/* ── Window: the view from home ─────────────── */}
      <Hotspot id="window" {...handlers}>
        <rect x="86" y="116" width="288" height="348" rx="6" style={fill("baseboard")} />
        <g clipPath="url(#window-clip)">
          <rect x="98" y="128" width="264" height="324" fill="url(#sky)" />
          <circle cx="300" cy="190" r="30" style={{ ...fill("note-yellow"), opacity: "var(--sun-opacity)" as unknown as number }} />
          <circle cx="292" cy="186" r="26" fill="#f6c6e3" style={{ opacity: "var(--moon-opacity)" as unknown as number }} />
          <g className="stars" fill="#fff" style={{ opacity: "var(--stars-opacity)" as unknown as number }}>
            {[[130, 160], [170, 210], [220, 150], [250, 240], [340, 260], [150, 280], [200, 300], [330, 150]].map(([cx, cy], i) =>
              <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 2.5 : 1.6} />)}
          </g>
          <g className="clouds" fill="#fff" style={{ opacity: "var(--clouds-opacity)" as unknown as number }}>
            <ellipse cx="150" cy="230" rx="40" ry="12" />
            <ellipse cx="175" cy="220" rx="26" ry="14" />
            <ellipse cx="80" cy="290" rx="34" ry="10" />
          </g>
          <path d="M98 360 Q150 300 210 335 T330 310 T380 330 V452 H98 Z" style={fill("hill-far")} />
          <path d="M98 395 Q170 345 240 380 T380 365 V452 H98 Z" style={fill("hill-mid")} />
          <path d="M98 425 Q190 395 270 420 T380 410 V452 H98 Z" style={fill("hill-near")} />
        </g>
        <rect x="226" y="128" width="8" height="324" style={fill("baseboard")} />
        <rect x="98" y="286" width="264" height="8" style={fill("baseboard")} />
        <rect x="74" y="458" width="312" height="16" rx="4" style={fill("baseboard")} />
        {/* Curtains */}
        <path d="M60 100 Q80 280 64 480 L104 480 Q120 300 112 100 Z" style={fill("curtain")} />
        <path d="M82 100 Q96 290 84 480 L96 480 Q108 290 100 100 Z" style={fill("curtain-shade")} />
        <path d="M348 100 Q340 300 356 480 L396 480 Q380 280 400 100 Z" style={fill("curtain")} />
        <path d="M366 100 Q358 290 370 480 L380 480 Q372 290 382 100 Z" style={fill("curtain-shade")} />
        <rect x="46" y="92" width="368" height="10" rx="5" style={fill("metal-dark")} />
      </Hotspot>

      {/* Hanging plant by the window (decorative) */}
      <g aria-hidden="true">
        <line x1="470" y1="0" x2="470" y2="96" style={stroke("metal-dark")} strokeWidth="2" />
        <g className="plant-sway-slow">
          <path d="M446 96 H494 L486 128 H454 Z" style={fill("pot")} />
          {[[452, 126, 438, 190], [462, 126, 456, 220], [478, 126, 486, 205], [490, 126, 506, 175]].map(([x1, y1, x2, y2], i) => (
            <g key={i}>
              <path d={`M${x1} ${y1} Q${(x1 + x2) / 2 - 8} ${(y1 + y2) / 2} ${x2} ${y2}`} fill="none" style={stroke("leaf-dark")} strokeWidth="2.5" />
              {[0.35, 0.65, 1].map(t => <ellipse key={t} cx={x1 + (x2 - x1) * t} cy={y1 + (y2 - y1) * t} rx="7" ry="4.5" style={fill(t === 1 ? "leaf-light" : "leaf")} />)}
            </g>
          ))}
        </g>
      </g>

      {/* ── Posters (Gunners shield, VR portrait, "Programmer") ── */}
      <Hotspot id="posters" {...handlers}>
        <rect x="560" y="120" width="106" height="150" rx="4" style={fill("poster-red")} />
        <path d="M579 145 H647 V200 Q647 240 613 256 Q579 240 579 200 Z" fill="#fff" opacity="0.92" />
        <path d="M586 152 H640 V198 Q640 232 613 246 Q586 232 586 198 Z" style={fill("poster-red")} />
        <text x="613" y="190" textAnchor="middle" fill="#fff" fontFamily="Georgia, serif" fontWeight="700" fontSize="15">COYG</text>
        <rect x="596" y="202" width="34" height="6" rx="3" fill="#f2c94c" />
        <rect x="684" y="110" width="120" height="164" rx="4" style={fill("poster-orange")} />
        <rect x="684" y="110" width="44" height="164" style={fill("poster-red")} opacity="0.8" />
        <circle cx="746" cy="190" r="36" fill="#3a2418" />
        <rect x="712" y="172" width="68" height="24" rx="10" fill="#111" />
        <path d="M716 250 Q746 222 776 250 V274 H716 Z" fill="#3a2418" />
        <rect x="822" y="104" width="150" height="190" rx="4" style={fill("poster-dark")} />
        <text x="834" y="134" fill="#fff" fontFamily="Space Grotesk, sans-serif" fontSize="9">Programmer x1  100% Organic</text>
        <text x="834" y="164" fill="#fff" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="21">Programmer®</text>
        {[0, 1, 2, 3, 4].map(i => <rect key={i} x={836 + i * 25} y="178" width="20" height="20" rx="2" fill="none" stroke="#fff" strokeWidth="1.5" />)}
        {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x="836" y={210 + i * 9} width={i % 2 ? 100 : 120} height="3" fill="#fff" opacity="0.7" />)}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => <rect key={i} x={890 + i * 6} y="268" width={i % 3 ? 2 : 4} height="18" fill="#fff" />)}
        <text x="836" y="284" fill="#fff" fontFamily="Space Grotesk, sans-serif" fontSize="10">0905 1990</text>
      </Hotspot>

      {/* ── Whiteboard: the journey so far ─────────── */}
      <Hotspot id="whiteboard" {...handlers}>
        <g transform="translate(-50 0)">
        <rect x="1186" y="110" width="350" height="290" rx="6" style={fill("board-frame")} />
        <rect x="1196" y="120" width="330" height="270" rx="3" style={fill("board")} />
        <g fontFamily="'Marker Felt', 'Comic Sans MS', 'Chalkboard SE', cursive" fontSize="17" style={fill("board-ink")}>
          <text x="1212" y="150" fontSize="20" fontWeight="700">the journey →</text>
          <path d="M1214 200 H1500" style={stroke("board-ink")} strokeWidth="3" strokeLinecap="round" fill="none" />
          {[1230, 1300, 1370, 1440, 1500].map((x, i) => <circle key={x} cx={x} cy="200" r="7" style={fill(i === 4 ? "board-red" : "board-ink")} />)}
          <text x="1214" y="232" fontSize="14">MW</text>
          <text x="1284" y="232" fontSize="14">JP</text>
          <text x="1354" y="232" fontSize="14">RW</text>
          <text x="1424" y="232" fontSize="14">DK</text>
          <text x="1486" y="232" fontSize="14" style={fill("board-red")}>UK</text>
          <rect x="1214" y="262" width="78" height="34" rx="6" fill="none" style={stroke("board-ink")} strokeWidth="2.5" />
          <text x="1226" y="285" fontSize="15">user</text>
          <path d="M1294 279 H1326" style={stroke("board-ink")} strokeWidth="2.5" markerEnd="" />
          <rect x="1328" y="262" width="82" height="34" rx="6" fill="none" style={stroke("board-red")} strokeWidth="2.5" />
          <text x="1338" y="285" fontSize="15" style={fill("board-red")}>agent</text>
          <path d="M1412 270 L1440 256 M1412 288 L1440 304" style={stroke("board-ink")} strokeWidth="2.5" />
          <text x="1444" y="262" fontSize="14">RAG</text>
          <text x="1444" y="312" fontSize="14">tools</text>
          <text x="1212" y="350" fontSize="15">evals or it didn't happen ✓</text>
        </g>
        <rect x="1430" y="132" width="60" height="56" style={fill("note-yellow")} transform="rotate(4 1460 160)" />
        <text x="1440" y="164" fontSize="11" fontFamily="'Marker Felt', 'Comic Sans MS', cursive" fill="#333" transform="rotate(4 1460 160)">ship it!</text>
        <rect x="1196" y="390" width="330" height="12" rx="3" style={fill("board-frame")} />
        <rect x="1240" y="384" width="34" height="8" rx="3" style={fill("board-red")} />
        <rect x="1282" y="384" width="34" height="8" rx="3" style={fill("board-ink")} />
        </g>
      </Hotspot>

      {/* ── Bookshelf: latest writing ─────────────── */}
      <Hotspot id="shelf" {...handlers}>
        <g transform="translate(-50 0)">
        <rect x="1226" y="452" width="282" height="340" rx="6" style={fill("shelf")} />
        <rect x="1240" y="466" width="254" height="312" style={fill("shelf-dark")} />
        {[566, 668].map(y => <rect key={y} x="1240" y={y} width="254" height="10" style={fill("shelf")} />)}
        {[["#33669a", 26, 84], ["#c8102e", 20, 76], ["#f5c518", 30, 88], ["#4b547b", 18, 70], ["#d9914d", 24, 82], ["#70d94d", 20, 74], ["#d044bb", 28, 86]].map(([c, w, h], i, all) => {
          const x = 1250 + all.slice(0, i).reduce((sum, b) => sum + (b[1] as number) + 3, 0)
          return <rect key={i} x={x} y={566 - (h as number)} width={w as number} height={h as number} rx="2" fill={c as string} />
        })}
        <rect x="1420" y="530" width="60" height="36" rx="3" fill="#e9e3d7" transform="rotate(-8 1450 548)" />
        {/* Headphones and a vinyl on the middle shelf */}
        <path d="M1262 664 Q1262 610 1300 610 Q1338 610 1338 664" fill="none" stroke="#111" strokeWidth="7" strokeLinecap="round" />
        <rect x="1252" y="636" width="18" height="30" rx="7" fill="#111" />
        <rect x="1330" y="636" width="18" height="30" rx="7" fill="#111" />
        <circle cx="1420" cy="628" r="38" fill="#111" />
        <circle cx="1420" cy="628" r="12" fill="#c8102e" />
        {[["#4b547b", 24, 80], ["#fad9ba", 18, 70], ["#33669a", 28, 86], ["#c8102e", 22, 76]].map(([c, w, h], i, all) => {
          const x = 1252 + all.slice(0, i).reduce((sum, b) => sum + (b[1] as number) + 3, 0)
          return <rect key={i} x={x} y={768 - (h as number)} width={w as number} height={h as number} rx="2" fill={c as string} />
        })}
        <path d="M1400 768 L1424 700 L1448 768 Z" fill="#e7b547" />
        <rect x="1408" y="760" width="32" height="10" fill="#b98a2e" />
        </g>
      </Hotspot>

      {/* ── Floor plant (monstera) ─────────────────── */}
      <Hotspot id="plant" {...handlers}>
        <g className="plant-sway">
          {[
            "M470 700 Q420 640 400 560 Q450 580 470 700",
            "M470 700 Q500 610 540 560 Q545 640 470 700",
            "M470 700 Q440 600 470 520 Q500 600 470 700",
            "M470 700 Q400 690 380 640 Q440 640 470 700",
            "M470 700 Q540 680 560 630 Q500 640 470 700",
          ].map((d, i) => (
            <g key={i}>
              <path d={d} style={fill(i % 2 ? "leaf" : "leaf-dark")} />
            </g>
          ))}
          <path d="M470 700 V540" style={stroke("leaf-dark")} strokeWidth="3" />
        </g>
        <path d="M426 690 H514 L502 790 H438 Z" style={fill("pot")} />
        <path d="M426 690 H514 L512 708 H428 Z" style={fill("pot-shade")} />
      </Hotspot>

      {/* ── Desk ───────────────────────────────────── */}
      <g aria-hidden="true">
        <rect x="508" y="590" width="26" height="232" style={fill("desk-edge")} />
        <rect x="1118" y="590" width="26" height="232" style={fill("desk-edge")} />
        <rect x="990" y="592" width="128" height="200" style={fill("desk")} />
        <rect x="1000" y="610" width="108" height="78" rx="3" style={fill("desk-edge")} />
        <rect x="1000" y="700" width="108" height="78" rx="3" style={fill("desk-edge")} />
        <rect x="1040" y="645" width="28" height="6" rx="3" style={fill("metal")} />
        <rect x="1040" y="735" width="28" height="6" rx="3" style={fill("metal")} />
        <path d="M490 556 H1162 L1150 592 H502 Z" style={fill("desk")} />
        <rect x="502" y="590" width="648" height="10" style={fill("desk-shadow")} />
      </g>

      {/* Monitor glow behind everything on the desk, stronger at night */}
      <ellipse cx="840" cy="420" rx="330" ry="150" fill="url(#screen-glow)" style={{ opacity: "var(--glow-opacity)" as unknown as number }} aria-hidden="true" />

      {/* ── Dual monitors: what I do ───────────────── */}
      <Hotspot id="monitors" {...handlers}>
        {[[702, 498], [966, 498]].map(([x, y]) => (
          <g key={x}>
            <rect x={x} y={y} width="16" height="48" style={fill("metal-dark")} />
            <ellipse cx={x + 8} cy="556" rx="46" ry="6" style={fill("metal-dark")} />
          </g>
        ))}
        <rect x="585" y="318" width="247" height="180" rx="8" style={fill("bezel")} />
        <rect x="848" y="318" width="247" height="180" rx="8" style={fill("bezel")} />
        <rect x="594" y="327" width="229" height="162" rx="3" style={fill("screen")} />
        <rect x="857" y="327" width="229" height="162" rx="3" style={fill("screen")} />
        {/* Left: code editor */}
        <g clipPath="url(#screen-left)">
          <rect x="594" y="327" width="30" height="162" fill="#1a2238" />
          <g className="code-scroll">
            {Array.from({ length: 30 }).map((_, i) => {
              const indent = [0, 12, 24, 24, 12, 0, 12, 24, 36, 24][i % 10]
              const palette = ["#c792ea", "#82aaff", "#c3e88d", "#ffcb6b", "#89ddff", "#f78c6c"]
              const widths = [40, 70, 55, 90, 30, 64, 80, 46]
              return (
                <g key={i}>
                  <rect x={634 + indent} y={338 + i * 10} width={widths[i % 8] * 0.6} height="5" rx="2" fill={palette[i % 6]} />
                  <rect x={634 + indent + widths[i % 8] * 0.6 + 6} y={338 + i * 10} width={widths[(i + 3) % 8] * 0.7} height="5" rx="2" fill={palette[(i + 2) % 6]} opacity="0.85" />
                </g>
              )
            })}
          </g>
        </g>
        {/* Right: agent trace + eval scores */}
        <g clipPath="url(#screen-right)" fontFamily="Menlo, monospace" fontSize="10">
          <rect x="857" y="327" width="229" height="18" fill="#1a2238" />
          <circle cx="868" cy="336" r="3.5" fill="#ff5f57" />
          <circle cx="880" cy="336" r="3.5" fill="#febc2e" />
          <circle cx="892" cy="336" r="3.5" fill="#28c840" />
          <text x="868" y="362" fill="#3dffb5">$ agent run --evals</text>
          <text x="868" y="378" fill="#82aaff">✓ retrieve  0.94</text>
          <text x="868" y="394" fill="#82aaff">✓ ground    0.97</text>
          <text x="868" y="410" fill="#ffcb6b">✓ tone      0.91</text>
          <text x="868" y="426" fill="#fff">→ ship it<tspan className="cursor">▋</tspan></text>
          <g className="bars">
            {[0, 1, 2, 3, 4].map(i => <rect key={i} x={986 + i * 18} y={440 - [30, 46, 38, 56, 50][i]} width="12" height={[30, 46, 38, 56, 50][i]} fill={["#3dffb5", "#82aaff", "#ffcb6b", "#c792ea", "#f78c6c"][i]} />)}
          </g>
          <line x1="980" y1="441" x2="1080" y2="441" stroke="#455" />
          <rect x="868" y="452" width="200" height="22" rx="11" fill="#1a2238" />
          <text x="880" y="467" fill="#8a9bb8">Ask IremboAI anything…</text>
        </g>
        {/* Webcam on top */}
        <rect x="818" y="306" width="44" height="12" rx="5" fill="#222" />
        <circle cx="840" cy="312" r="3" fill="#3d8bff" />
      </Hotspot>

      {/* ── Mic on a stand: Liwu the rapper ────────── */}
      <Hotspot id="mic" {...handlers}>
        <path d="M548 556 L566 520 L584 556" fill="none" style={stroke("mic-stand")} strokeWidth="4" strokeLinecap="round" />
        <line x1="566" y1="520" x2="566" y2="482" style={stroke("mic-stand")} strokeWidth="5" />
        <rect x="553" y="440" width="26" height="48" rx="13" style={fill("mic")} />
        {[448, 456, 464].map(y => <line key={y} x1="556" y1={y} x2="576" y2={y} style={stroke("mic-grille")} strokeWidth="2" />)}
        <circle cx="530" cy="458" r="22" style={fill("mic-stand")} opacity="0.85" />
        <circle cx="530" cy="458" r="17" fill="none" style={stroke("mic-grille")} strokeWidth="1.5" />
        <line x1="545" y1="474" x2="553" y2="480" style={stroke("mic-stand")} strokeWidth="3" />
      </Hotspot>

      {/* Small desk succulent + notebook (decorative) */}
      <g aria-hidden="true">
        <path d="M612 540 H648 L644 558 H616 Z" style={fill("pot")} />
        {[[620, 540, 612, 520], [630, 540, 630, 514], [640, 540, 650, 522], [626, 540, 618, 528], [636, 540, 644, 526]].map(([x1, y1, x2, y2], i) =>
          <path key={i} d={`M${x1} ${y1} Q${x2 - 2} ${(y1 + y2) / 2} ${x2} ${y2} Q${x2 + 4} ${(y1 + y2) / 2} ${x1 + 4} ${y1} Z`} style={fill(i % 2 ? "leaf-light" : "leaf")} />)}
        <path d="M930 566 L1000 562 L1006 574 L934 578 Z" fill="#1a1a1a" />
        <text x="948" y="574" fontSize="7" fill="#fff" fontFamily="Space Grotesk, sans-serif" transform="rotate(-3 960 570)">liwu</text>
      </g>

      {/* ── Coffee mug: buy me a coffee ────────────── */}
      <Hotspot id="mug" {...handlers}>
        <g className="steam" fill="none" style={stroke("steam")} strokeWidth="3" strokeLinecap="round" opacity="0.8">
          <path d="M1038 520 Q1032 510 1038 500 Q1044 490 1038 480" />
          <path d="M1048 522 Q1042 512 1048 502 Q1054 492 1048 482" />
          <path d="M1058 520 Q1052 510 1058 500 Q1064 490 1058 480" />
        </g>
        <path d="M1030 526 H1068 V556 Q1068 566 1058 566 H1040 Q1030 566 1030 556 Z" style={fill("mug")} />
        <path d="M1068 532 Q1084 532 1084 544 Q1084 556 1068 556" fill="none" style={stroke("mug")} strokeWidth="5" />
        <rect x="1030" y="526" width="38" height="5" fill="#000" opacity="0.15" />
      </Hotspot>

      {/* ── Desk lamp: flips the theme ─────────────── */}
      <polygon points="1086,452 1124,446 1170,566 980,566" fill="url(#lamp-light)" style={{ opacity: "var(--lamp-opacity)" as unknown as number }} aria-hidden="true" />
      <Hotspot id="lamp" {...handlers}>
        <ellipse cx="1132" cy="556" rx="28" ry="7" fill="#222" />
        <path d="M1132 552 L1150 470 L1112 440" fill="none" stroke="#2b2b30" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="1150" cy="470" r="6" fill="#444" />
        <path d="M1086 452 L1112 426 L1132 448 L1124 456 Z" fill="#2b2b30" />
        <ellipse cx="1105" cy="452" rx="20" ry="6" fill="#ffe9a8" transform="rotate(-38 1105 452)" style={{ opacity: "calc(var(--lamp-opacity) * 3)" as unknown as number }} />
      </Hotspot>

      {/* ── Keyboard + mouse ───────────────────────── */}
      <g aria-hidden="true">
        <path d="M772 560 H910 L916 576 H766 Z" fill="#111" />
        <path d="M776 563 H906 L910 573 H772 Z" fill="url(#rgb)" className="keyboard-glow" opacity="0.65" />
        <ellipse cx="950" cy="566" rx="9" ry="6" fill="#111" />
      </g>

      {/* Rug (drawn before the chair so the wheels sit on it) */}
      <ellipse cx="840" cy="856" rx="300" ry="36" style={fill("rug")} opacity="0.9" aria-hidden="true" />
      <ellipse cx="840" cy="856" rx="270" ry="26" fill="none" style={stroke("rug-pattern")} strokeWidth="3" strokeDasharray="14 10" aria-hidden="true" />

      {/* ── Me, at the desk ────────────────────────── */}
      <Hotspot id="me" {...handlers}>
        <g className="breathe">
          {/* Arms reach forward to the keyboard */}
          <g className="typing-left">
            <path d="M780 506 Q752 520 750 556" fill="none" style={stroke("shirt")} strokeWidth="28" strokeLinecap="round" />
            <path d="M752 556 L796 568" fill="none" style={stroke("skin")} strokeWidth="17" strokeLinecap="round" />
            <circle cx="800" cy="569" r="10" style={fill("skin-shade")} />
          </g>
          <g className="typing-right">
            <path d="M900 506 Q928 520 930 556" fill="none" style={stroke("shirt")} strokeWidth="28" strokeLinecap="round" />
            <path d="M928 556 L884 568" fill="none" style={stroke("skin")} strokeWidth="17" strokeLinecap="round" />
            <circle cx="880" cy="569" r="10" style={fill("skin-shade")} />
          </g>
          {/* Torso in the brand-yellow tee */}
          <path d="M770 530 Q772 490 812 482 H868 Q908 490 910 530 L904 610 H776 Z" style={fill("shirt")} />
          <path d="M840 486 V600" style={stroke("shirt-shade")} strokeWidth="3" opacity="0.5" />
          <path d="M776 560 Q840 575 904 560 L904 610 H776 Z" style={fill("shirt-shade")} opacity="0.35" />
          {/* Head from behind: neck, ears, gold chain, locs */}
          <g className="head">
            <rect x="824" y="456" width="32" height="34" rx="10" style={fill("skin-shade")} />
            <path d="M818 484 Q840 496 862 484" fill="none" style={stroke("chain")} strokeWidth="3" />
            <ellipse cx="801" cy="438" rx="8" ry="12" style={fill("skin")} />
            <ellipse cx="879" cy="438" rx="8" ry="12" style={fill("skin")} />
            <ellipse cx="840" cy="430" rx="38" ry="44" style={fill("skin")} />
            <path d="M802 428 Q800 384 840 382 Q880 384 878 428 Q875 454 840 458 Q805 454 802 428 Z" style={fill("hair")} />
            <g className="locs">
              {[[812, 424, 806, 482], [822, 432, 818, 494], [832, 436, 830, 500], [842, 436, 844, 502], [852, 434, 856, 498], [862, 430, 866, 490], [870, 424, 876, 478], [818, 410, 798, 462], [864, 410, 884, 460]].map(([x1, y1, x2, y2], i) => (
                <path key={i} d={`M${x1} ${y1} Q${(x1 + x2) / 2 + (i % 2 ? 4 : -4)} ${(y1 + y2) / 2} ${x2} ${y2}`} fill="none" style={stroke(i % 3 ? "hair" : "hair-light")} strokeWidth="9" strokeLinecap="round" />
              ))}
            </g>
          </g>
        </g>
        {/* Gaming chair (black with red trim) in front of him */}
        <rect x="770" y="586" width="140" height="150" rx="24" style={fill("chair")} />
        <rect x="778" y="594" width="16" height="134" rx="8" style={fill("chair-accent")} />
        <rect x="886" y="594" width="16" height="134" rx="8" style={fill("chair-accent")} />
        <rect x="756" y="730" width="168" height="26" rx="12" style={fill("chair")} />
        <rect x="834" y="756" width="12" height="44" style={fill("metal-dark")} />
        <path d="M760 812 L840 798 L920 812" fill="none" style={stroke("chair")} strokeWidth="9" strokeLinecap="round" />
        <path d="M800 818 L840 800 L880 818" fill="none" style={stroke("chair")} strokeWidth="9" strokeLinecap="round" />
        {[760, 800, 880, 920].map(x => <circle key={x} cx={x} cy="820" r="8" fill="#111" />)}
        {/* Hello bubble on arrival */}
        <g className="bubble" aria-hidden="true">
          <rect x="650" y="338" width="140" height="64" rx="16" fill="#fff" stroke="#032f4c" strokeWidth="2" />
          <path d="M766 400 L790 418 L750 402 Z" fill="#fff" stroke="#032f4c" strokeWidth="2" strokeLinejoin="round" />
          <rect x="746" y="398" width="24" height="5" fill="#fff" />
          <text x="720" y="364" textAnchor="middle" fill="#032f4c" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="17">Hey! 👋🏾</text>
          <text x="720" y="388" textAnchor="middle" fill="#032f4c" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="17">Look around</text>
        </g>
      </Hotspot>

    </svg>
  )
}
