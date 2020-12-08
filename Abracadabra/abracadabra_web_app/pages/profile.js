import { Nav } from "react-bootstrap";
import BlankNavBar from "src/components/BlankNavBar.js";
import EditUser from "../src/components/EditUser.js";

function profile() {
  return (
    <>
      <BlankNavBar />
      <EditUser />
    </>
  );
}

export default profile;
