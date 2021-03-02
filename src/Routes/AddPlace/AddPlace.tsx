import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";
import styled from "../../typed-components";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_PLACE, GET_PLACES } from "../../commonQuery";
import { addPlace, addPlaceVariables } from "../../__generated-types__";
import { toast } from "react-toastify";

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
  const history = useHistory();
  const [inputState, setInputState] = useState({
    address: "",
    name: "",
    lat: 0,
    lng: 0,
  });
  const { address, name, lat, lng } = inputState;
  const [placeAdd, { loading }] = useMutation<addPlace, addPlaceVariables>(
    ADD_PLACE,
    {
      onCompleted: (data) => {
        const { AddPlace } = data;
        if (AddPlace.ok) {
          toast.success("장소 추가됨");
          setTimeout(() => {
            history.push("/places");
          }, 1000);
        } else {
          toast.error(AddPlace.error);
        }
      },
      refetchQueries: [{ query: GET_PLACES }],
    }
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    placeAdd({
      variables: {
        address: address,
        name: name,
        lat: lat,
        lng: lng,
        isFav: false,
      },
    });
  };

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
          {lat !== 0 && lng !== 0 && (
            <Button
              onClick={null}
              value={loading ? "Adding place" : "Add Place"}
            />
          )}
        </form>
      </Container>
    </React.Fragment>
  );
}

export default AddPlace;
