import { Typography } from '@mui/material';
function LoginPageHeader() {
  return (
    // < align="center">\
    <>
      <Typography align="center" variant="h5" sx={{ color: '#fff' }}>
        Welcome
      </Typography>
      <Typography align="center" sx={{ color: '#b9bbbe' }}>
        We are happy to see you with us!
      </Typography>
    </>
  );
}

export default LoginPageHeader;
