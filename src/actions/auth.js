import { tipos } from "../types/tipos"
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(r => {
                console.log(r);
                dispatch(login(email, password));
                dispatch(finishLoading())
            })
            .catch(e => {
                console.log(e)
                dispatch(finishLoading())
            })

        /* setTimeout(() => {
            dispatch(login(email, password));
        }, 3500); */

    }
}

/// cuando se ejecuta una función asincrono se debe realizar un return un callback, ej :
/* 
    export const nameFuntion = (parames...) => {
        return (dispath) => {
            ...
        }
    }
 */

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                await user.updateProfile({displayName: name});
                console.log(user);
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
            .catch(e => {
                console.log(e)
            })
    }
}


export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then( resp => {
                const {user} = resp;
                dispatch(login(user.uid, user.displayName))
            })
    }
} 

export const login = (uid, name) => (
    {
        type: tipos.login,
        payload:{
            uid,
            name
        }
    }
)

//funcion asincrona
/* 
    export const muFuntion = () => {
        return (dispatch) => {

        }
    }

*/

export const startLogOut = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch(logout());
    }
}

export const logout = () => ({
    type: tipos.logout
})