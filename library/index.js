
import { NativeModules } from 'react-native';

const { RNFloatingBubble } = NativeModules;

export const showFloatingBubble = () => RNFloatingBubble.showFloatingBubble();
export default { showFloatingBubble };
