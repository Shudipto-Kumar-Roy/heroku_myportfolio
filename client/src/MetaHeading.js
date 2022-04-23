import React from "react";
import { Helmet } from "react-helmet";

const MetaHeading = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </>
  );
};

export default MetaHeading;
