A simple Ionic CRUD application that helps to manage data from Cloud Firestore

Demo: https://ionic-firestore-dn.firebaseapp.com

# Prerequisites

You have create a project in [Firebase](https://firebase.google.com/) with Cloud Firestore in TEST MODE.

Remember to save Firebase details from your project for firebase initialization.

Install ionic if you did not.

```
npm install -g ionic
```

# After cloning this project

Install the NPM packages

```
npm install
npm install --only=dev
```

# Update the environment

You need to change file **env-example.ts** to **env.ts** and update your project details from Firebase.

# Run this project

```
ionic serve
```


*This repository is based on [Mastering Ionic](http://masteringionic.com/blog/2017-10-22-using-firebase-cloud-firestore-with-ionic/)*
