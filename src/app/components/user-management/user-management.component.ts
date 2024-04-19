import { Component, OnInit } from '@angular/core';
import { FireStoreService } from 'src/app/services/fire-store.service';
import users from '../../../assets/users.json';
import { UserData } from 'src/app/models/users';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  allUsers:UserData[]=[]

  constructor(private fireService: FireStoreService) { }
  
  ngOnInit(): void {
    this.fetchUsers()
  }

  fetchUsers(): void{
    this.fireService.fetchAllUsers().subscribe({
      next: (res) => {
        if (res.length === 0) {
          this.uploadUsers()
        } else {
          this.allUsers = res
          console.log(this.allUsers)
        }
      }
    });
  }

  uploadUsers(): void{
    this.fireService.uploadAllUsers(users);
  }

}
