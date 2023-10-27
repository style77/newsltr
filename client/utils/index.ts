import continueWithSocialAuth from "./continueWithSocialAuth";

export const continueWithGoogle = () =>
  continueWithSocialAuth("google-oauth2", "login");
