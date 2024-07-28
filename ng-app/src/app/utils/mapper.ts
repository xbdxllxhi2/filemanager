import {KeycloakProfile} from "keycloak-js";
import {UserModel} from "../models/user-model";

export class Mapper {

  static map(profile: KeycloakProfile): UserModel {
    return {
      uname: profile.username,
      fname: profile.firstName,
      lname: profile.lastName,
      email: profile.email,
      isEmailVerified: profile.emailVerified,
      phoneNumber: ""
    }
  }
}
