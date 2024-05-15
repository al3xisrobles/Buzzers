// Database (API)
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

// Storage
import { uploadData } from "aws-amplify/storage";

const uploadImageToStorage = async (file, userId, subpath) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      try {
        const path = `public/${subpath}/${userId}/${file.name}`;

        console.log("Uploading image to storage...");
        await uploadData({
          data: event.target.result,
          path: path,
        }).result;

        console.log("Image uploaded successfully!");
        resolve(path);
      } catch (e) {
        console.log("Error uploading image:", e);
        reject(e);
      }
    };

    fileReader.onerror = (e) => {
      console.error("Error reading file", e);
      reject(e);
    };
  });
};

const submitToAPI = async (orgSubmission, query) => {
  try {
    await client.graphql({
      query: query,
      variables: {
        input: orgSubmission
      },
    });
    console.log("Successfully submitted to DB API");
  } catch (error) {
    console.error(error);
  }
};

export { submitToAPI, uploadImageToStorage };
