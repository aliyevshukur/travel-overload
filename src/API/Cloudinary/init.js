import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = "dzmq4caru";
const uploadPreset = "m0akmi0v";

export function initCloudinary() {
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  return cld;
}

export function getCloudinaryConfig() {
  const uwConfig = {
    cloudName,
    uploadPreset,
    clientAllowedFormats: ["jpg, png, jpeg"],
    maxImageFileSize: 4000000,
    multiple: false,
    showAdvancedOptions: true,
  };

  return uwConfig;
}
