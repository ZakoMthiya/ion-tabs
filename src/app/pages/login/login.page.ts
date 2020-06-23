import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import { error } from '@angular/compiler/src/util';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    username: '',
    password: ''
  };

  constructor(private router: Router,
    private auth: AuthService,
    private storageService: StorageService,
    private toastService: ToastService) { }

  ngOnInit() {
  }

  loginAction() {
    
    if(this.validateInputs()) {
      let a = this.auth.login(this.postData);
      
      a.subscribe(res => {
        
        if(res.userData) {
          this.storageService.store(AuthConstants.AUTH, res.userData);
          this.router.navigate(['/home/feed']);
        }
        else {
          this.toastService.presentToast('Incorrect details');
          
        }
      },
      (error: any) => {
        this.toastService.presentToast("Network unavailable");
      })
    }
    else {
      this.toastService.presentToast('Please give correct information');
      
    }
  }

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();

    return(this.postData.username && this.postData.password && username.length > 0 && password.length > 0);
  }
}
