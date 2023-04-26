import { loginFailure, loginStart, loginSuccess, logOut } from "./userRedux";
import { deleteProduct } from "./cartRedux";
import { publicRequest } from "../requestMethods";

export const register = async (dispatch, user) => {
  
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch, user) => {
   
  dispatch(logOut());
  dispatch(deleteProduct());  
};

export const clearProduct = async(dispatch , users)=>{
  dispatch(deleteProduct()); 
}

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
