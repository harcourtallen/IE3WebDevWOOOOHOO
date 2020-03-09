const { google } = require('googleapis');
const fs = require('fs');
const secrets = JSON.parse(fs.readFileSync('./password.json', 'utf8'));

const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
];

const googleConfig = {
    clientId: secrets.CLIENT_ID,
    clientSecret: secrets.CLIENT_SECRET,
    redirect: 'http://localhost:3000/callback',
    grantType: 'urn:ietf:params:oauth:grant-type:device_code',
};

const createConnection = () => {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect,
    );
};

const getConnectionUrl = (auth) => {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
};

// Helper function combining two functions above
const urlGoogle = () => {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
};

const getTokenFromCode = async (code) => {
    const auth = createConnection();

    return new Promise((resolve, reject) => {
        auth.getToken(code, (err, tokens) => {
            if (err)
                reject(err);
            else
                resolve(tokens);
        });
    });
};

const getEmailFromId = async (token) => {
    const auth = createConnection();
    auth.setCredentials({
        access_token: token
    });
    const service = google.people({ version: 'v1', auth });

    return new Promise((resolve, reject) => {
        service.people.get({
            resourceName: 'people/me',
            personFields: 'names,emailAddresses',
        }).then((me) => {
            resolve({
                name: me.data.names[0].displayName,
                email: me.data.emailAddresses[0].value,
            });
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    createConnection: createConnection,
    getConnectionUrl: getConnectionUrl,
    urlGoogle: urlGoogle,
    getTokenFromCode: getTokenFromCode,
    getEmailFromId: getEmailFromId,
};
