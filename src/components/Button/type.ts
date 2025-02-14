export const styleClasses = {
    simple: 'button--simple',
    rounded: 'button--rounded',
    active: 'button--active',
    notvisible: 'button--notvisible',
    modal: 'button--modal',
    iconed: 'button--iconed',
} as const;
  
export type ButtonStyle = keyof typeof styleClasses;

export type buttontype = {
    buttonText?: string;
    isActive?: boolean;
    onClickEvent?: () => void;
    style?: ButtonStyle | [ButtonStyle, ...ButtonStyle[]];
};