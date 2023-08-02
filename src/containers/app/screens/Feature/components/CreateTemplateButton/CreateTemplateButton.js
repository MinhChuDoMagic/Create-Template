import AppButton, { BUTTON_COLOR } from '~/components/atomic/AppButton/AppButton';

export function CreateTemplateButton({ content, onClick, style2, style, ...rest }) {
    return (
        <AppButton
            buttonStyle={style2 === true ? BUTTON_COLOR.BLUE : null}
            onClick={onClick}
            style={{ ...style, width: '130px', height: '48px' }}
            {...rest}
        >
            {content}
        </AppButton>
    );
}
