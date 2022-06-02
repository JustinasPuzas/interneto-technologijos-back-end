const config = {

    url:{
        Back_End: `http://localhost:5000`, // This
        Front_End: "http://localhost:3000", // React Front End Url
        //Discord_Bot_Api: "http://localhost:8000", // Discord Bot Api
        DataBase: "mongodb://localhost/internetoTechnologijos", // DataBase Url
    },
    admin: "61eca1b9a7ccccd7e0721650"
    // discord auth
    // discord_Auth: {
    //     clientID: `${process.env.CLIENT_ID}`,
    //     clientSecret: `${process.env.CLIENT_SECRET}`,
    //     callBackURL: "/api/auth/discord/redirect", // Redirect to front end after authentication
    //     scope: ['email', 'identify', 'guilds' ] // discord application scopes
    // }
}

export default config;