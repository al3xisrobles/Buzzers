/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrgSubmission = /* GraphQL */ `
  mutation CreateOrgSubmission(
    $input: CreateOrgSubmissionInput!
    $condition: ModelOrgSubmissionConditionInput
  ) {
    createOrgSubmission(input: $input, condition: $condition) {
      id
      orgType
      location
      description
      adjectives
      eventTypes
      ageRange
      percentMale
      profilePicture
      eventPictures
      frequency
      instagram
      facebook
      website
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateOrgSubmission = /* GraphQL */ `
  mutation UpdateOrgSubmission(
    $input: UpdateOrgSubmissionInput!
    $condition: ModelOrgSubmissionConditionInput
  ) {
    updateOrgSubmission(input: $input, condition: $condition) {
      id
      orgType
      location
      description
      adjectives
      eventTypes
      ageRange
      percentMale
      profilePicture
      eventPictures
      frequency
      instagram
      facebook
      website
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteOrgSubmission = /* GraphQL */ `
  mutation DeleteOrgSubmission(
    $input: DeleteOrgSubmissionInput!
    $condition: ModelOrgSubmissionConditionInput
  ) {
    deleteOrgSubmission(input: $input, condition: $condition) {
      id
      orgType
      location
      description
      adjectives
      eventTypes
      ageRange
      percentMale
      profilePicture
      eventPictures
      frequency
      instagram
      facebook
      website
      createdAt
      updatedAt
      __typename
    }
  }
`;
