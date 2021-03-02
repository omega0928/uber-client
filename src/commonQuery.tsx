import { gql } from "@apollo/client";

export const PHONE_SIGN_IN = gql`
  mutation startPhoneVerification($phoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;

export const VERIFY_PHONE = gql`
  mutation verifyphone($key: String!, $phoneNumber: String!) {
    CompletePhoneVerification(key: $key, phoneNumber: $phoneNumber) {
      ok
      error
      token
    }
  }
`;

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstName: String!
    $lastName: String!
    $email: String
    $fbId: String!
  ) {
    FacebookConnect(
      firstName: $firstName
      lastName: $lastName
      email: $email
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        profilePhoto
        firstName
        lastName
        email
        fullName
        isDriving
      }
    }
  }
`;

export const TOGGLE_DRIVING = gql`
  mutation toggleDriving {
    ToggleDrivingMode {
      ok
      error
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $profilePhoto: String!
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      email: $email
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;

export const ADD_PLACE = gql`
  mutation addPlace(
    $name: String!
    $lat: Float!
    $lng: Float!
    $address: String!
    $isFav: Boolean!
  ) {
    AddPlace(
      name: $name
      lat: $lat
      lng: $lng
      address: $address
      isFav: $isFav
    ) {
      ok
      error
    }
  }
`;

export const EDIT_PLACE = gql`
  mutation editPlace($placeId: Int!, $isFav: Boolean) {
    EditPlace(placeId: $placeId, isFav: $isFav) {
      ok
      error
    }
  }
`;