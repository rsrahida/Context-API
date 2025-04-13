import { useState, createContext } from "react";

const REGISTER_URL = "https://ekorpem-api.webluna.org/api/v1/register";
const LOGIN_URL = "https://ekorpem-api.webluna.org/api/v1/login";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //! Registration
  const registration = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Daxil etdiyiniz E-poçt artıq mövcuddur!!!"
        );
      }

      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      setError(error.message || "Qeydiyyatınız uğursuzdur!");
    } finally {
      setLoading(false);
    }
  };

  //! Login
  const login = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Email və ya şifrə yanlışdır!");
      }

      setUser(data.user);
      setToken(data.token);
      setError(null);
    } catch (error) {
      setError(error.message || "Daxil olmaq mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider
      value={{ user, token, loading, error, registration, login }}
    >
      {children}
    </FormContext.Provider>
  );
};
