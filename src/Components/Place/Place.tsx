import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_PLACE, GET_PLACES } from "../../commonQuery";
import styled from "../../typed-components";
import { editPlace, editPlaceVariables } from "../../__generated-types__";

const Place = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
  & i {
    font-size: 12px;
  }
`;

const Container = styled.div`
  margin-left: 10px;
`;

const Name = styled.span`
  display: block;
`;

const Icon = styled.span`
  cursor: pointer;
`;

const Address = styled.span`
  color: ${(props) => props.theme.greyColor};
  font-size: 14px;
`;

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

function PlaceModule(props: IProps) {
  const {fav, name, address, id} = props;
  console.log("isFav", fav);
  console.log("id", id);
  const [favControl] = useMutation<editPlace, editPlaceVariables>(
    EDIT_PLACE, {
    refetchQueries: [{ query: GET_PLACES }],
  });

  const handleStarPress = (e: React.MouseEvent<HTMLElement>) => {
    favControl({
      variables: {
        isFav: false,
        placeId: id,
      },
    });
  };

  return (
    <Place>
      <Icon onClick={handleStarPress}>{fav ? "★" : "✩"}</Icon>
      <Container>
        <Name>{name}</Name>
        <Address>{address}</Address>
      </Container>
    </Place>
  );
}

export default PlaceModule;
