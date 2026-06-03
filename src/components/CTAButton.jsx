import T from '../tokens.js';

export default function CTAButton({
  children, onClick, variant = 'primary', icon,
  full = true, disabled = false, size = 'lg',
}) {
  const v = {
    primary: { bg: T.primary, fg: '#fff', border: 'none' },
    soft: { bg: T.primarySoft, fg: T.primaryInk, border: 'none' },
    ghost: { bg: '#fff', fg: T.ink, border: `1px solid ${T.borderStrong}` },
    dark: { bg: T.ink, fg: '#fff', border: 'none' },
    danger: { bg: T.redBg, fg: T.redInk, border: `1px solid ${T.redLine}` },
  }[variant];
  const h = size === 'lg' ? 56 : size === 'md' ? 48 : 40;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: full ? '100%' : 'auto',
        height: h, borderRadius: 999,
        background: v.bg, color: v.fg,
        border: v.border,
        display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', gap: 8,
        fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit', padding: '0 22px',
      }}
    >
      {children}
      {icon}
    </button>
  );
}
