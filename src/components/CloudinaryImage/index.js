import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import React from "react";

const CloudinaryImage = ({ image }) => {
  return <AdvancedImage cldImg={image} />;
};

export default CloudinaryImage;
