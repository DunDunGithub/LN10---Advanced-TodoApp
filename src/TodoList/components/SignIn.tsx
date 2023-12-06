import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    CssBaseline,
    CircularProgress,
    Backdrop,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

interface SignInFormData {
    username: string;
    password: string;
}

let count = 0;

const SignIn: React.FC = () => {
    // const navigate = useNavigate();

    const { register, handleSubmit } = useForm<SignInFormData>();

    const { isAuthenticated, login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
        try {
            setLoading(true);

            const response = await axios.post('http://localhost:6869/login', {
                "username": data.username,
                "password": data.password.toString(),
            });

            const receivedToken = response.data.accessToken;

            setTimeout(() => {
                setLoading(false);
                login(receivedToken);
                navigate('/todo');
            }, 1000);

        } catch (error) {
            setLoading(false);
            alert(`Authentication failed: ${error}`);
        }
        
    };

    useEffect(() => {
        // Kiểm tra xem có token trong localStorage không
        if (isAuthenticated) {
            // Nếu có, chuyển hướng đến trang todo hoặc trang chính của ứng dụng
            navigate('/todo');
        }
    }, [isAuthenticated, navigate]);

    console.log(count++, loading);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {loading ? (<div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    margin: '-50%'
                }}>
                    <CircularProgress />
                </div>) :
                    (<form onSubmit={handleSubmit(onSubmit)} noValidate={false}>
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            id="username"
                            label="Username"
                            autoComplete="username"
                            autoFocus
                            {...register('username')}

                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            required
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password')}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </form>)}
            </Box>
        </Container>
    );
};

export default SignIn;
