import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  total: number;
  users: User[] = [];
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.total = data.count;
      this.users = data.user;
      console.log(data);
    }, (error) => {
      console.log(error);
    })
  }

}
