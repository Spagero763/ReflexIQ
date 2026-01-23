export interface AnimationConfig {
  duration: number;
  easing: string;
  delay: number;
  repeat: boolean;
  direction: 'normal' | 'reverse' | 'alternate';
}

export interface TransitionConfig {
  enter: AnimationConfig;
  exit: AnimationConfig;
}
