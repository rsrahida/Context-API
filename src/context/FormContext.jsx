import { useState } from "react";
import { createContext } from "react";

const REGISTER_URL = "https://ekorpem-api.webluna.org/api/v1/register";
const LOGIN_URL = "https://ekorpem-api.webluna.org/api/v1/login";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //!Registration
  const registration = async (usersData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usersData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Daxil etdiyiniz E-poçt artıq mövcuddur!!!"
        );
      }
      setUser(data);
      return { success: true };
    } catch (error) {
      setError(error.message || "Qeydiyyatınız uğursuzdur!");
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  //!Login
  const login = async (usersData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usersData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Email və ya şifrə yanlışdır!");
      }
      setToken(data.token);
      setUser(data);
      return { success: true };
    } catch (error) {
      setError(error.message || "Daxil olmaq mümkün olmadı");
      return { success: false, message: error.message };
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
