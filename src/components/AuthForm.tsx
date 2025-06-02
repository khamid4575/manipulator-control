import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Button, TextField, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';

type LoginForm = {
  username: string;
  password: string;
};

export const AuthForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (data.username === 'admin' && data.password === 'admin') {
      dispatch(setAuth(true));
    } else {
      alert("Неправильный логин или пароль");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Авторизация</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Имя пользователя"
          {...register('username', { required: "Обязательное поле" })}
          error={!!errors.username}
          helperText={errors.username?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Пароль"
          type="password"
          {...register('password', { required: "Обязательное поле" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Войти
        </Button>
      </form>
    </Container>
  );
};