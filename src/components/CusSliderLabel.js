import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import styles from '../style/Style';
import Api from '../Api';

const AnimatedView = Animated.createAnimatedComponent(View);

CustomLabel.defaultProps = {
  leftDiff: 0,
};

const width = 50;
const pointerWidth = width * 0.47;

function LabelBase(props) {
  const { position, value, leftDiff, pressed } = props;

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <View //AnimatedView
        style={[
          styles1.sliderLabel,
          {
            left: position - width / 2,
          },
        ]}
      >
        <View style={styles1.pointer} />
        <Text style={[styles1.sliderLabelText, styles.ff1m]}>{(value)}{value?'0K':'K'}</Text>
      </View>
    )
  );
}

export default function CustomLabel(props) {
  const {
    leftDiff,
    oneMarkerValue,
    twoMarkerValue,
    oneMarkerLeftPosition,
    twoMarkerLeftPosition,
    oneMarkerPressed,
    twoMarkerPressed,
  } = props;

  return (
    <View style={styles1.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={oneMarkerValue}
        leftDiff={leftDiff}
        pressed={oneMarkerPressed}
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={twoMarkerValue}
        leftDiff={leftDiff}
        pressed={twoMarkerPressed}
      />
    </View>
  );
}

const styles1 = StyleSheet.create({
  parentView: {
    position: 'relative',
  },
  sliderLabel: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: '100%',
    width: width,
    // height: width,
  },
  sliderLabelText: {
    textAlign: 'center',
    // lineHeight: width,
    // borderRadius: width / 2,
    // borderWidth: 2,
    // borderColor: '#999',
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  pointer: {
    // position: 'absolute',
    // bottom: -pointerWidth / 4,
    // left: (width - pointerWidth) / 2,
    // transform: [{ rotate: '45deg' }],
    // width: pointerWidth,
    // height: pointerWidth,
    // backgroundColor: '#999',
  },
});