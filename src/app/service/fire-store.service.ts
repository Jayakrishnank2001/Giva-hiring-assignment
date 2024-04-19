import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserData } from '../models/users';
import { Observable, map } from 'rxjs';

@Injectable()

export class FireStoreService {

  constructor(private fireStore: AngularFirestore) { }

  uploadAllUsers(users: UserData) {
    Object.keys(users).forEach((key: string) => {
      this.fireStore.collection('users').add(users[key]);
    });
  }

  fetchAllUsers(): Observable<UserData[]> {
    return this.fireStore.collection('users').get().pipe(
      map(snapshot => {
        const users: UserData[] = [];
        snapshot.forEach(doc => {
          const userData = doc.data() as UserData;
          users.push(userData);
        });
        return users;
      })
    );
  }

  updateDisabledStatus(user: UserData[string]) {
    this.fireStore.collection('users', ref => ref.where('mail', '==', user.mail))
      .get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ disabled: !user.disabled });
        });
      });
  }


}

