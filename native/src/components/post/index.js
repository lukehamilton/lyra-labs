import React, { useState } from "react";
import { Share, Linking, Pressable } from "react-native";
import { useMutation } from "@apollo/client";
import { useTheme } from "@emotion/react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBookmark,
  faArchive,
  faTrashAlt,
  faShareSquare,
} from "@fortawesome/pro-light-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/pro-solid-svg-icons";
import { formatDate } from "@shared/utils";

import {
  SAVE_EXISTING_POST,
  REMOVE_POST,
  NEW_ARCHIVE_POST,
  NEW_RESTORE_POST,
} from "@data/mutations";

import { postFields } from "@data/fragments";

export const POST_TYPE_DEFAULT = "post-type-default";
export const POST_TYPE_SAVED = "post-type-saved";
export const POST_TYPE_ARCHIVED = "post-type-archived";

const ACTION_SAVE = "save";
const ACTION_ARCHIVE = "archive";
const ACTION_RESTORE = "restore";
const ACTION_SHARE = "share";
const ACTION_REMOVE = "remove";

const POST_TYPE_ACTIONS = {
  [POST_TYPE_DEFAULT]: [ACTION_SAVE],
  [POST_TYPE_SAVED]: [ACTION_ARCHIVE, ACTION_SHARE, ACTION_REMOVE],
  [POST_TYPE_ARCHIVED]: [ACTION_RESTORE, ACTION_SHARE, ACTION_REMOVE],
};

import {
  Container,
  TopRow,
  BottomRow,
  LeftCol,
  RightCol,
  SourceMeta,
  SourceLogo,
  Title,
  SourceName,
  Meta,
  MetaDate,
  Thumbnail,
  Actions,
  Action,
  ActionName,
  PressableAction,
} from "./shared";

const Post = ({ post, postType = POST_TYPE_DEFAULT }) => {
  const formattedDate = formatDate(post.date);
  const [isSaved, setIsSaved] = useState(false);
  const [savedId, setSavedId] = useState(null);

  const theme = useTheme();

  const [saveExistingPost] = useMutation(SAVE_EXISTING_POST);

  const [newArchivePost] = useMutation(NEW_ARCHIVE_POST, {
    update(cache, { data: { newArchivePost: archivedPost } }) {
      cache.modify({
        fields: {
          newSavedPosts(savedPostRefs = [], { readField }) {
            return savedPostRefs.filter(
              (savedPostRef) =>
                archivedPost.id !== readField("id", savedPostRef)
            );
          },
          newArchivedPosts(existingArchivedPosts = []) {
            const newArchivedPostRef = cache.writeFragment({
              data: archivedPost,
              fragment: postFields,
            });
            return [newArchivedPostRef, ...existingArchivedPosts];
          },
        },
      });
    },
  });

  const [newRestorePost] = useMutation(NEW_RESTORE_POST, {
    update(cache, { data: { newRestorePost: restoredPost } }) {
      cache.modify({
        fields: {
          newArchivedPosts(archivedPostRefs = [], { readField }) {
            return archivedPostRefs.filter(
              (archivedPostRef) =>
                restoredPost.id !== readField("id", archivedPostRef)
            );
          },
          newSavedPosts(existingSavedPosts = []) {
            const newSavedPostRef = cache.writeFragment({
              data: restoredPost,
              fragment: postFields,
            });
            return [newSavedPostRef, ...existingSavedPosts];
          },
        },
      });
    },
  });

  const [removePost] = useMutation(REMOVE_POST, {
    update(cache, { data: { removePost: removedPost } }) {
      cache.modify({
        fields: {
          newSavedPosts(savedPostRefs = [], { readField }) {
            return savedPostRefs.filter(
              (savedPostRef) => removedPost.id !== readField("id", savedPostRef)
            );
          },
          newArchivedPosts(archivedPostRefs = [], { readField }) {
            return archivedPostRefs.filter(
              (archivedPostRef) =>
                removedPost.id !== readField("id", archivedPostRef)
            );
          },
        },
      });
    },
  });

  const handleSavePress = () => {
    if (isSaved) {
      removePost({ variables: { postId: savedId } })
        .then(({ data }) => {
          setIsSaved(false);
          setSavedId(null);
        })
        .catch((e) => console.log("e", e));
    } else {
      saveExistingPost({ variables: { postId: post.id } })
        .then(({ data }) => {
          setIsSaved(true);
          const newSavedPostId = data.saveExistingPost.id;
          setSavedId(newSavedPostId);
        })
        .catch((e) => console.log("e", e));
    }
  };

  const handleArchivePress = () => {
    newArchivePost({ variables: { postId: post.id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const handleRestorePress = () => {
    newRestorePost({ variables: { postId: post.id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const handleSharePress = () => {
    console.log("pressed share post", post);
    // try {
    //   const result = await Share.share({
    //     // url:
    //     message:
    //       "React Native | A framework for building native apps using React",
    //   });
    //   if (result.action === Share.sharedAction) {
    //     if (result.activityType) {
    //       // shared with activity type of result.activityType
    //     } else {
    //       // shared
    //     }
    //   } else if (result.action === Share.dismissedAction) {
    //     // dismissed
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  const handleRemovePress = () => {
    removePost({ variables: { postId: post.id } })
      .then(({ data }) => {})
      .catch((e) => console.log("e", e));
  };

  const POST_ACTIONS = POST_TYPE_ACTIONS[postType];

  const ACTIONS = {
    [ACTION_SAVE]: {
      onPress: handleSavePress,
      icon: isSaved ? faBookmarkSolid : faBookmark,
      name: isSaved ? "Saved" : "Save",
    },
    [ACTION_ARCHIVE]: {
      onPress: handleArchivePress,
      icon: faArchive,
      name: "Archive",
    },
    [ACTION_RESTORE]: {
      onPress: handleRestorePress,
      icon: faArchive,
      name: "Restore",
    },
    [ACTION_SHARE]: {
      onPress: handleSharePress,
      icon: faShareSquare,
      name: "Share",
    },
    [ACTION_REMOVE]: {
      onPress: handleRemovePress,
      icon: faTrashAlt,
      name: "Remove",
    },
  };

  return (
    <Container onPress={() => Linking.openURL(post.url)}>
      <TopRow>
        <LeftCol>
          <SourceMeta>
            <SourceLogo resizeMode={"contain"} source={{ uri: post.logo }} />
            <SourceName>{post.publisher}</SourceName>
          </SourceMeta>
          <Title>{post.title}</Title>
        </LeftCol>
        <RightCol>
          <Thumbnail source={{ uri: post.image }} />
        </RightCol>
      </TopRow>
      <BottomRow>
        <Meta>
          <MetaDate>{formattedDate}</MetaDate>
        </Meta>
        <Actions>
          {POST_ACTIONS.map((action, i) => {
            const { icon, name, onPress } = ACTIONS[action];
            const marginRight =
              POST_ACTIONS.length > 1 && i < POST_ACTIONS.length - 1 ? 10 : 0;
            return (
              <PressableAction onPress={onPress} style={{ marginRight }}>
                {({ pressed }) => (
                  <Action opacity={pressed ? 0.4 : 1}>
                    <FontAwesomeIcon
                      style={{ marginRight: 5 }}
                      size={15}
                      color={theme.colors.primary}
                      icon={icon}
                    />
                    <ActionName>{name}</ActionName>
                  </Action>
                )}
              </PressableAction>
            );
          })}
        </Actions>
      </BottomRow>
    </Container>
  );
};

export default React.memo(Post);