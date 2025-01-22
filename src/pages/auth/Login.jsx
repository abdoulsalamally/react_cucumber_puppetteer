import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  InputLabel,
  FilledInput,
  CircularProgress,
} from "@mui/material";

import ButtonConnecter from "../../components/utility/ButtonConnecter";
import { useDispatch, useSelector } from "react-redux";
import { setUserAction } from "../../store/actions/userActions";



// Schéma de validation avec Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Email invalide").required("Email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Mot de passe est requis"),
});

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toastTopCenter = useRef(null);

  // Vérifiez si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/"); // Redirige si déjà connecté
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {

      if (values.email === "abdoul@gmail.com" && values.password === "123456") {
    
        dispatch(setUserAction("fff"));
        navigate("/");
      } else {
        setErrors({ EMAIL: "Identifiants incorrects" });
        toastTopCenter.current.show({
          severity: "error",
          summary: "Erreur",
          detail: "Identifiants incorrects",
          life: 3000,
        });
      }
   
  };

  return (
    <div className="min-h-screen shadow-default">
      <div className="grid grid-cols-1 lg:grid-cols-6 h-screen">
        {/* Left section (image background) */}
        <div
          className="md:col-span-6 lg:col-span-4 bg-cover bg-center"
          style={{
            backgroundImage: `url(${orangeBg})`,
          }}
        >
          <div className="relative flex w-full h-screen justify-center items-center">
            <div className="relative xl:right-[10%] flex flex-col lg:items-start justify-between py-0 w-full lg:w-[500px] h-[75%] px-5 md:px-0">
              <div className="pt-3">
                <p className="m-0 p-0 text-lg md:text-xl leading-1">
                  Système unifié de souveraineté <br /> agro-alimentaire et
                  nutritionnelle
                </p>
                <p className="pt-5 text-white md:text-[3rem] font-bold leading-tight md:leading-10 2xl:text-[4rem] 2xl:leading-[60px]">
                  SUSAN
                </p>
              </div>
              <div className="flex h-[70%] items-end">
                <img src={sgs} alt="Logo" className="w-40 md:w-60 h-auto" />
              </div>
            </div>

            {/* Form Container */}
            <div className="rounded-md py-5 px-5 lg:px-10 bg-white shadow-lg w-full md:w-[80%] lg:w-[60%] max-w-lg h-auto lg:absolute lg:right-[-20%] xl:right-[-40%] 2xl:h-[60%]">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="pt-5">
                      <h1 className="text-black text-center font-extrabold text-xl">
                        Se connecter
                      </h1>
                      <p className="text-gray-500 text-sm text-center pt-1">
                        {t("identifiant_continuer")}
                      </p>
                    </div>

                    <div className="pt-7">
                      <FormControl variant="filled" fullWidth>
                        <InputLabel>Email</InputLabel>
                        <Field
                          name="email"
                          as={FilledInput}
                          placeholder="Entrer votre email"
                          disableUnderline
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </FormControl>
                    </div>

                    <div className="pt-10">
                      <FormControl variant="filled" fullWidth>
                        <InputLabel>Password</InputLabel>
                        <Field
                          name="password"
                          type="password"
                          as={FilledInput}
                          placeholder="••••••"
                          disableUnderline
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </FormControl>
                    </div>

                    <div className="flex justify-end py-3 items-center">
                      <p className="text-sm font-medium text-black">
                        Mot de passe oublié ?
                      </p>
                    </div>

                    <div className="w-full">
                      {isSubmitting ? (
                        <div className="flex justify-center">
                          <CircularProgress
                            size={24}
                          />
                        </div>
                      ) : (
                        <ButtonConnecter
                          title="Se connecter"
                          disabled={isSubmitting}
                          type="submit"
                        />
                      )}
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="mt-10 2xl:mt-[30px]">
                <hr />
              </div>

              <div className="text-center pt-5">
                <p className="font-medium text-black text-[0.8rem] pb-[15px]">
                 Compte
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="hidden lg:block md:col-span-2 bg-[#f5f5f5] h-screen"></div>
      </div>

      <Toast ref={toastTopCenter} position="top-center" className="toast-notification" />
    </div>
  );
};

export default Login;
