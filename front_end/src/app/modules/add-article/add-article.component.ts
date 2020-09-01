import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessages: string
  constructor(public userService:AuthService) { }
  userDetails;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(

      res => {
        this.userDetails = res["user"];
      },
      err => {
      }

    );
  }
  onSubmit(form: NgForm) {
    this.userService.postArticle(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        form.resetForm();


      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>')
        }
        else {
          this.serverErrorMessages = err
        }

      }
    )

  }
  roleIsAdmin(){
    return this.userDetails.role=="Admin"
  }
}
