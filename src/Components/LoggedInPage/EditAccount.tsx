import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { UPDATE_PROFILE, USER_PROFILE } from "../../commonQuery";
import Button from "../../Common/Button/Button";
import Header from "../../Common/Header/Header";
import Input from "../../Common/Input/Input";
import styled from "../../typed-components";
import {
  updateProfile,
  updateProfileVariables,
  userProfile,
} from "../../__generated-types__";

const Container = styled.div``;

const Form = styled.form``;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

function EditAccount() {
  const [inputState, setInputState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: "",
  });
  const { email, firstName, lastName, profilePhoto } = inputState;
  const {} = useQuery<userProfile>(USER_PROFILE, {
    onCompleted: (data) => {
      if ("GetMyProfile" in data) {
        const {
          GetMyProfile: { user },
        } = data;
        if (user !== null) {
          const { firstName, lastName, email, profilePhoto } = user;
          setInputState({
            email,
            firstName,
            lastName,
            profilePhoto,
          } as any);
        }
      }
    },
  });
  const [editInfo, { loading }] = useMutation<
    updateProfile,
    updateProfileVariables
  >(UPDATE_PROFILE, {
    refetchQueries: [{ query: USER_PROFILE }],
    onCompleted: (data) => {
      const { UpdateMyProfile } = data;
      if (UpdateMyProfile.ok) {
        toast.success("프로필 업데이트 되었습니다.");
      } else if (UpdateMyProfile.error) {
        toast.error(UpdateMyProfile.error);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editInfo({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        profilePhoto: profilePhoto,
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  return (
    <Container>
      <Header title={"Edit Account"} backTo={"/"} />
      <Form onSubmit={handleSubmit}>
        <ExtendedInput
          onChange={handleInputChange}
          type={"text"}
          value={firstName}
          placeholder={"First name"}
          name={"firstName"}
        />
        <ExtendedInput
          onChange={handleInputChange}
          type={"text"}
          value={lastName}
          placeholder={"Last name"}
          name={"lastName"}
        />
        <ExtendedInput
          onChange={handleInputChange}
          type={"email"}
          value={email}
          placeholder={"Email"}
          name={"email"}
        />
        <Button onClick={null} value={loading ? "Loading" : "Update"} />
      </Form>
    </Container>
  );
}

export default EditAccount;
