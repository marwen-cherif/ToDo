import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { ButtonTypes } from "ui";
import { Input, InputTypes } from "ui/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { Card, CardContent, FormControl, FormHelperText } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { $Container, $Title } from "./login.styles";

interface LoginType {
  email: string;
  password: string;
}

const LoginPage = () => {
  const formContext = useForm<LoginType>({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = formContext;

  const { logIn } = useAuth();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await logIn(data.email, data.password);
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  });

  return (
    <$Container>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} sm={10} smOffset={2}>
          <Card>
            <CardContent>
              <$Title>Log In</$Title>
              <FormProvider {...formContext}>
                <form onSubmit={onSubmit} noValidate>
                  <Grid2 container spacing={2}>
                    <Grid2 xs={12}>
                      <FormControl fullWidth>
                        <Input
                          type={InputTypes.EMAIL}
                          {...register("email")}
                          placeholder="Email"
                          autoFocus
                          fullWidth
                          required
                        />
                        {errors.email && (
                          <FormHelperText error>
                            {errors.email.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid2>
                    <Grid2 xs={12}>
                      <FormControl fullWidth>
                        <Input
                          type={InputTypes.PASSWORD}
                          {...register("password")}
                          placeholder="Password"
                          fullWidth
                          required
                        />
                        {errors.password && (
                          <FormHelperText error>
                            {errors.password.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid2>
                    <Grid2 xs={12}>
                      <LoadingButton
                        fullWidth
                        type={ButtonTypes.SUBMIT}
                        loading={isSubmitSuccessful}
                        variant="contained"
                      >
                        Login
                      </LoadingButton>
                    </Grid2>
                  </Grid2>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </$Container>
  );
};

export default LoginPage;
