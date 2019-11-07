import gql from "graphql-tag";

export default gql(`
mutation($createeventinput: CreateEventInput!) {
  createEvent(input: $createeventinput) {
    name
    email
    mobile
  }
}`);
