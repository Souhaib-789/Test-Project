import React from 'react';
import { View, Modal as RNModal, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, } from 'react-native';
import { colors } from '../utilities/colors';
import Button from './Button';
import TextComponent from './TextComponent';
import Icon, { IconTypes } from './Icon';

const Modal = ({
    ref,
    onClose,
    onDone,
    animationType,
    visible,
    mainStyle,
    style,
    title,
    titleStyle,
    children,
    buttonTitle,
    buttonStyle,
    buttonTextStyle,
    cancelButtonTitle,
    cross,
    description,
    descriptionStyle,
    btnbold,
    buttonGradient,
    cancelButtonGradient,
    buttonLight,
    cancelButtonLight,
    onCancel,
    cancelButtonStyle,
    crossStyle,
    buttonRightIcon
}) => {

    return (
        <RNModal
            ref={ref}
            onRequestClose={onClose}
            animationType={animationType ? animationType : 'fade'}
            transparent={true}
            visible={visible}>

            <KeyboardAvoidingView
                style={{ flex: 1, marginBottom: 0, }}
                behavior={Platform.OS == 'ios' ? 'padding' : undefined}>

                <View style={[styles.main_container, { ...mainStyle }]}>
                    <View style={[styles.container, { ...style }]}>
                        {cross && <TouchableOpacity onPress={onClose} style={[styles.cross,{...crossStyle}]}><Icon type={IconTypes?.Entypo} name={"cross"} color={colors.GREY} /></TouchableOpacity>}

                        {title && (
                            <TextComponent
                                text={title}
                                
                                style={{
                                    // width: '50%',
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                    marginVertical: 5,
                                    fontSize: 16,
                                    color: colors.BLACK,
                                    fontWeight: 'bold',
                                    ...titleStyle,
                                }}
                            />
                        )}

                        {description && (
                            <TextComponent
                                // semiBold
                                text={description}
                                style={{
                                    textAlign: 'center',
                                    marginBottom: 5,
                                    alignSelf: 'center',
                                    color: colors.BLACK,
                                    fontSize: 14,
                                    ...descriptionStyle,
                                }}
                            />
                        )}

                        {children}

                        <View style={styles.row}>
                            {buttonTitle && (
                                <Button
                                    bold={btnbold}
                                    light={buttonLight}
                                    title={buttonTitle}
                                    onPress={onDone}
                                    gradient={buttonGradient}
                                    style={{
                                        width: cancelButtonTitle ? '47%' : '100%',
                                        backgroundColor: colors.SECONDARY,
                                        ...buttonStyle,
                                    }}
                                    textStyle={{ ...buttonTextStyle, }}
                                    icon={buttonRightIcon ? buttonRightIcon : null}
                                />
                            )}

                            {cancelButtonTitle && (
                                <Button
                                    title={cancelButtonTitle || 'Cancel'}
                                    onPress={onCancel}
                                    light={cancelButtonLight}
                                    gradient={cancelButtonGradient}
                                    style={{ width: '47%', backgroundColor: colors.WHITE, ...cancelButtonStyle }}
                                    textStyle={{ color: colors.PRIMARY }}
                                />
                            )}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </RNModal>
    );
};

export default Modal;

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: colors.WHITE,
        width: '90%',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 10
    },
    cross: {
        position: 'absolute',
        alignSelf: 'flex-end',
        top: 15,
        right: 15,
        zIndex:10000
    },
    cancel_button: {
        width: '47%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    crossView: {

        position: "absolute",
        top: 10,
        right: 12,


    }
});