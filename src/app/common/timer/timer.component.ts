import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  template:`<p> Your cod eexpires in {{time}}</p>`,
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  @Input() amount: number =5;
   timeInterval: any;
  //starting Point
   time: string = ``;
   timerValue = this.amount*60;
  ngOnInit(){
    this.startTimer();
  }

  ngOnDestroy(){
    this.stopTimer();
  }
  startTimer(){
    this.timeInterval = setInterval(()=>{
      this.updateTimer();
    }, 1000);
  }

  stopTimer(){
    clearInterval(this.timeInterval);
  }

  updateTimer(){
    const minutes = Math.floor(this.timerValue/60);
    const seconds = this.timerValue%60;
    this.time = `${minutes}: ${seconds<10?'0': ''}${seconds}`

    if(this.timerValue>0){
      this.timerValue--;
    }else{
      this.stopTimer();
      alert('Your verification code has expired. Please reissue...');
    }
  }


}
