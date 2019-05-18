import { Component, OnInit } from '@angular/core';
import { WindowsService } from './windows.service';
import { Window } from './window.model';


@Component({
  selector: 'app-windows',
  templateUrl: './windows.page.html',
  styleUrls: ['./windows.page.scss'],
})
export class WindowsPage implements OnInit {

  windowsList: Window[];

  constructor(private windowsService: WindowsService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.windowsService.getWindowsList().subscribe((data: Window[]) => {
      this.windowsList = data;
      console.log(data);
    });
  }

}
