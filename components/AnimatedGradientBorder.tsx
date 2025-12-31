import { Canvas, LinearGradient, RoundedRect, vec } from '@shopify/react-native-skia';
import { ReactNode, useEffect, useState } from 'react';
import { LayoutRectangle, StyleSheet, View, ViewStyle } from 'react-native';
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

type Props = {
  children: ReactNode;
  colors: string[];
  borderWidth?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

export default function AnimatedGradientBorder({
  children,
  colors,
  borderWidth = 3,
  borderRadius = 28,
  style,
}: Props) {
  const [layout, setLayout] = useState<LayoutRectangle>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  
  const progress = useSharedValue(0);
  
  const animatedStart = useDerivedValue(() => {
    const angle = progress.value * 2 * Math.PI;
    return vec(
      layout.width / 2 + Math.cos(angle) * layout.width,
      layout.height / 2 + Math.sin(angle) * layout.height
    );
  });

  const animatedEnd = useDerivedValue(() => {
    const angle = progress.value * 2 * Math.PI + Math.PI;
    return vec(
      layout.width / 2 + Math.cos(angle) * layout.width,
      layout.height / 2 + Math.sin(angle) * layout.height
    );
  });

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { 
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <View style={style} onLayout={(e) => setLayout(e.nativeEvent.layout)}>
      <Canvas
        style={{
          position: 'absolute',
          width: layout.width,
          height: layout.height,
        }}>
        <RoundedRect
          x={0}
          y={0}
          width={layout.width}
          height={layout.height}
          r={borderRadius}>
          <LinearGradient
            colors={colors}
            start={animatedStart}
            end={animatedEnd}
          />
        </RoundedRect>
      </Canvas>
      <View
        style={[
          styles.innerContainer,
          {
            margin: borderWidth,
            borderRadius: borderRadius - borderWidth,
          },
        ]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: 'transparent',
  },
});
