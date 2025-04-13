import React, { useContext, useEffect, useState } from "react";
import styles from "./Registration.module.css";
import { FormContext } from "../../context/FormContext";
import { Link, useNavigate } from "react-router-dom";
import loqo from "../../assets/images/loqo.png";

const Registration = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { registration, loading, error } = useContext(FormContext);

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Ad daxil edilməlidir.";
    if (!surname) errors.surname = "Soyad daxil edilməlidir.";
    if (!gender) errors.gender = "Cinsiyyət seçilməlidir.";
    if (!phone || !/^\d{10}$/.test(phone))
      errors.phone = "Mobil nömrə düzgün deyil!";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errors.email = "Düzgün e-poçt adresi daxil edin!";
    if (!password || password.length < 6)
      errors.password = "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";
    if (!termsAccepted) errors.terms = "Şərtləri qəbul etməlisiniz.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = await registration({
        name,
        surname,
        gender,
        phone,
        email,
        password,
      });
      if (result.success) {
        setSuccessMessage("Uğurla qeydiyyatdan keçdiniz! 🎉");
        setTimeout(() => {
          navigate("/login");
          setName("");
          setSurname("");
          setGender("");
          setPhone("");
          setEmail("");
          setPassword("");
          setTermsAccepted(false);
          setErrors({});
          setSuccessMessage("");
        }, 2000);
      }
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationForm}>
        <div className={styles.registrationText}>
          <img src={loqo} alt="Logo" />
          <h1>Yeni hesab yaradın</h1>
          <p>
            Korpem.az ailesinə qoşulun və unikal endirimlər, yeni kolleksiyalar
            və fərdi təkliflərdən faydalanın.
          </p>
        </div>
        <form onSubmit={handlesubmit}>
          {successMessage && <p className={styles.success}>{successMessage}</p>}

          <div className={styles.formGroup}>
            <label>Ad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınızı daxil edin"
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Soyad</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Soyadınızı daxil edin"
            />
            {errors.surname && <p className={styles.error}>{errors.surname}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Cinsiyyət</label>
            <select
              className={styles.select}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Cinsiyyət seçin</option>
              <option value="male">Kişi</option>
              <option value="female">Qadın</option>
            </select>
            {errors.gender && <p className={styles.error}>{errors.gender}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Telefon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefon nömrənizi daxil edin"
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-poçt adresinizi daxil edin"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>Şifrə</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrənizi daxil edin"
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                style={{
                  marginRight: "2px",
                  textAlign: "center",
                  width: "30px",
                  height: "17px",
                }}
              />
              Şərtləri qəbul edirəm
            </label>
            {errors.terms && <p className={styles.error}>{errors.terms}</p>}
          </div>
          <button
            type="submit"
            disabled={loading || !termsAccepted}
            className={styles.button}
          >
            {loading ? "Qeydiyyat gedir..." : "Qeydiyyatdan Keç"}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
        <p className={styles.endText}>
          Artıq hesabınız var?{" "}
          <Link to="/login" className={styles.link}>
            Giriş et
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
