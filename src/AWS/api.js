// Generates a client for interacting with the API.
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

// Queries
import { getOrgSubmission } from './graphql/queries';

// Storage
import { uploadData } from "aws-amplify/storage";

/**
 * Uploads an image file to storage.
 * @param {File} file - The image file to upload.
 * @param {string} userId - The ID of the user.
 * @param {string} subpath - The subpath for storing the image.
 * @returns {Promise<string>} A promise that resolves with the path of the uploaded image.
 */
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

/**
 * Submits an organization submission to the API.
 * @param {Object} orgSubmission - The organization submission data.
 * @param {string} query - The GraphQL query for submitting the data.
 * @returns {Promise<void>} A promise that resolves when the submission is successful.
 */
const submitToAPI = async (orgSubmission, query) => {
  return new Promise((resolve, reject) => {
    client.graphql({
      query: query,
      variables: {
        input: orgSubmission
      },
    }).then(() => {
      console.log("Successfully submitted to DB API");
      resolve();
    }).catch((error) => {
      console.error(error);
      reject(error);
    });
  });
};

/**
 * Checks the sign-up status of a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating the sign-up status.
 */
const checkUserSignUpStatus = async (userId) => {
  try {
    const response = await client.graphql({
      query: getOrgSubmission,
      variables: {
        id: userId,
      }
    });
    return response.data.getOrgSubmission ? true : false;
  } catch (error) {
    console.error("Error checking sign up status:", error);
    return false;
  }
};

export { submitToAPI, uploadImageToStorage, checkUserSignUpStatus };
