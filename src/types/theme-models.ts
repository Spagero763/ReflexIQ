export interface ThemeColor {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
}

export interface Theme {
  name: string;
  colors: ThemeColor;
  typography: {
    fontFamily: string;
    fontSize: Record<string, number>;
  };
}
