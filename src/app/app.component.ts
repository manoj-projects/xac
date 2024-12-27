import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nobleui-angular';

  // @HostListener('window:unload', ['$event'])
  // onbeforeunload(event: any): void {

  //   // Do something
  //   if(event){
  //     console.log("Window when click")
  //     localStorage.clear()
  //   }
  // }


  ngOnInit(): void {

    // window.localStorage.setItem("loggedIn", "true");

    // window.addEventListener('storage', (event) => {
    //   if (event.storageArea != localStorage) return;
    //   if (event.key === 'loggedIn') {
    //     // Do something with event.newValue
    //   }
    //  });
}
}
