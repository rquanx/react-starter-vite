import React from "react";
import "./index.css";
import { sp } from "@pnp/sp";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
sp.setup({
  sp: {
    baseUrl: "" //"https://tclo365.sharepoint.com/sites/IPMS_UAT",
  },
});
export const Home = () => {
  sp.web.currentUser().then((r) => {
    console.log(r);
  });
  return (
    <div>
      <h3>Home</h3>
    </div>
  );
};

export default Home;
