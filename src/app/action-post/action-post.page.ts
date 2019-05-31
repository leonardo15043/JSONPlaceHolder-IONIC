import { Component, OnInit, Input} from '@angular/core';
@Component({
  selector: 'app-action-post',
  templateUrl: './action-post.page.html',
  styleUrls: ['./action-post.page.scss'],
})
export class ActionPostPage implements OnInit {

  @Input() data:any;

  constructor() { 

  }

  ngOnInit() {
  }

  save(){
    
  }

}
