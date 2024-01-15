import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template:`
    <div class="footer-basic">
      <footer>
        <div class="social"><a href="#"><i class="fa-brands fa-linkedin icon"></i></a>
          <a href="#"><i class="icon fa-brands fa-facebook"></i></a>
          <a href="#"><i class="icon fa-brands fa-x-twitter"></i></a>
          <a href="#"><i class="icon fa-brands fa-instagram"></i></a>
        </div>
        <ul class="list-inline">
          <li class="list-inline-item"><a >Page1</a></li>
          <li class="list-inline-item"><a >Page2</a></li>
          <li class="list-inline-item"><a >Page3</a></li>
          <li class="list-inline-item"><a >Page4</a></li>

        </ul>
        <p class="copyright">Business © 2023</p>
      </footer>
    </div>
  `,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
