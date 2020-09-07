import React, { useEffect, useState } from "react";
import {
  ViroARTrackingTargets,
  ViroSound,
  ViroARImageMarker,
  ViroNode,
  ViroImage,
  ViroText,
  ViroVideo,
  ViroAnimations,
  ViroFlexView,
} from "react-viro";
import { Linking, Platform } from "react-native";

const ImgMarker = ({
  userId,
  targetImage,
  avatarUrl,
  largeImageUrl,
  videoUrl,
  name,
  email,
  phone,
  facebook,
  profileUrl,
  color,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [anchorFound, setAnchorFound] = useState(false);
  useEffect(() => {
    ViroARTrackingTargets.createTargets({
      [userId]: {
        source: { uri: targetImage },
        orientation: "Up",
        physicalWidth: 0.05,
      },
    });
    setLoaded(true);
  }, []);
  return (
    loaded &&
    (Platform.OS === "ios" ? (
      <ViroARImageMarker
        target={userId}
        onAnchorFound={() => {
          setAnchorFound(true);
        }}
      >
        <ViroSound source={require("../res/sound.mp3")} />
        <ViroNode
          style={{ marginLeft: 60 }}
          position={[0.04, 0, 0.014]}
          rotation={[-90, 0, 0]}
          height={0.03}
          width={0.03}
          opacity={0}
          animation={{ name: "amRight", run: anchorFound }}
        >
          <ViroImage
            position={[0, 0.018, 0]}
            source={{ uri: avatarUrl }}
            width={0.02}
            height={0.02}
            // style={{borderRadius: "50%"}}
          />
          <ViroText
            position={[0.006, -0.004, 0]}
            text={name}
            scale={[0.024, 0.024, 0.024]}
            textClipMode="None"
            style={{
              marginTop: 2,
              marginLeft: 1,
              color,
            }}
          />
          <ViroImage
            position={[0.002, -0.009, 0]}
            source={require("../res/email.png")}
            height={0.009}
            width={0.03}
            style={{ marginTop: 4 }}
            onClick={() => {
              Linking.openURL(`mailto:${email}?subject=Subject&body=details`);
            }}
          />
          <ViroImage
            position={[0.002, -0.02, 0]}
            source={require("../res/phone.png")}
            height={0.009}
            width={0.03}
            style={{ marginTop: 4 }}
            onClick={() => {
              Linking.openURL(`tel:${phone}`);
            }}
          />
          <ViroImage
            position={[0.002, -0.031, 0]}
            source={require("../res/facebook.png")}
            height={0.009}
            width={0.03}
            style={{ marginTop: 4 }}
            onClick={() => {
              Linking.openURL(facebook);
            }}
          />
          <ViroImage
            position={[0.06, -0.002, 0]}
            source={{
              uri: largeImageUrl,
            }}
            width={0.08}
            height={0.062}
            onClick={() => {
              Linking.openURL(profileUrl);
            }}
          />
        </ViroNode>
        <ViroNode
          position={[0, 0, 0.032]}
          rotation={[-90, 0, 0]}
          height={0.028}
          width={0.03}
          animation={{ name: "amBottom", run: anchorFound }}
        >
          <ViroVideo source={{ uri: videoUrl }} width={0.05} height={0.03} />
        </ViroNode>
        {/* end-node-bottom */}
      </ViroARImageMarker>
    ) : (
      <ViroARImageMarker
        target={userId}
        onAnchorFound={() => {
          setAnchorFound(true);
        }}
      >
        <ViroSound source={require("../res/sound.mp3")} />
        {/* node-left */}
        <ViroNode
          position={[0.04, 0, 0.014]}
          rotation={[-90, 0, 0]}
          height={0.03}
          width={0.03}
          opacity={0}
          animation={{ name: "amRight", run: anchorFound }}
        >
          <ViroFlexView
            position={[0, 0, -0.029]}
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {/* block-left */}
            <ViroFlexView
              style={{ flexDirection: "column", marginLeft: 3 }}
              width={0.04}
            >
              <ViroFlexView
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <ViroImage
                  source={{ uri: avatarUrl }}
                  width={0.02}
                  height={0.02}
                />
                <ViroText
                  text={name}
                  scale={[0.03, 0.03, 0.03]}
                  textClipMode="None"
                  style={{
                    marginTop: 2,
                    marginLeft: 1,
                    color: color,
                  }}
                />
              </ViroFlexView>
              <ViroFlexView
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <ViroImage
                  source={require("../res/email.png")}
                  height={0.01}
                  width={0.03}
                  style={{ marginTop: 4 }}
                  onClick={() => {
                    Linking.openURL(
                      `mailto:${email}?subject=Subject&body=details`
                    );
                  }}
                />
                <ViroImage
                  source={require("../res/phone.png")}
                  height={0.01}
                  width={0.03}
                  style={{ marginTop: 4 }}
                  onClick={() => {
                    Linking.openURL(`tel:${phone}`);
                  }}
                />
                <ViroImage
                  source={require("../res/facebook.png")}
                  height={0.01}
                  width={0.03}
                  style={{ marginTop: 4 }}
                  onClick={() => {
                    Linking.openURL(facebook);
                  }}
                />
              </ViroFlexView>
            </ViroFlexView>
            {/* end-block-left */}
            {/* block-right */}
            <ViroFlexView>
              <ViroFlexView>
                <ViroImage
                  source={{
                    uri: largeImageUrl,
                  }}
                  width={0.08}
                  height={0.062}
                  onClick={() => {
                    Linking.openURL(profileUrl);
                  }}
                />
              </ViroFlexView>
            </ViroFlexView>
            {/* end-block-right */}
          </ViroFlexView>
        </ViroNode>
        {/* end-node-left */}
        {/* node-bottom */}
        <ViroNode
          position={[0, 0, 0.032]}
          rotation={[-90, 0, 0]}
          height={0.028}
          width={0.03}
          animation={{ name: "amBottom", run: anchorFound }}
        >
          <ViroVideo source={{ uri: videoUrl }} width={0.05} height={0.03} />
        </ViroNode>
        {/* end-node-bottom */}
      </ViroARImageMarker>
    ))
  );
};

ViroAnimations.registerAnimations({
  amRight: {
    properties: {
      positionX: 0.04,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 2000,
  },
  amBottom: {
    properties: {
      positionZ: 0.034,
      opacity: 1,
    },
    easing: "Bounce",
    duration: 2000,
  },
});

export default ImgMarker;
