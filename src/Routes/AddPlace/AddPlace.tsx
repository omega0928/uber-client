import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";
import styled from "../../typed-components";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

function AddPlace() {
  const [inputState, setInputState] = useState({
    address: "",
    name: "",
  })
  const { address, name } = inputState

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInputState({
      ...inputState,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  }



  return (
    <React.Fragment>
      <Header title={"Add Place"} backTo={"/"} />
      <Container>
        <form onSubmit={handleSubmit}>
          <ExtendedInput
            placeholder={"Name"}
            type={"text"}
            onChange={onInputChange}
            value={name}
            name={"name"}
          />
          <ExtendedInput
            placeholder={"Address"}
            type={"text"}
            onChange={onInputChange}
            value={address}
            name={"address"}
          />
          <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
          <Button
            onClick={null}
            value={ "Adding place"  }
          />
        </form>
      </Container>
    </React.Fragment>
  );
}

export default AddPlace;
