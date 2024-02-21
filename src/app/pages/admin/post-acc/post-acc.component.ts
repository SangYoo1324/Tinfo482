import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SectionTitleComponent} from "../../../common/section-title/section-title.component";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {ItemService} from "../../../_service/item.service";
import {AccDto, FlowerDto} from "../../../../interfaces";
import {env_var} from "../../../_env/env.now";

@Component({
  selector: 'app-post-acc',
  standalone: true,
  imports: [
    CKEditorModule,
    NgIf,
    ReactiveFormsModule,
    SectionTitleComponent,
    FormsModule
  ],
  template: `

    <section>
      <app-section-title
        [title]="'Acc Input'"
        [subTitle]="'Register Acc inside inventory with full options'"
      ></app-section-title>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">

            <div class="options">
              <form [formGroup]="reactiveForm" (ngSubmit)="submit()">

                <div class="mb-3">
                  <label class="form-label text-black">Name</label>
                  <input type="text" class="form-control" formControlName="name">
                  <small *ngIf="reactiveForm.get('name')?.hasError('required') &&reactiveForm.get('name')?.touched">** Required Field</small>
                  <small *ngIf="reactiveForm.get('name')?.hasError('notANumber')&&reactiveForm.get('name')?.touched">** Not a number.. plz input valid number</small>
                </div>
                <div class="mb-3">
                  <label class="form-label text-black">Price</label>
                  <input type="text" class="form-control" formControlName="price">
                  <small *ngIf="reactiveForm.get('price')?.hasError('required') &&reactiveForm.get('price')?.touched">** Required Field</small>
                  <small *ngIf="reactiveForm.get('price')?.hasError('notANumber')&&reactiveForm.get('price')?.touched">** Not a number.. plz input valid number</small>
                </div>
                <div class="mb-3">
                  <label class="form-label text-black">Stock</label>
                  <input type="text" class="form-control" formControlName="stock">
                  <small *ngIf="reactiveForm.get('stock')?.hasError('required') &&reactiveForm.get('stock')?.touched">** Required Field</small>
                  <small *ngIf="reactiveForm.get('stock')?.hasError('notANumber')&&reactiveForm.get('stock')?.touched">** Not a number.. plz input valid number</small>
                </div>

              </form>

            </div>

            <div class="expl">
              <p>** All Contents should be filled up or submit button will keep disabled..</p>
              <p>** You can also include graphics, embedded youtube, quotes into your
                content Detailed information. Please be creative!</p>
            </div>

            <div class="btn-wrap">
              <button type="submit" class="btn btn-outline-primary"
                      (click)="submit()"
                      [disabled]="!reactiveForm.valid || editorContent.length <1 || !fileInput.nativeElement.files![0]" >submit
              </button>
            </div>


          </div>
          <div class="col-lg-6">

            <div class="pic_container">
              <div class="label-wrap">
                <label for="">Thumbnail Image (Required)</label>
              </div>
              <input type="file" id="file" name="upload" (change)="setThumbnail($event);" #AccFileInput>
              <div class="img_wrap_acc">
                <img
                  class="position-absolute upload_image_btn"
                  (click)="manualClickInput()"
                  src="https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png" alt="">
              </div>
            </div>


            <div class="editor-wrap">
              <div class="label-wrap">
                <h3>Detailed Information</h3>
                <p>Please write detailed information of your product..</p>

              </div>
              <ckeditor [editor]="Editor" [config]="{

                mediaEmbed: {
      previewsInData: true
    },
    ckfinder: {
      uploadUrl: env_var.envNow+'/api/image/ck5/upload'
    },
    ui: {
      poweredBy: {
        position: 'inside',
        side: 'left',
        label: '.',
        verticalOffset: 0,
        horizontalOffset: 0
      }
    }

              }" [(ngModel)]="editorContent"></ckeditor>
            </div>


          </div>

        </div>


      </div>
    </section>

  `,
  styleUrl: './post-acc.component.css'
})
export class PostAccComponent {

  public Editor = ClassicEditor;
  public editorContent = '';
  public completeFormPackage:FormData= new FormData();

  constructor(private renderer:Renderer2, private itemService:ItemService) {

  }

  accDto!:AccDto;
//id,price,name, content,stock,img_url

  reactiveForm!: FormGroup;

  ngOnInit(){

    this.reactiveForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      price: new FormControl(null, [Validators.required, this.numberValidator]),
      stock: new FormControl(null, [Validators.required, this.numberValidator])
    });


  }

  numberValidator =(control: AbstractControl)=> {
    const value = control.value;
    if (isNaN(value)) {
      return { 'notANumber': true };
    }
    return null;
  }


  submit(){

    console.log(this.editorContent);
    if(!this.fileInput.nativeElement.files[0]){

      alert("please select flower's Image");
    }
    if(this.editorContent.length<1){
      alert("Please fill out some detailed information of your product..")
    }

    console.log(this.reactiveForm.value);
    //content handling(need to inject ck5 editor into content)
    // Also, need to wrap content with div ck-content
    const content = this.injectCssIntoCk5Content();

    this.accDto = {

      ...this.reactiveForm.value,
      content: this.editorContent,
      img_url: null,
      id: null,

    }

    const file = this.fileInput.nativeElement.files?.[0];
    this.completeFormPackage.append('file', file);
    this.completeFormPackage.append('accDto', JSON.stringify(this.accDto));

    console.log("FlowerDto")
    console.log(this.accDto);

    this.itemService.postAcc(this.completeFormPackage).subscribe(resp=>{
      console.log(resp);
      alert("Acc has been successuflly uploaded!");
      this.itemService.accListDataStream.next(this.itemService.fetchAccs());
    }, error => {
      alert("Something went wrong");
    })


  }

  injectCssIntoCk5Content(){
    const ckContentDiv = document.createElement('div');
    ckContentDiv.classList.add('ck-content');
    ckContentDiv.innerHTML = this.editorContent;
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/ck5-content-styles.css';

    ckContentDiv.insertBefore(styleLink, ckContentDiv.firstChild);

    const modifiedHtmlString = ckContentDiv.outerHTML;
    console.log(modifiedHtmlString);
    return modifiedHtmlString;
  }


  setThumbnail(e:Event){
    console.log("set Thumbnail:::");

    const file = (e.target as HTMLInputElement).files![0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e:any) =>{
        // target.result returns file info like url, actual content after reading file done
        this.updateImageSource(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  private updateImageSource(result:string){
    const imgWrap = document.querySelector('.img_wrap_acc')!;
    if(imgWrap){
      const existingImg = imgWrap.querySelector('.uploaded_img_acc')
      if(existingImg){
        // remove existingImg
        this.renderer.removeChild(imgWrap,existingImg);
      }

      const img = this.renderer.createElement('img');
      this.renderer.addClass(img,'uploaded_img_acc');
      img.addEventListener('click',(e:Event)=>{
        this.manualClickInput();
      })
      this.renderer.setAttribute(img, 'src', result);
      this.renderer.appendChild(imgWrap,img);
    }
  }

  //img click Input

  @ViewChild('AccFileInput') fileInput!: ElementRef;
  manualClickInput(){
    this.fileInput.nativeElement.click();
  }


  protected readonly env_var = env_var;
}
