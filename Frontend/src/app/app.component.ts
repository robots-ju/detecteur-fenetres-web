import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova' || 'capacitor')) {
        this.setup();
      }
    });
  }

  setup() {
    this.oneSignal.startInit('55a5ef9d-30fa-4f8d-b7f1-667e715eb9fb', '359022967458');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(data => {
// tslint:disable-next-line: prefer-const
      let msg = data.payload.body;
// tslint:disable-next-line: prefer-const
      let title = data.payload.title;
// tslint:disable-next-line: prefer-const
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);

    });

    this.oneSignal.handleNotificationOpened().subscribe(data => {
// tslint:disable-next-line: prefer-const
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'Your are already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    alert.present();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
