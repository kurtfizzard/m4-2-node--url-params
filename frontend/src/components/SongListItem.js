import React from "react";
import styled from "styled-components";

const SongListItem = (song) => {
  // const { rank, title, artist, streams, publicationDate } = song;
  return (
    <ListItem>
      <SectionOne>
        <Rank># {song.rank}</Rank>
        <Streams>({song.streams} streams)</Streams>
      </SectionOne>
      <SectionTwo>
        <Title>{song.title}</Title>
        <Artist>by {song.artist}</Artist>
      </SectionTwo>
      <SectionThree>
        <PublicationDate>
          publication date: {song.publicationDate}
        </PublicationDate>
      </SectionThree>
    </ListItem>
  );
};
export default SongListItem;

const ListItem = styled.li`
  border-bottom: 1px solid grey;
  display: flex;
  padding: 10px;
  width: 100vw;
`;

const SectionOne = styled.div`
  width: 15%;
`;

const SectionTwo = styled.div`
  width: 60%;
`;

const SectionThree = styled.div`
  align-self: flex-end;
  width: 25%;
`;

const Rank = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

const Streams = styled.p`
  color: grey;
  font-size: 15px;
`;

const Title = styled.p`
  font-size: 25px;
  font-weight: bold;
`;

const Artist = styled.p`
  color: grey;

  font-size: 20px;
  font-style: italic;
`;

const PublicationDate = styled.p`
  color: grey;
  padding: 10px;
  text-align: right;
  /* align-self: flex-end; */
`;
