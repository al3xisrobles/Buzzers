/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrgSubmission = /* GraphQL */ `
  query GetOrgSubmission($id: ID!) {
    getOrgSubmission(id: $id) {
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
export const listOrgSubmissions = /* GraphQL */ `
  query ListOrgSubmissions(
    $filter: ModelOrgSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrgSubmissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
