import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { PHONE_SIGN_IN } from "../../commonQuery";
import BackArrow from "../../Components/BackArrow/BackArrow";
import Input from "../../Components/Input/Input";
import { useHistory } from "react-router-dom";
import countries from "../../countries";
import styled from "../../typed-components";
import {
  startPhoneVerification,
  startPhoneVerificationVariables,
} from "../../__generated-types__";

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

const BackArrowExtended = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 40px;
`;

const CountrySelect = styled.select`
  font-size: 20px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
`;

const CountryOption = styled.option``;

const Form = styled.form``;

const Button = styled.button`
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
`;

function PhoneLogin() {
  const history = useHistory();
  const [inputState, setInputState] = useState({
    countryCode: "+82",
    phoneNumber: "12345",
  });
  const { countryCode, phoneNumber } = inputState;
  const [phoneSignIn, { loading }] = useMutation<
    startPhoneVerification,
    startPhoneVerificationVariables
  >(PHONE_SIGN_IN, {
    onCompleted: (data) => {
      const { StartPhoneVerification } = data;
      const phone = `${countryCode}${phoneNumber}`;
      if (StartPhoneVerification.ok) {
        toast.success("SMS 발송중..");
        setTimeout(() => {
          history.push({
            pathname: "/verify-phone",
            state: {
              phone,
            },
          });
        }, 2000);
      } else {
        toast.error(StartPhoneVerification.error);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)  => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = `${countryCode}${phoneNumber}`;
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
    if (isValid) {
      phoneSignIn({
        variables: { phoneNumber: `${countryCode}${phoneNumber}` },
      });
    } else {
      toast.error("유효한 전화번호를 입력해주세요.");
    }
  };

  return (
    <Container>
      <BackArrowExtended backTo={"/"} />
      <Title>Enter your mobile number</Title>
      <CountrySelect
        value={inputState.countryCode}
        name={"countryCode"}
        onChange={handleInputChange}
      >
        {countries.map((country, index) => (
          <CountryOption key={index} value={country.dial_code}>
            {country.flag} {country.name} ({country.dial_code})
          </CountryOption>
        ))}
      </CountrySelect>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder={"053 690 2129"}
          value={inputState.phoneNumber}
          onChange={handleInputChange}
          name={"phoneNumber"}
        />
        <Button>
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={"white"}
            >
              <path d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={"white"}
            >
              <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
            </svg>
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default PhoneLogin;
