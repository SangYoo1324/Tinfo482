import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {SafeHtmlPipePipe} from "../_pipe/safe-html-pipe.pipe";

@Component({
  selector: 'app-common-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    SafeHtmlPipePipe
  ],
  template:`
    <h2 mat-dialog-title>
      {{data.name}}
    </h2>
    <mat-dialog-content>
      <div class="wrap">
        <img [src]="data.img_url"  alt="">
      </div>
      <div class="container">
        <div class="bar"></div>
        <div class="bar"></div>
        <div [innerHTML]="data.content | safeHtmlPipe" ></div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions>
      <div class="bar"></div>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styleUrl: './common-modal.component.css'
})
export class CommonModalComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data:any, private sanitizer: DomSanitizer) {
      console.log(data);
    }

}
