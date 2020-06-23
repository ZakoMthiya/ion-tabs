import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed-update',
  templateUrl: './feed-update.component.html',
  styleUrls: ['./feed-update.component.scss'],
})
export class FeedUpdateComponent implements OnInit {
  @Input('User') User : any;

  postData = {
    user_id: '',
    token: '',
    feed: ''
  }
  constructor(private feedService: FeedService) { }

  ngOnInit() {}

  feedUpdateAction() {
    this.postData.user_id = this.User.user_id;
    this.postData.token = this.User.token;
    
    this.feedService.feedUpdate(this.postData).subscribe(res => {
      this.postData.feed = '';      
      this.feedService.updateFeedData(res.feedData);
    })
  }
}
