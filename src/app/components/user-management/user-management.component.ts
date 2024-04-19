import { Component, OnInit } from '@angular/core';
import { FireStoreService } from 'src/app/service/fire-store.service';
import users from '../../../assets/users.json';
import { UserData } from 'src/app/models/users';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  allUsers:UserData[]=[]

  constructor(private fireService: FireStoreService,
    private snackBar:MatSnackBar) { }
  
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
        }
      }
    });
  }

  uploadUsers(): void{
    this.fireService.uploadAllUsers(users);
  }

  changeDisableStatus(user:UserData[string]) {
    void Swal.fire({
      title: 'Do you want to change the disabled status ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.fireService.updateDisabledStatus(user)
        this.snackBar.open('Disabled status changed', 'Close', {
          duration: 5000,
          verticalPosition:'top'
        })
        setTimeout(() => {
          this.fetchUsers()
        },200)
      }
    })
  }





}
