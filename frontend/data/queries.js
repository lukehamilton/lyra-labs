import { gql } from "@apollo/client";
import { topicFields, postFields } from "./fragments";

export const SAVED_POSTS = gql`
  query savedPosts($take: Int, $cursor: ID) {
    savedPosts(take: $take, cursor: $cursor) {
      ...postFields
    }
  }
  ${postFields}
`;

export const FEED_POSTS = gql`
  query feedPosts {
    feedPosts {
      ...postFields
      submitter {
        walletIsSetup
        walletAddress
      }
    }
  }
  ${postFields}
`;

export const USER_POSTS_ARCHIVE = gql`
  query userPostsArchive {
    userPostsArchive {
      id
      author
      date
      description
      image
      logo
      publisher
      title
      url
      archived
      pinned
    }
  }
`;

export const USER_SEARCH = gql`
  query userSearch($keyword: String) {
    userSearch(keyword: $keyword) {
      id
      username
      name
      avatar
    }
  }
`;

export const SECTIONS_QUERY = gql`
  query sections($first: Int!, $skip: Int!) {
    sections(first: $first, skip: $skip) {
      id
      date
      posts {
        id
        name
        slug
        description
        tagline
        thumbnail
        galleryThumbs
        votes {
          id
        }
        votesCount
        upvoted
        topics {
          id
          name
          slug
        }
      }
    }
  }
`;

export const POSTS_QUERY = gql`
  query post {
    posts {
      id
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      avatar
      walletAddress
      walletIsSetup
      username
      name
      followedTopics {
        id
        name
        slug
      }
    }
  }
`;

export const POST_QUERY = gql`
  query post($slug: String!) {
    post(slug: $slug) {
      id
      name
      slug
      description
      tagline
      thumbnail
      votesCount
      galleryThumbs
      upvoted
      link
      comments(orderBy: { createdAt: desc }) {
        id
        text
        votesCount
        upvoted
        updatedAt
        author {
          id
          avatar
          username
          name
        }
        replies {
          id
          text
          votesCount
          upvoted
          updatedAt
          author {
            id
            avatar
            username
            name
          }
        }
      }
      creators {
        avatar
        username
        headline
        name
      }
      submitter {
        avatar
        username
        headline
        name
      }
      votes {
        id
      }
      topics {
        id
        name
        slug
      }
    }
  }
`;
