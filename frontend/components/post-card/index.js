import React from "react";
import styled from "@emotion/styled";
import { BASE_TEXT, WEIGHT } from "style/typography";
import { BLACK, GUNSMOKE, WHITE, SCOPRION } from "style/colors";

export const THUMBNAIL_DIMENSION = 60;

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  borderRadius: 3,
  marginBottom: 12,
  backgroundColor: WHITE,
  boxShadow: "0 1px 2px 0 rgba(0,0,0,.1)"
});

export const Body = styled("div")({
  padding: "1rem",
  display: "flex"
});

const Footer = styled("div")({});

const Thumbnail = styled("div")(
  {
    // height: 120,
    // width: 150,
    flexShrink: 0,
    borderRadius: 2,
    height: THUMBNAIL_DIMENSION,
    width: THUMBNAIL_DIMENSION
  },
  ({ src }) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover,auto",

    backgroundPosition: "50% 50%,50% 50%"
  })
);

export const Content = styled("div")({
  marginLeft: "1rem"
});

const Title = styled("a")({
  ...BASE_TEXT,
  fontSize: "1rem",
  fontWeight: WEIGHT.BOLD,
  wordBreak: "break-word",
  textDecoration: "none",
  color: BLACK
});

const MetaLine = styled("div")({
  display: "flex",
  alignItems: "center"
});

const PublisherLine = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: ".25rem"
});

const MetaText = styled("div")({
  display: "flex",
  alignItems: "center"
});

const Author = styled("div")({
  ...BASE_TEXT,
  color: SCOPRION,
  fontWeight: WEIGHT.BOLD
});

const SourceLogo = styled("div")(
  {
    width: "1rem",
    height: "1rem"
  },
  ({ src }) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover,auto",
    backgroundPosition: "50% 50%,50% 50%",
    border: `1px solid ${GUNSMOKE}`
  })
);

const Publisher = styled("div")({
  ...BASE_TEXT,
  color: SCOPRION,
  //   fontWeight: WEIGHT.BOLD,
  marginLeft: ".5rem"
});

const Divider = styled("div")({
  height: 18,
  display: "flex",
  alignItems: "center",
  "&::after": {
    content: `'・'`,
    color: SCOPRION
  }
});

const DateContainer = styled("div")({});

const PostCard = ({
  post: { image, title, author, url, logo, publisher, date }
}) => {
  return (
    <Container>
      <Body>
        {image && <Thumbnail src={image} />}
        <Content>
          <Title target="_blank" href={url}>
            {title}
          </Title>
          <PublisherLine>
            <SourceLogo src={logo} />
            <Publisher>{publisher}</Publisher>
          </PublisherLine>
        </Content>
      </Body>
      <Footer />
    </Container>
  );
};

export default PostCard;