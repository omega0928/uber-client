import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { isLoggedInVar } from "../../apollo";
import { VERIFY_PHONE } from "../../commonQuery";
import Button from "../../Common/Button/Button";
import Header from "../../Common/Header/Header";
import Input from "../../Common/Input/Input";
import styled from "../../typed-components";
import { verifyphone, verifyphoneVariables } from "../../__generated-types__";

const Container = styled.div``;

const Form = styled.form`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

function VerifyPhone() {
  const isLoggedIn = isLoggedInVar();
  const location: any = useLocation();
  const history = useHistory();
  const [inputState, setInputState] = useState({
    verificationKey: "",
    phoneNumber: location.state.phone,
  });
  const { verificationKey, phoneNumber } = inputState;

  console.log("verificationKey", inputState.verificationKey);

  const [verifyPhone, { loading }] = useMutation<
    verifyphone,
    verifyphoneVariables
  >(VERIFY_PHONE, {
    onCompleted: (data) => {
      const { CompletePhoneVerification } = data;
      console.log(CompletePhoneVerification)
      if (CompletePhoneVerification.ok) {
        if (CompletePhoneVerification.token) {
          localStorage.setItem("jwt", CompletePhoneVerification.token);
        }
        toast.success("인증되었습니다. 지금 로그인합니다.");
      } else {
        toast.error(CompletePhoneVerification.error);
      }
    },
  });
  console.log(location);
  if (!location.state) {
    history.push("/");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("test");
    e.preventDefault();
    verifyPhone({
      variables: { key: verificationKey, phoneNumber: phoneNumber },
    });
  };

  return (
    <Container>
      <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
      <Form onSubmit={handleSubmit}>
        <ExtendedInput
          value={verificationKey}
          placeholder={"Enter Verification Code"}
          onChange={handleInputChange}
          name={"verificationKey"}
        />
        <Button
          // type={"button"}
          disabled={loading}
          value={loading ? "Verifying" : "Submit"}
          onClick={null}
        >
          asdfsdf
          </Button>
      </Form>
    </Container>
  );
}

export default VerifyPhone;
