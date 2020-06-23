import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {

  @Input('User') User : any;

  feedData: any;
  postData = {
    user_id: '',
    token: '',
    feed_id: ''
  }

  constructor(private feedService: FeedService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.feedService.feedData$.subscribe(res => {
      this.feedData = res;
    })
  }

  feedDeleteAction(feedId: any, feedIndex: number) {
    this.postData.feed_id = feedId;
    this.postData.user_id = this.User.user_id;
    this.postData.token = this.User.token;
    this.alertService.presentAlertConfirm('Delete Feed', "This will permanently delete this feed")
      .then(res => {
        if(res.role === 'okay') {
          this.deleteFeed(feedIndex);
        }
      })
  }

  deleteFeed(feedIndex: number) {
    this.feedService.feedDelete(this.postData).subscribe(res => {
      if(res.success) {
        this.feedService.deleteFeedData(feedIndex);        
      }
    })
  }
}
