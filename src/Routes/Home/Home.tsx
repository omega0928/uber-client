import React, { useState } from "react";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Components/Menu/Menu"
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../commonQuery";

const Container = styled.div``;

function Home() {
  const [sideMenu, setSideMenu] = useState(false);
  const { loading } = useQuery(USER_PROFILE)

  const toggleMenu = () => {
    setSideMenu(!sideMenu);
  };

  return (
    <Container>
      <Sidebar
        sidebar={<Menu />}
        open={sideMenu}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: { background: "white", width: "80%", zIndex: "10" },
        }}
      >
        {!loading && <button onClick={toggleMenu}>Open sidebar</button>}
      </Sidebar>
    </Container>
  );
}

export default Home;
