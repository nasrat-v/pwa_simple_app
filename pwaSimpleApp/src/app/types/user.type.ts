
export interface UserLocation {
  lat: number,
  lon: number
};

export interface UserAuthentication { // should be stored here
  token: string
};

export interface UserCredentials { // should NEVER be stored here
  email: string,
  user_name: string,
  password: string,
  user_loc: UserLocation,
};
  
export interface User {
  id: number,
  aperos_id: number,
  email: string,
  user_name: string,
  user_loc: UserLocation
};