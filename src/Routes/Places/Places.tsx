import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_PLACES } from "../../commonQuery";
import Header from "../../Components/Header/Header";
import PlaceModule from "../../Components/Place/Place";
import styled from "../../typed-components";
import { getPlaces } from "../../__generated-types__";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

function Places() {
  const {
    data: { GetMyPlaces: { places = null } = {} } = {},
    loading,
  } = useQuery<getPlaces>(GET_PLACES);

  return (
    <React.Fragment>
      <Header title={"Places"} backTo={"/"} />
      <Container>
        {!loading && places && places.length === 0 && "You have no places"}
        {!loading &&
          places &&
          places.map((place) => (
            <PlaceModule
              key={place!.id}
              id={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          ))}
        <SLink to={"/add-place"}>Place add some places!</SLink>
      </Container>
    </React.Fragment>
  );
}

export default Places;
