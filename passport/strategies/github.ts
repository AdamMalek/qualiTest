import { Authenticator } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';

const useGitHubAuth = (passport: Authenticator) =>
    passport.use(new GitHubStrategy({
        clientID: 'a462eda5683096f8cf64',
        clientSecret: '97ef374f48a9e16805b9a0bbef689aa414c7fae3',
        callbackURL: "http://localhost:8000/auth/github/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            const user = await resolveUser(profile);
            return cb(null, user);
        }
    ));

const resolveUser = async (profile: any) => {
    return Promise.resolve({id: profile.id, username: profile.username})
}

export default useGitHubAuth;