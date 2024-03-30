import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import mainpage_logo from '../signin_page/GST_logo.png';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
      password: data.get('password'),
      nickname: data.get('nickname'),
      phoneNumber: data.get('phoneNumber'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="cover-background"></div>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={mainpage_logo} alt="Logo" style={{ width: '100%', marginBottom: '20px' }} />
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <CheckCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="아이디"
              name="아이디"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="패스워드"
              label="패스워드"
              name="패스워드"
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="닉네임"
              label="닉네임"
              name="닉네임"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="핸드폰 번호"
              label="핸드폰 번호"
              name="핸드폰 번호"
            />
            <FormControlLabel
              control={<Checkbox value="agree" color="primary" />}
              label="약관에 동의합니다"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', color: 'white' }}
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" sx={{ color: 'text.secondary' }}>
                  로그인하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
