import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-analyst-messages',
  templateUrl: './analyst-messages.component.html',
  styleUrls: ['./analyst-messages.component.scss']
})
export class AnalystMessagesComponent implements OnInit {
  constructor(private userService:AuthService) { }
  messages:Message[]
  userDetails;
  ngOnInit(): void {
    this.userService.getMessages()
      .subscribe(messages => this.messages = messages)
      this.userService.getUserProfile().subscribe(

        res => {
          this.userDetails = res["user"];
        },
        err => {
        }
  
      );
  }
  
}
