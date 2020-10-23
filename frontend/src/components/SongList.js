import React from "react";
import SongListItem from "./SongListItem";
import styled from "styled-components";

const SongList = ({ songs }) => {
  const top50 = songs;
  console.log(top50);
  return (
    <List>
      {top50.map((song) => {
        return (
          <SongListItem
            title={song.title}
            rank={song.rank}
            artist={song.artist}
            streams={song.streams}
            publicationDate={song.publicationDate}
          />
        );
      })}
    </List>
  );
};

export default SongList;

const List = styled.ul`
  margin-top: 20px;
`;
