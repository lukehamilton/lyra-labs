import React, { useContext } from "react";
import Page from "@components/page";
import PostList from "@components/post-list";
import { USER_POSTS_INBOX } from "@data/queries";
import { CurrentUserContext } from "@enhancers/current-user";
import { withCurrentUser } from "@enhancers/current-user";
import { withLoginModal } from "@enhancers/login-modal";
import { flowRight as compose } from "lodash";

const IndexPage = ({ user }) => {
  const currentUser = useContext(CurrentUserContext);
  return <Page>{currentUser && <PostList />}</Page>;
};

const enhance = compose(withCurrentUser, withLoginModal);
export default enhance(IndexPage);
