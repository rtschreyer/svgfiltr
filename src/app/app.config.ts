import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch} from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient( withFetch() ), provideFirebaseApp(() => initializeApp({"projectId":"filtruser","appId":"1:815696694937:web:722aeacc470283a1cff208","storageBucket":"filtruser.appspot.com","apiKey":"AIzaSyDs8OYSkXjrA-R4xyQukxQMjDUD-zFppHs","authDomain":"filtruser.firebaseapp.com","messagingSenderId":"815696694937"})), provideAuth(() => getAuth()), provideDatabase(() => getDatabase())
  ]
};
