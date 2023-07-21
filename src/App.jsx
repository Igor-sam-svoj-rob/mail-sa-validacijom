import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

function App() {
  const initialValues = { user: "", email: "", pass: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const form = useRef();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormReset = () => {
    setFormValues(initialValues);
    setFormErrors({});
    setIsSubmit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (Object.keys(validate(formValues)).length === 0) {
      emailjs
        .sendForm(
          "service_7tcew59",
          "template_o4e5hhh",
          form.current,
          "WEmu56w5cCsRuO63q"
        )
        .then(
          (result) => {
            handleFormReset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const validate = (v) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!v.user) {
      errors.user = "Korisničko ime nije upisano";
    }
    if (!v.email) {
      errors.email = "E-mail nije pravilno upisan";
    } else if (!regex.test(v.email)) {
      errors.email = "Niste unijeli ispravnu email adresu";
    }
    if (!v.pass) {
      errors.pass = "Lozinka nije pravilno upisana";
    } else if (v.pass.length < 6) {
      errors.pass = "Lozinka ne smije imati manje od 6 znakova";
    }
    return errors;
  };

  return (
    <div className="container">
      <form ref={form} onSubmit={handleSubmit}>
        <h1>Login forma</h1>
        <hr />
        <div className="form">
          <div className="field">
            <label>
              <input
                type="text"
                name="user"
                placeholder="Username"
                value={formValues.user}
                onChange={handleChange}
              />
            </label>
          </div>
          <p>{formErrors.user}</p>
          <div className="field">
            <label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>
              <input
                type="password"
                name="pass"
                placeholder="Password"
                value={formValues.pass}
                onChange={handleChange}
              />
            </label>
          </div>
          <p>{formErrors.pass}</p>
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
