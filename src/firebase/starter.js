import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import config from './config';

if (firebase.apps.length === 0) firebase.initializeApp(config);
