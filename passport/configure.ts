import { Authenticator } from "passport"
import useGitHubAuth from "./strategies/github"

const configurePassport = (passport: Authenticator) => {
    useGitHubAuth(passport);
};

export default configurePassport;