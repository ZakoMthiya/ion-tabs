import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  feedData$ = new BehaviorSubject<any>([]);
  constructor(private http: HttpService) { }

  feedData(postData: any) : Observable<any> {
    return this.http.post('feed', postData);
  }

  changeFeedData(data: any) {
    this.feedData$.next(data);
  }

  feedDelete(postData: any) : Observable<any> {
    return this.http.post('feedDelete', postData);
  }

  getCurrentFeedData() {
    return this.feedData$.getValue();
  }

  deleteFeedData(feedIndex: number) {
    let data = [];
    let currentFeedData = this.getCurrentFeedData();

    currentFeedData.splice(feedIndex, 1);
      let newFeedData = data.concat(currentFeedData);
      this.changeFeedData(newFeedData);
  }

  feedUpdate(postData: any) : Observable<any> {
    return this.http.post('feedUpdate', postData);
  }

  updateFeedData(newFeedData: any) {

    let data = [];
    let currentFeedData = this.getCurrentFeedData();

    data.push(newFeedData);

    let newUpdatedFeed = data.concat(currentFeedData);
    this.changeFeedData(newUpdatedFeed);
    
  }
}
