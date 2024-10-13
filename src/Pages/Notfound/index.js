import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CustomButton } from "../../components";
import "./style.scss";

export default function Notfound() {
  const history = useHistory();
  return (
    <div className='notfound'>
      <p className='notfound-title'>404</p>
      <p>Opps! Page not found</p>
      <CustomButton title='Go Back' onClick={() => history.go(-1)} />
    </div>
  );
}
