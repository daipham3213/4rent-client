export interface IThemeChanger {
  isDark: boolean;
  onChangeTheme: (isDark: boolean) => void;
}
