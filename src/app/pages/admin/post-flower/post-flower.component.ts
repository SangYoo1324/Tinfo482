import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {env_var} from "../../../_env/env.now";
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SectionTitleComponent} from "../../../common/section-title/section-title.component";
import {FlowerDto} from "../../../../interfaces";
import {NgIf} from "@angular/common";
import {ItemService} from "../../../_service/item.service";

@Component({
  selector: 'app-post-flower',
  standalone: true,
  imports: [
    CKEditorModule,
    FormsModule,
    SectionTitleComponent,
    ReactiveFormsModule,
    NgIf
  ],
  template: `
    <section>
      <app-section-title
        [title]="'Flower Input'"
        [subTitle]="'Register Flower inside inventory with full options'"
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

                <div class="mb-3">
                  <label class="form-label text-black">Delivery</label>
                  <select class="form-select" formControlName="delivery" id="">
                    <option value="true">true</option>
                    <option selected value="false">false</option>
                  </select>
                  <small *ngIf="reactiveForm.get('delivery')?.hasError('required') &&reactiveForm.get('delivery')?.touched">** Required Field</small>
                </div>
                <div class="mb-3">
                  <label class="form-label text-black">Category</label>
                  <select class="form-select" formControlName="category" id="">
                    <option selected value="common">common</option>
                    <option value="wedding">wedding</option>
                    <option value="house">house</option>
                    <option value="party">party</option>
                  </select>
                  <small *ngIf="reactiveForm.get('category')?.hasError('required') &&reactiveForm.get('category')?.touched">** Required Field</small>
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
              <input type="file" id="file" name="upload" (change)="setThumbnail($event);" #FileInput>
              <div class="img_wrap">
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
  styleUrl: './post-flower.component.css'
})
export class PostFlowerComponent {

  public Editor = ClassicEditor;
  public editorContent = '';
  public completeFormPackage:FormData= new FormData();

  constructor(private renderer:Renderer2, private itemService:ItemService) {

  }

  flowerDto!:FlowerDto;
//id,price,name, content,stock,img_url, delivery, category

  reactiveForm!: FormGroup;

  ngOnInit(){

    this.reactiveForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      price: new FormControl(null, [Validators.required, this.numberValidator]),
      stock: new FormControl(null, [Validators.required, this.numberValidator]),
      delivery: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
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

  this.flowerDto = {

    ...this.reactiveForm.value,
    content: this.editorContent,
    img_url: null,
    id: null,

  }

  const file = this.fileInput.nativeElement.files?.[0];
  this.completeFormPackage.append('file', file);
  this.completeFormPackage.append('flowerDto', JSON.stringify(this.flowerDto));

  console.log("FlowerDto")
  console.log(this.flowerDto);

  this.itemService.postFlower(this.completeFormPackage).subscribe(resp=>{
    console.log(resp);
    alert("Flower has been successuflly uploaded!");
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
    const imgWrap = document.querySelector('.img_wrap')!;
    if(imgWrap){
      const existingImg = imgWrap.querySelector('.uploaded_img')
      if(existingImg){
        // remove existingImg
        this.renderer.removeChild(imgWrap,existingImg);
      }

      const img = this.renderer.createElement('img');
      this.renderer.addClass(img,'uploaded_img');
      img.addEventListener('click',(e:Event)=>{
        this.manualClickInput();
      })
      this.renderer.setAttribute(img, 'src', result);
      this.renderer.appendChild(imgWrap,img);
    }
  }

  //img click Input

  @ViewChild('FileInput') fileInput!: ElementRef;
  manualClickInput(){
    this.fileInput.nativeElement.click();
  }

  protected readonly env_var = env_var;
}
