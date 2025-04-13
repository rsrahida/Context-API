import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { FormContext } from "../../context/FormContext";
import { Link } from "react-router-dom";
import loqo from "../../assets/images/loqo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { login, loading, error } = useContext(FormContext);

  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email daxil edilməlidir.";
    if (!password) errors.password = "Şifrə daxil edilməlidir.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await login({ email, password });
      if (result.success) {
        setSuccessMessage("Uğurla daxil oldunuz! 🎉");
        setTimeout(() => {}, 1500);
      }
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.loginText}>
          <img src={loqo} alt="Logo" />
          <h1>Hesabınıza daxil olun</h1>
          <p>
            Korpem.az ailəsinə qoşulun və unikal endirimlər, yeni kolleksiyalar
            və fərdi təkliflərdən faydalanın.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {successMessage && (
            <div className={styles.success}>{successMessage}</div>
          )}
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="E-poçt adresinizi daxil edin"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Şifrə</label>
            <input
              type="password"
              value={password}
              placeholder="Şifrənizi daxil edin"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            {loading ? "Giriş edilir..." : "Giriş et"}
          </button>
        </form>

        <p className={styles.endText}>
          Hesabınız yoxdur?{" "}
          <Link to="/" className={styles.link}>
            Qeydiyyat
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
