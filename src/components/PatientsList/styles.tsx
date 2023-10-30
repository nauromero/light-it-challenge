import { List, styled } from '@mui/material';

export const StyledList = styled(List)(({ theme }) => ({
  maxWidth: '100%',
  margin: '0 auto',
  boxShadow: '0 5px 5px rgba(0, 0, 0, 0.1)',
  borderRadius: '5px',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '85%',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '80%',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '70%',
  },
}));

export const Container = styled('div')({
  padding: '4px',
  textAlign: 'center',
});

export const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
});