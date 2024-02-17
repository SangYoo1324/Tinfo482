import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAccComponent } from './post-acc.component';

describe('PostAccComponent', () => {
  let component: PostAccComponent;
  let fixture: ComponentFixture<PostAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAccComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
