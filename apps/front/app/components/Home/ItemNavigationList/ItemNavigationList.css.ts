import { style } from '@vanilla-extract/css';

export const itemNavigationLinkStyle = style({
  display: 'flex',
  alignItems: 'center',
  width: '75%',
  cursor: 'pointer',
  textDecoration: 'none',
  padding: 'var(--space-1) var(--space-2)',
  borderRadius: '999px',
  transition: 'background-color 50ms linear',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  userSelect: 'none',
  minHeight: 'var(--space-6)',
  color: 'var(--gray-12)',
  fontSize: 'var(--font-size-2)',
  lineHeight: 'var(--line-height-2)',
  letterSpacing: 'var(--letter-spacing-2)',
  ':hover': {
    backgroundColor: 'var(--accent-a5)',
  },
});
