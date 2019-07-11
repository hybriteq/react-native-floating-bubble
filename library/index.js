
import { NativeModules } from 'react-native';

const { RNFloatingBubble } = NativeModules;

export default RNFloatingBubble;

export const getValue = () => RNFloatingBubble.getValue();