import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTimeline } from "../services/linkr";
import Post from "./Post";
import { PublishPost } from "./PublishPost";

export function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getTimeline()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container>
      <Title>timeline</Title>
      <PublishPost />
      <PostsSection>
        {posts.length === 0
          ? "There are no posts yet"
          : posts.map((value) => (
              <Post
                key={value.id}
                id={value.id}
                username={value.username}
                image={value.image}
                link={value.link}
                description={value.description}
                likes={value.likes}
              />
            ))}
      </PostsSection>
    </Container>
  );
}

const Container = styled.section`
  margin-top: 20px;
  width: 611px;

  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const Title = styled.h1`
  margin-inline: auto;
  font-family: "Oswald";
  font-weight: 700;
  color: #ffffff;
  font-size: 43px;
  @media screen and (max-width: 600px) {
    font-size: 33px;
    padding-left: 17px;
  }
`;

const PostsSection = styled.section`
  margin-top: 29px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  @media screen and (max-width: 600px) {
    margin-top: 16px;
  }
`;
