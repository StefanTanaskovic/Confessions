import Firebase from 'firebase';  
let config = {  
    apiKey: "xxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxx",
    databaseURL: "xxxxxxx",
    projectId: "xxxxxxxxxx",
    storageBucket: "xxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxx"
};
let app = Firebase.initializeApp(config);  

export const db = app.database();  
