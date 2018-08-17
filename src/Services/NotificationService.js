import axios from 'axios'
import {firebaseMessaging} from '../firebaseConfig'
import {store} from '../store'
import {toggleActions} from '../actions/toggleActions'
import {updateToken} from './firebaseDBService'

export const sendEmail = (senderName, senderEmail, to, default_purpose, subject=null, text=null, html=null) => {

	let params = {
		senderName: senderName,
		senderEmail: senderEmail,
		to: to,
		default_purpose: default_purpose,
		subject: subject,
		text: text,
		html: html
	}

	axios.post('https://dev-miteventbooking.herokuapp.com/notif/send-email', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}

export const sendEmailTemplate = (authority=null, mode, message, club_name, club_email, booker_name, booker_email, event_name, receipt_url=null) => {

	let params = {
		authority: authority,
		mode: mode,
		message: message,
		club_name: club_name,
		club_email: club_email,
		booker_name: booker_name,
		booker_email: booker_email,
		event_name: event_name,
		receipt_url: receipt_url,
	}

	axios.get('https://dev-miteventbooking.herokuapp.com/notif/send-email-template', {params})
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}

export const sendComplaintTemplate = (booker_email, booker_name, subject) => {
	let params = {
		booker_email: booker_email,
		booker_name: booker_name,
		subject: subject
	}

	axios.get('https://dev-miteventbooking.herokuapp.com/notif/send-complaint-email', {params})
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}

export const sendApproveClubTemplate = (club_email, club_name) => {
	let params = {
		club_email: club_email,
		club_name: club_name
	}

	axios.get('https://dev-miteventbooking.herokuapp.com/notif/send-clubApproval-email', {params})
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}



	     //  vibrate: [100, 50, 100],
	     //  actions: [
	     //  	{action: 'open', title: 'Open notif', icon: 'assets/notifications/checkIcon.png'},
	     //  	{action: 'close', title: 'Close notification', icon: 'assets/notifications/closeIcon.png'},
	    	// ],
	     //  data: {
	     //    dateOfArrival: Date.now(),
	     //    primaryKey: 1,
	     //    title: 'data -> ' + title
	     //  }
export const sendPush = (uid, title, body) => {

	let params = {
		uid: uid,
    notificationOptions: {
    	notification: {
	      title: title,
	      body: body,
	      icon: 'https://laracasts.com/images/series/circles/do-you-react.png',
	      click_action: 'https://bookings.cribblservices.com'
	  	},
	  	data: {
	  		name: 'bhawesh'
	  	}
    }
  };

  axios.post('https://dev-miteventbooking.herokuapp.com/notif/send-push', params)
	.then(function(resp) {
		console.log(resp);
	})
	.catch(function(err) {
		console.log(err);
	})
}

export const sendSMS = (to, message) => {
	let params = {
		phone: to,
		message: message
	}
	axios.post('https://sfdjt9wg4c.execute-api.us-east-1.amazonaws.com/dev', params)
	.then(function(resp) {
		console.log(resp)
	})
	.catch(function(err) {
		console.log(err)
	})
}

export const getNotificationRequestPermission = (uid) => {
  firebaseMessaging.requestPermission()
  .then(function(){
    console.log("perm granted");
    return firebaseMessaging.getToken();
  })
  .then(function(token) {
  	sessionStorage.setItem('fcmToken', token)
    updateToken(uid, token, true);
  })
  .catch(function(err) {
    console.log(err);
  })
}

firebaseMessaging.onTokenRefresh(function() {
  firebaseMessaging.getToken()
  .then(function(token) {
    updateToken(sessionStorage.getItem('uid'), token, true)
  })
  .catch(function(err) {
    console.log('could not retrieve new token')
  })
})

const getNotificationPermissionState = () => {
  navigator.permissions.query({name:'notifications'})
  .then(function(permissionStatus) {
    console.log('notifications permission status is ', permissionStatus.state);
    
    permissionStatus.onchange = function() {
      console.log('notifications permission status has changed to ', this.state);
    };
    
  });
}

firebaseMessaging.onMessage(function(payload) {
    store.dispatch(toggleActions.toggleToaster(payload.notification.title, true));
})

export const requestOTP = (uid, contact, callback) => {
	let params = {
	  userID: uid,
	  contact: contact
	}
	axios.get("https://dev-miteventbooking.herokuapp.com/send-otp", {params})
	.then(function(res) {
	  if(res.data.code=='failure') {
	    throw res.data.message
	  }
	  console.log(res);
	  callback(null);
	})
	.catch(function(err) {
	  console.log(err)
	  callback(err);
	})
}

export const confirmOTP = (code, userDetails, callback) => {
	let params = {
	  userID: userDetails.uid,
	  code: code,
	  userDetails: userDetails
	}
	axios.get("https://dev-miteventbooking.herokuapp.com/confirm-otp", {params})
	.then(function(res) {
	  if(res.data.code=='failure') {
	    throw res.data.message
	  }
	  console.log(res);
	  callback(null);
	})
	.catch(function(err) {
	  console.log(err)
	  callback(err);
	})
}