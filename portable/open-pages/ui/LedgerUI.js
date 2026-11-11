import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useThemeMode } from '../theme';

export function Reveal({ children, delay = 0, row = false, className = "", ...rest }) {
  const [shown, setShown] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : row ? 'translateY(10px)' : 'translateY(20px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function Rule({ className = "" }) {
  return (
    <Box
      className={className}
      sx={{
        height: '1px',
        width: '100%',
        backgroundColor: 'var(--border-normal)',
        position: 'relative',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: -2,
          width: '1px',
          height: '5px',
          backgroundColor: 'var(--border-strong)',
        },
        '&::before': { left: 0 },
        '&::after': { right: 0 }
      }}
    />
  );
}

export const BRAND = {
  OA: { name: "OpenAI", base: "#0D0D0D", top: "#565656" },
  AN: { name: "Anthropic", base: "#D97757", top: "#e4a089" },
  GG: { name: "Google", base: "#4B6FD8", top: "#819ae4" },
  DS: { name: "DeepSeek", base: "#4D6BFE", top: "#8297fe" },
  MT: { name: "Meta", base: "#1d65c1", top: "#6193d4" },
  MS: { name: "Mistral", base: "#FA520F", top: "#fc8657" },
  XA: { name: "xAI", base: "#1B1B1F", top: "#5f5f62" },
  NV: { name: "NVIDIA", base: "#74B71B", top: "#9ecd5f" },
  QW: { name: "Alibaba Qwen", base: "#615CED", top: "#948fef" },
  MO: { name: "Moonshot AI", base: "#0FA3B1", top: "#5cc4ce" },
  ZP: { name: "Zhipu AI", base: "#2E7D32", top: "#6fae72" },
  CO: { name: "Cohere", base: "#39594D", top: "#7a9086" },
  A2: { name: "AI21 Labs", base: "#B03A48", top: "#cc7f88" },
  MI: { name: "Microsoft", base: "#0078D4", top: "#58a8e6" },
  AZ: { name: "Amazon", base: "#4B3F72", top: "#837aa0" },
  RK: { name: "Reka AI", base: "#C2185B", top: "#d85f8d" },
  BF: { name: "Black Forest Labs", base: "#14624B", top: "#4e9584" },
  ST: { name: "Stability AI", base: "#6D28D9", top: "#9b73e6" },
  MJ: { name: "Midjourney", base: "#2E3A8C", top: "#6f79ba" },
  ID: { name: "Ideogram", base: "#E03131", top: "#ea7373" },
  RC: { name: "Recraft", base: "#0EA5E9", top: "#61c5f2" },
  LU: { name: "Luma AI", base: "#64748B", top: "#97a1b0" },
  RW: { name: "Runway", base: "#454B66", top: "#7d8199" },
  KL: { name: "Kling", base: "#0B7285", top: "#4fa3b4" },
  PK: { name: "Pika", base: "#9C36B5", top: "#bd78cd" },
  MM: { name: "MiniMax", base: "#1C7ED6", top: "#63aae5" },
  EL: { name: "ElevenLabs", base: "#D6336C", top: "#e57a9d" },
  DG: { name: "Deepgram", base: "#12B886", top: "#5ecfab" },
  AA: { name: "AssemblyAI", base: "#4C6EF5", top: "#869cf8" },
  CT: { name: "Cartesia", base: "#AE3EC9", top: "#c87ddb" },
  SU: { name: "Suno", base: "#862E9C", top: "#ab72bd" },
  UD: { name: "Udio", base: "#5F3DC4", top: "#9279d9" },
};

export const MARKS = {
  OA: {
    evenOdd: true,
    d: ["M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"]
  },
  AN: {
    evenOdd: true,
    d: ["M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"]
  },
  GG: {
    evenOdd: true,
    d: ["M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"]
  },
  DS: {
    evenOdd: true,
    d: ["M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z"]
  }
};

export function BrandTile({ code, size = 34, lifted = false, round = false, className = "" }) {
  const brand = BRAND[code] || BRAND.OA;
  const mark = MARKS[code];
  const radius = round ? size / 2 : Math.round(size * 0.28);

  return (
    <Box
      component="span"
      className={className}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: `${radius}px`,
        background: `linear-gradient(157deg, ${brand.top} 0%, ${brand.base} 62%, ${brand.base} 100%)`,
        boxShadow: lifted
          ? `0 10px 22px -6px ${brand.base}88, 0 2px 4px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.5)`
          : `0 4px 10px -4px ${brand.base}55, 0 1px 2px rgba(0,0,0,.12), inset 0 1px 0 rgba(255,255,255,.4)`,
        transform: lifted ? 'translateY(-2px) scale(1.06)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
      title={brand.name}
      aria-hidden="true"
    >
      {mark ? (
        <svg
          viewBox="0 0 24 24"
          width={size * 0.62}
          height={size * 0.62}
          fill="none"
          style={{ display: 'block' }}
        >
          {mark.d.map((path, idx) => (
            <path
              key={idx}
              d={path}
              fill="#FFFFFF"
              fillRule={mark.evenOdd ? 'evenodd' : 'nonzero'}
              clipRule={mark.evenOdd ? 'evenodd' : undefined}
            />
          ))}
        </svg>
      ) : (
        <Typography component="span" sx={{ color: '#fff', fontWeight: 800, fontSize: size * 0.4 }}>
          {code}
        </Typography>
      )}
      <Box
        component="span"
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          borderRadius: `${radius}px`,
          background: 'linear-gradient(180deg, rgba(255,255,255,.34) 0%, rgba(255,255,255,0) 48%)',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.18)'
        }}
      />
    </Box>
  );
}

export function ProviderTile({ code, size = 34 }) {
  return <BrandTile code={code} size={size} />;
}

export function FormatTile({ kind, size = 22 }) {
  const { isDark } = useThemeMode();
  
  const icons = {
    text: 'T',
    image: 'IMG',
    video: 'VID',
    audio: 'AUD',
    music: 'MUS'
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: isDark ? 'var(--bg-glass)' : 'var(--bg-pill)',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-secondary)',
        fontSize: size * 0.4,
        fontWeight: 600,
      }}
    >
      {icons[kind] || '?'}
    </Box>
  );
}
