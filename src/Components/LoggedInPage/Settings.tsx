import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { GET_PLACES, USER_PROFILE } from "../../commonQuery";
import Header from "../../Common/Header/Header";
import Place from "../../Common/Place/Place";
import styled from "../../typed-components";
import { getPlaces, userProfile } from "../../__generated-types__";

const Container = styled.div`
  padding: 0px 40px;
`;
const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;
const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;
const Keys = styled.div``;
const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;
const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;
const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

function Settings() {
  const {
    data: { GetMyProfile: { user = null } = {} } = {},
    loading: userDataLoading,
  } = useQuery<userProfile>(USER_PROFILE);
  const {
    data: { GetMyPlaces: { places = null } = {} } = {},
    loading: placesLoading,
  } = useQuery<getPlaces>(GET_PLACES);

  const logUserOut = () => {
    localStorage.removeItem("jwt");
  };

  return (
    <React.Fragment>
      <Header title={"Account Settings"} backTo={"/"} />
      <Container>
        <GridLink to={"/edit-account"}>
          {!userDataLoading &&
            user &&
            user.profilePhoto &&
            user.email &&
            user.fullName && (
              <React.Fragment>
                <Image src={user.profilePhoto} />
                <Keys>
                  <Key>{user.fullName}</Key>
                  <Key>{user.email}</Key>
                </Keys>
              </React.Fragment>
            )}
        </GridLink>
        {!placesLoading &&
          places &&
          places.map((place) => (
            <Place
              key={place!.id}
              id={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          ))}
        <SLink to={"/places"}>Go to Places</SLink>
        <FakeLink onClick={logUserOut}>Log Out</FakeLink>
      </Container>
    </React.Fragment>
  );
}

export default Settings;
