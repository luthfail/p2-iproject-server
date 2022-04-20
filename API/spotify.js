const SpotifyWebApi = require("spotify-web-api-node");

class SpotifyApi {
    static async init() {
        try {
            const spotifyApi = new SpotifyWebApi({
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: process.env.REDIRECT_URI,
            });
            
            const credential = await spotifyApi.clientCredentialsGrant();
            spotifyApi.setAccessToken(credential.body["access_token"]);
            return spotifyApi;
        } catch(error) {
            throw error;
        }
    }

    static async getAlbum(spotifyId) {
        try {
            const spotifyApi = await this.init();
            const response = await spotifyApi.getAlbum(spotifyId);
            return response ? response.body : {}
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SpotifyApi