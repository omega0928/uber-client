import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Place from "../../Components/Place/Place";
import styled from "../../typed-components";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

function Places() {
  return (
    <React.Fragment>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      
          <SLink to={"/add-place"}>Place add some places!</SLink>
        
      
          
        
    </Container>
  </React.Fragment>
  )
}

export default Places;