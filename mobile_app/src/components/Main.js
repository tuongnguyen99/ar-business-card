import React, { Component, useState } from "react";
import { ViroARScene } from "react-viro";
import ImgMarker from "./ImgMarker";
const axios = require("axios");

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      loaded: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://us-central1-ar-card-cb010.cloudfunctions.net/app/api/profiles"
      )
      .then(({ data }) => {
        this.setState({ ...this.state, profiles: data, loaded: true });
      });
  }

  render() {
    const { profiles, loaded } = this.state;
    return (
      <ViroARScene>
        {loaded &&
          profiles.map((pr) => {
            const {
              targetImageUrl,
              userId,
              name,
              avatarImageUrl,
              largeImageUrl,
              videoUrl,
              email,
              facebook,
              phone,
              profileUrl,
            } = pr.doc;
            return (
              <ImgMarker
                key={userId}
                id={pr.id}
                targetImage={targetImageUrl}
                userId={userId}
                name={name}
                avatarUrl={avatarImageUrl}
                largeImageUrl={largeImageUrl}
                videoUrl={videoUrl}
                email={email}
                phone={phone}
                facebook={facebook}
                profileUrl={profileUrl}
              />
            );
          })}
      </ViroARScene>
    );
  }
}
