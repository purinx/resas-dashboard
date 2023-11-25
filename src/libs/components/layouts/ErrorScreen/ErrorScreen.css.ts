import { style } from '@vanilla-extract/css';

export const errorScreen = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#fff',
});

export const oops = style({
  fontSize: '50px',
  marginBottom: '20px',
  textAlign: 'center',
});

export const message = style({
  fontSize: '20px',
  textAlign: 'center',
});
