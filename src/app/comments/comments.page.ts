import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { AlertsModule } from '../alerts/alerts.module';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comments: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    public alertsModule: AlertsModule
  ) {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      if ( this.id != 'new') {
        this.getComment( this.id );
      }
    });
  }

  ngOnInit() {
  }

  getComment( id_post ) {

    this.postService.getComment( id_post )
    .subscribe( item => {
      this.comments = item;
    }, err => {
      this.alertsModule.confirmationAlert('Error', 'Ocurrio un error , intente mas tarde', '');
    });

  }

}
