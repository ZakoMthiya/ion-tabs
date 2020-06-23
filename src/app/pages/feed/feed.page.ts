import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedService } from 'src/app/services/feed.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  displayUserData: any;
  postData = {
    user_id: '',
    token: ''
  };

  constructor(private auth: AuthService, 
    private feedService: FeedService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.auth.userData$.subscribe(res => {
      this.displayUserData = res;
    this.getFeedData();
    });
  }

  getFeedData() {
    this.postData.user_id = this.displayUserData.user_id;
    this.postData.token = this.displayUserData.token;

    if(this.postData.user_id && this.postData.token) {
      this.feedService.feedData(this.postData)
        .subscribe(res => {
          this.feedService.changeFeedData(res.feedData);
        },
        error => {
          this.toastService.presentToast("Network unavailable");
        })
    }
    else {
      this.toastService.presentToast("Loading...");
      
    }
  }

}
