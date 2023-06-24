// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from "react";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";

// ** Icons Imports
import Google from "mdi-material-ui/Google";
import Github from "mdi-material-ui/Github";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV1 from "src/views/pages/auth/FooterIllustration";
import { route } from "next/dist/server/router";
import { Stack } from "@mui/material";
import { useSignInMutation } from "src/store/services/UserService";
import { storageToken } from "src/utils/prepareHeaders";
import appRoutes from "src/utils/appRoutes";
import useGlobal from "src/hooks/useGlobal";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LinkStyled = styled("a")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  const [signIn, { isLoading: isLoadingSignIn }] = useSignInMutation();

  const { handleChangeLoading, handleChangeLoginError, loginError } =
    useGlobal();

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // gpt sugestion
  const handleSubmit = async (e: any) => {
    e?.preventDefault();
    // Validar campo de correo electrónico
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      console.log("El correo electrónico es inválido");
      handleChangeLoginError(true);
      return;
    }

    // Validar campo de contraseña
    if (!values.password) {
      console.log("La contraseña no puede estar vacía");
      handleChangeLoginError(true);
      return;
    }
    handleChangeLoginError(false);
    handleChangeLoading(true);
    const response: any = await signIn({
      email: values.email,
      password: values.password,
    });
    if (response?.data?.result) {
      storageToken(response?.data?.result);
      window.location.pathname = appRoutes.index();
      // router.push(appRoutes.index());
      // response?.data?.result
    } else {
      handleChangeLoginError(true);
    }
    handleChangeLoading(false);
    return;
  };

  return (
    <Box className="content-center flex flex-col items-center gap-4 justify-end">
      <Card sx={{ zIndex: 1 }}>
        <CardContent
          sx={{ padding: (theme) => `${theme.spacing(12, 9, 7)} !important` }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Bienvenido a Smilify
            </Typography>
            <Typography variant="body2">
              Ingresa tus credenciales para iniciar sesion
            </Typography>
          </Box>
          {loginError ? (
            <Alert sx={{ marginBottom: 4 }} severity="error">
              Las credenciales son incorrectas
            </Alert>
          ) : null}
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
              value={values.email}
              onChange={handleChange("email")}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {/* <FormControlLabel control={<Checkbox />} label='Remember Me' /> */}
              {/* <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>Forgot Password?</LinkStyled>
              </Link> */}
            </Box>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: 7 }}
            >
              Iniciar Sesion
            </Button>
          </form>
        </CardContent>
      </Card>
      <Link passHref href={appRoutes.register()}>
        <LinkStyled
          className="w-[400px] flex flex-row items-center justify-end"
        >
          Agenda
        </LinkStyled>
      </Link>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
