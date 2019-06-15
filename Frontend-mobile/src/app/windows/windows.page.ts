import { Component, OnInit } from '@angular/core';
import { WindowsService } from './windows.service';
import { Window } from './window.model';
import io from 'socket.io-client';


@Component({
  selector: 'app-windows',
  templateUrl: './windows.page.html',
  styleUrls: ['./windows.page.scss'],
})
export class WindowsPage implements OnInit {

  windowsList: Window[];
  socket;


  constructor(private windowsService: WindowsService) { }

  ngOnInit() {
    this.socket = io('http://192.168.2.98:8081');
    this.socket.on('windows', (data) => {
      this.windowsList = data;
    });
  }


  refresh() {
    this.windowsService.getWindowsList().subscribe((data: Window[]) => {
      this.windowsList = data;
      console.log(data);
    });
  }

}
