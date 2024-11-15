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
      referrer
      university
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
      referrer
      university
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
      referrer
      university
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBrandSubmission = /* GraphQL */ `
  mutation CreateBrandSubmission(
    $input: CreateBrandSubmissionInput!
    $condition: ModelBrandSubmissionConditionInput
  ) {
    createBrandSubmission(input: $input, condition: $condition) {
      id
      brandPersonality
      adjectives
      category
      ageRange
      region
      segmentAdjectives
      eventTypes
      desiredOrganizers
      products
      agreementStructures
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBrandSubmission = /* GraphQL */ `
  mutation UpdateBrandSubmission(
    $input: UpdateBrandSubmissionInput!
    $condition: ModelBrandSubmissionConditionInput
  ) {
    updateBrandSubmission(input: $input, condition: $condition) {
      id
      brandPersonality
      adjectives
      category
      ageRange
      region
      segmentAdjectives
      eventTypes
      desiredOrganizers
      products
      agreementStructures
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBrandSubmission = /* GraphQL */ `
  mutation DeleteBrandSubmission(
    $input: DeleteBrandSubmissionInput!
    $condition: ModelBrandSubmissionConditionInput
  ) {
    deleteBrandSubmission(input: $input, condition: $condition) {
      id
      brandPersonality
      adjectives
      category
      ageRange
      region
      segmentAdjectives
      eventTypes
      desiredOrganizers
      products
      agreementStructures
      createdAt
      updatedAt
      __typename
    }
  }
`;
