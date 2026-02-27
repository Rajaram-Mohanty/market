export const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dt65jsnjj";
  const upload_preset = "market";

  if (!cloud_name || !upload_preset) {
    console.log("Cloudinary credentials are missing");
    return null;
  }

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "post",
        body: data,
      },
    );

    const fileData = await res.json();
    if (fileData.error) {
      console.log("error : ", fileData.error);
      return null;
    }
    return fileData.url.toString();
  } else {
    console.log("error : pic not found");
  }
};
