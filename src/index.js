// using ES6 imports:
import { getFirebaseClient } from './config'
import { tasksViewFactory, listsViewFactory, itemsCreationView } from './view'
import {
  tasksModelFactory,
  listsModelFactory,
  itemsCreationModel,
} from './model'
import {
  tasksControllerFactory,
  listsControllerFactory,
  itemsCreationController,
} from './controller'

const firebase = await getFirebaseClient()

// Shortcuts to DOM Elements.
const containerElement = document.getElementById('container')

// Small Firebase Test
// Lazy load firebase
// this is not working => ToDo: we need to know why
// const firebase = async () => { await getFirebaseClient() }
// console.log(firebase)
// ToDo: We need a better approach
containerElement.style.display = 'block'

// Initialize the FirebaseUI Widget using Firebase.
// eslint-disable-next-line no-undef
// const ui = new firebaseui.auth.AuthUI(firebase.auth())

// const uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       if (authResult.user) {
//         handleSignedInUser(authResult.user)
//       }

//       writeUserData(
//         authResult.user.uid,
//         authResult.user.displayName,
//         authResult.user.email,
//         null
//       )
//       containerElement.removeAttribute('hidden')
//       // Do not redirect.
//       return false
//     },
//     uiShown: function () {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none'
//       console.log('uiShown')
//     },
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: 'popup',
//   // signInSuccessUrl: 'https://todo-extended.web.app/',
//   signInOptions: [
//     // Leave the lines as is for the providers you want to offer your users.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//   ],
//   // Terms of service url.
//   tosUrl: '<your-tos-url>',
//   // Privacy policy url.
//   privacyPolicyUrl: '<your-privacy-policy-url>',
// }

// // The start method will wait until the DOM is loaded.
// ui.start('#firebaseui-auth-container', uiConfig)

// function writeUserData(userId, name, email, imageUrl) {
//   firebase
//     .database()
//     .ref('users/' + userId)
//     .set({
//       username: name,
//       email: email,
//       profile_picture: imageUrl,
//     })
// }

// /**
//  * Displays the UI for a signed in user.
//  * @param {!firebase.User} user
//  */
// var handleSignedInUser = function (user) {
//   containerElement.style.display = 'block'
//   document.getElementById('firebaseui-auth-container').style.display = 'none'
//   document.getElementById('name').textContent = user.displayName
//   document.getElementById('email').textContent = user.email
//   document.getElementById('phone').textContent = user.phoneNumber

//   if (user.photoURL) {
//     var photoURL = user.photoURL
//     // Append size to the photo URL for Google hosted images to avoid requesting
//     // the image with its original resolution (using more bandwidth than needed)
//     // when it is going to be presented in smaller size.
//     if (
//       photoURL.indexOf('googleusercontent.com') != -1 ||
//       photoURL.indexOf('ggpht.com') != -1
//     ) {
//       photoURL =
//         photoURL + '?sz=' + document.getElementById('photo').clientHeight
//     }
//     document.getElementById('photo').src = photoURL
//     document.getElementById('photo').style.display = 'block'
//   } else {
//     document.getElementById('photo').style.display = 'none'
//   }
// }

// /**
//  * Displays the UI for a signed out user.
//  */
// var handleSignedOutUser = function () {
//   containerElement.style.display = 'none'
//   document.getElementById('firebaseui-auth-container').style.display = 'block'
//   ui.start('#firebaseui-auth-container', uiConfig)
// }

// // Listen to change in auth state so it displays the correct UI for when
// // the user is signed in or not.
// firebase.auth().onAuthStateChanged(function (user) {
//   document.getElementById('loader').style.display = 'none'
//   // document.getElementById('loaded').style.display = 'block';
//   user ? handleSignedInUser(user) : handleSignedOutUser()
// })

// /**
//  * Deletes the user's account.
//  */
// var deleteAccount = function () {
//   var user = firebase.auth().currentUser
//   // delete user in database
//   firebase
//     .database()
//     .ref('users/' + user.uid)
//     .remove()
//     .then(function (error) {
//       if (error) {
//         console.log(error.message)
//       } else {
//         // delete firebase user authentication
//         firebase
//           .auth()
//           .currentUser.delete()
//           .catch(function (error) {
//             if (error.code == 'auth/requires-recent-login') {
//               // The user's credential is too old. She needs to sign in again.
//               firebase
//                 .auth()
//                 .signOut()
//                 .then(function () {
//                   // The timeout allows the message to be displayed after the UI has
//                   // changed to the signed out state.
//                   setTimeout(function () {
//                     alert('Please sign in again to delete your account.')
//                   }, 1)
//                 })
//             }
//           })
//         alert('Your account was successfully deleted.')
//       }
//     })
// }

// Everything for tasks
const tasksTargetElement = document.getElementById('tasks')
const tasksTargetButton = document.getElementById('task-add')
const tasksTargetField = document.getElementById('task-input')
const initialTasksData = []
const fbTasksRef = firebase
  .database()
  .ref('users/qJnOvq57bjOtuwsPCtL2y2rZMOA2/tasks')

const tasksViewSpecifics = tasksViewFactory(
  tasksTargetElement,
  tasksTargetButton,
  tasksTargetField
)
const tasksCreationView = itemsCreationView('task')
const tasksView = Object.assign({}, tasksViewSpecifics, tasksCreationView)

const tasksModelSpecifics = tasksModelFactory()
const tasksCreationModel = itemsCreationModel(initialTasksData)
const tasksModel = Object.assign({}, tasksModelSpecifics, tasksCreationModel)

const tasksControllerSpecifics = tasksControllerFactory()
const tasksCreationController = itemsCreationController(
  tasksView,
  tasksModel,
  fbTasksRef
)
const tasksController = Object.assign(
  {},
  tasksControllerSpecifics,
  tasksCreationController
)

tasksController.initialize()

// Everything for lists
const listsTargetElement = document.getElementById('lists')
const listsTargetButton = document.getElementById('list-add')
const listsTargetField = document.getElementById('list-input')
const initialListsData = []
const fbListsRef = firebase
  .database()
  .ref('users/qJnOvq57bjOtuwsPCtL2y2rZMOA2/lists')

const listsViewSpecifics = listsViewFactory(
  listsTargetElement,
  listsTargetButton,
  listsTargetField
)
const listsCreationView = itemsCreationView('list')
const listsView = Object.assign({}, listsViewSpecifics, listsCreationView)

const listsModelSpecifics = listsModelFactory()
const listsCreationModel = itemsCreationModel(initialListsData)
const listsModel = Object.assign({}, listsModelSpecifics, listsCreationModel)

const listsControllerSpecifics = listsControllerFactory()
const listsCreationController = itemsCreationController(
  listsView,
  listsModel,
  fbListsRef
)
const listsController = Object.assign(
  {},
  listsControllerSpecifics,
  listsCreationController
)

listsController.initialize()
