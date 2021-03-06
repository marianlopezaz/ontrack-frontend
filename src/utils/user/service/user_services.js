import { getUserCrud, getUsersCrud, 
         addUserCrud, editUserCrud, 
         editUserProfile, changeUserPassword, 
         editUserStateCrud, getGroupsCrud, 
         resetUserPasswordCrud, validateTokenResetPasswordCrud, resetUserPasswordConfirmCrud
        } from "../cruds/user_cruds";
import Alert from "react-s-alert";

export async function getOneUserService(token, id_user) {
    return await getUserCrud(token, id_user).then((result) => {
        if (result.success) {

        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function getUserService(token) {
    return await getUsersCrud(token).then((result) => {
        if (result.success) {

        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function addUserService(data, token) {
    return await addUserCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Usuario creado correctamente", {
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function editUserService(data, token) {
    return await editUserCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Usuario editado correctamente", {
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function editUserProfileService(data, token) {
    return await editUserProfile(data, token).then((result) => {
        if (result.success) {
            Alert.success("Perfil de usuario editado correctamente", {
                effect: "stackslide",
            });

        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function changeUserPasswordService(data, token) {
    return await changeUserPassword(data, token).then((result) => {
        if (result.success) { 
            Alert.success("Contrase??a modificada, vuelva a loguearse con sus nuevas credenciales por favor", {
                effect: "stackslide",
            });

        } else {
            Alert.error("La contrase??a ingresada es incorrecta!")
        }
        return result;
    })
}


export async function resetUserPasswordService(email) {
    return await resetUserPasswordCrud(email).then((result) => {
        if (result.success) {
            Alert.success(`Se envi?? un email a ${email}. Corrobore su bandeja de entrada y/o spam`, {
                effect: "stackslide",
            });

        } else {
            let message = `Ocurri?? un error al enviar el email. Puede que el email proporcionado no se encuentre registrado, 
                           por favor intentelo de nuevo o comun??quise con el administrador`
            Alert.error(message, {timeout: 6000, effect: "stackslide"})
        }
        return result;
    })
}

export async function validateTokenResetPasswordService(token) {
    return await validateTokenResetPasswordCrud(token).then((result) => {
        if (result.success) {
            Alert.success(`Email validado correctamente`, {
                effect: "stackslide",
            });

        } else {
            let message = `Ocurri?? un error al validar el email, comun??quese con el administrador`
            Alert.error(message, {timeout: 6000, effect: "stackslide"})
        }
        return result;
    })
}

export async function resetUserPasswordConfirmService(data) {
    return await resetUserPasswordConfirmCrud(data).then((result) => {
        if (result.success) {
            Alert.success(`Contrase??a cambiada correctamente. Vuelve a iniciar sesi??n`, {
                effect: "stackslide",
            });

        } else {
            let message = `Ocurri?? un error al actualizar la contrase??a, comun??quise con el administrador para solucionarlo`
            Alert.error(message, {effect: "stackslide"})
        }
        return result;
    })
}


export async function editUserStateService(data, token) {
    return await editUserStateCrud(data, token).then((result) => {
        if (result.success) {
            Alert.success("Estado del usuario editado correctamente", {
                effect: "stackslide",
            });
        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}

export async function getGroupsService(token) {
    return await getGroupsCrud(token).then((result) => {
        if (result.success) {

        } else {
            result.result.forEach((element) => {
                Alert.error(element.message, {
                    effect: "stackslide",
                });
            });
        }
        return result;
    })
}
