export default function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.6 }) {
  const sw = strokeWidth;
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: sw,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  };

  const paths = {
    leaf: <><path d="M5 21c0-9 7-16 16-16 0 9-7 16-16 16z" /><path d="M5 21l11-11" /></>,
    pill: <><path d="M10.5 4.5l-6 6a4.95 4.95 0 107 7l6-6a4.95 4.95 0 10-7-7z" /><path d="M8 7l8 8" /></>,
    bottle: <><rect x="9" y="3" width="6" height="3" rx="1" /><path d="M9 6h6l1 4v9a2 2 0 01-2 2h-4a2 2 0 01-2-2v-9z" /><path d="M10 13h4" /></>,
    apple: <><path d="M12 7c-2-3-6-3-7 0-1.5 4 1 11 4 11 1 0 1.5-.5 3-.5s2 .5 3 .5c3 0 5.5-7 4-11-1-3-5-3-7 0z" /><path d="M12 7c0-1.5 1-2.5 2.5-3" /></>,
    barcode: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9v6M10 9v6M13 9v6M16 9v6" /></>,
    camera: <><path d="M3 9a2 2 0 012-2h2l1.5-2h7L17 7h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><circle cx="12" cy="13" r="3.5" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="M20.5 20.5L16 16" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    chevR: <path d="M9 6l6 6-6 6" />,
    chevL: <path d="M15 6l-6 6 6 6" />,
    chevDown: <path d="M6 9l6 6 6-6" />,
    check: <path d="M5 13l4 4L19 7" />,
    x: <><path d="M6 6l12 12M18 6L6 18" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 8v.5M12 11v5" /></>,
    warn: <><path d="M12 3l10 17H2L12 3z" /><path d="M12 10v4M12 17v.5" /></>,
    shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
    shieldCheck: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" /></>,
    chat: <path d="M21 12a8 8 0 01-12 7l-5 1 1-4a8 8 0 1116-4z" />,
    send: <path d="M5 12l14-7-5 14-3-6-6-1z" />,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></>,
    sparkle: <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" /><path d="M19 16l.7 2L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-1z" /></>,
    book: <><path d="M4 4h6a3 3 0 013 3v13a2 2 0 00-2-2H4z" /><path d="M20 4h-6a3 3 0 00-3 3v13a2 2 0 012-2h7z" /></>,
    home: <path d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    bell: <><path d="M6 9a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21h4" /></>,
    arrow: <><path d="M5 12h14M13 5l7 7-7 7" /></>,
    doc: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6" /></>,
    star: <path d="M12 3l2.7 6 6.3.5-4.8 4.2 1.5 6.3L12 17l-5.7 3 1.5-6.3L3 9.5 9.3 9z" />,
    heart: <path d="M12 21s-8-5-8-11a5 5 0 019-3 5 5 0 019 3c0 6-8 11-8 11h-2z" />,
    history: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 00-.1-1.3l2-1.5-2-3.4-2.3.9a7 7 0 00-2.3-1.3L14 3h-4l-.3 2.4a7 7 0 00-2.3 1.3L5.1 5.8 3.1 9.2l2 1.5A7 7 0 005 12c0 .5 0 .9.1 1.3l-2 1.5 2 3.4 2.3-.9a7 7 0 002.3 1.3L10 21h4l.3-2.4a7 7 0 002.3-1.3l2.3.9 2-3.4-2-1.5c.1-.4.1-.8.1-1.3z" /></>,
    flame: <path d="M12 21c4 0 7-3 7-7 0-3-2-5-3-7-1 2-3 3-3 5-2-1-3-3-3-5-1 1-4 4-4 8 0 4 3 6 6 6z" />,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></>,
    trash: <><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2" /></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
  };

  return <svg {...common}>{paths[name]}</svg>;
}
