import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { $Container, $Title } from "./signup.styles";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Link,
  Typography,
} from "@mui/material";
import { Input, InputTypes } from "ui/Input/Input";
import LoadingButton from "@mui/lab/LoadingButton";
import { ButtonTypes } from "ui";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface SignupType {
  email: string;
  password: string;
  confirmPassword: string;
}
const SignupPage = () => {
  const formContext = useForm<SignupType>({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
          .test(
            "Verify your password",
            "Verify your password",
            (value: any, context: any) => {
              const { parent } = context;

              return parent.password === value && value;
            }
          )
          .required("Password is required"),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = formContext;

  const { signUp } = useAuth();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp(data.email, data.password);

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
              <$Title>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  Sign Up
                </Typography>
              </$Title>
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
                      <FormControl fullWidth>
                        <Input
                          type={InputTypes.PASSWORD}
                          {...register("confirmPassword")}
                          placeholder="Confirm password"
                          fullWidth
                          required
                        />
                        {errors.confirmPassword && (
                          <FormHelperText error>
                            {errors.confirmPassword.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid2>
                    <Grid2 xs={12}>
                      <Link href="/login">You have an account ?</Link>
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

export default SignupPage;
