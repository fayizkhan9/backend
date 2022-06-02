import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(20)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {

  return (
    <>
      <img src='logo.png' alt='not found' style={{ width: '60px', height: '60px', marginLeft: '15%', marginRight: '20px' }} />
      <LogoText>TikTurbo</LogoText>
    </>
  );
}

export default Logo;
