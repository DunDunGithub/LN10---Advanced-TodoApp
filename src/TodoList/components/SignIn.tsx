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
            // Make a request to your server for authentication
            const response = await axios.post('http://localhost:6869/login', {
                "username": data.username,
                "password": data.password.toString(),
            });

            // Assuming the server returns a token in the response data
            const receivedToken = response.data.accessToken;

            // Set the token in the state or wherever you want to manage it


            // Redirect to the home page after successful login
            // setTimeout(() => {
            //     setLoading(false);
            //     login(receivedToken);
            //     navigate('/todo');
            // }, 3000);
            login(receivedToken);
            navigate('/todo');
        } catch (error) {
            // Handle authentication error (e.g., display an error message)
            console.error('Authentication failed', error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Kiểm tra xem có token trong localStorage không
        if (isAuthenticated) {
            // Nếu có, chuyển hướng đến trang todo hoặc trang chính của ứng dụng
            navigate('/todo');
        }
    }, [isAuthenticated, navigate]);

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
                {loading ? (<Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>) :
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
