import { AdvancedImage } from "@cloudinary/react";
import { set } from "@cloudinary/url-gen/actions/variable";
import React, { createContext, useEffect, useState } from "react";
import { getCloudinaryConfig, initCloudinary } from "../../API/Cloudinary/init";
import { CustomButton } from "../CustomButton";
import "./style.scss";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

export function CustomUploadWidget({
  handleImageChange,
  isThumbnail = false,
  id,
  required = false,
}) {
  //CLOUDINARY
  const cld = initCloudinary();
  const uwConfig = getCloudinaryConfig();
  const [publicId, setPublicId] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const myImage = cld.image(publicId);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);

    if (loaded) {
      setIsloading(true);
      let myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            handleImageChange(result.info.url, isThumbnail, id);
          }
        },
      );

      myWidget.open();
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <CustomButton
        id='upload_widget'
        className='button'
        onClick={initializeCloudinaryWidget}
        disabled={isLoading}
        title={isLoading ? "Loading..." : "Upload image"}
        style={{ fontSize: "0.8em" }}
      />

      {myImage && <AdvancedImage cldImg={myImage} className='image' />}
    </CloudinaryScriptContext.Provider>
  );
}

export { CloudinaryScriptContext };
