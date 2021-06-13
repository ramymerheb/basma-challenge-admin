import "@shopify/polaris/dist/styles.css";
import {
  TextField,
  Page,
  FormLayout,
  Form,
  Button,
  Card,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import AuthenticationService from "./services/authentication.service";
import { useHistory } from 'react-router-dom'

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {
    if (email === "") {
      setErrors({ ...setErrors, email: "Email is required!" });
      return;
    }

    if (password === "") {
      setErrors({ ...setErrors, password: "Password is required!" });
      return;
    }
    let fd = new FormData()
    fd.append("email", email);
    fd.append("password", password);

    AuthenticationService.signin(fd).then((status) =>{
      if(status){
        history.push('/clients')    

      }
    })
  };

  const handleEmailChange = (value) => {console.log(value);setEmail(value)};
  const handlePasswordChange = (value) => setPassword(value);
  return (
    <Page title="Basma Challenge">
      <Card title="Login">
        <Card.Section>
          <Form>
            <FormLayout>
              <TextField
                value={email}
                onChange={handleEmailChange}
                label="Email"
                type="email"
                requiredIndicator="true"
                error={errors.email}
              />

              <TextField
                value={password}
                onChange={handlePasswordChange}
                label="Password"
                type="password"
                requiredIndicator="true"
                error={errors.password}
              />
              <Button type="button" onClick={handleSubmit}>Login</Button>

            </FormLayout>
          </Form>
        </Card.Section>
      </Card>
    </Page>
  );
}

export default Login;
