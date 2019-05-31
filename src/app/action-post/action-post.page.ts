import { Component, OnInit, Input} from '@angular/core';
import { PostService } from '../services/post.service';
import { AlertsModule } from '../alerts/alerts.module';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-action-post',
  templateUrl: './action-post.page.html',
  styleUrls: ['./action-post.page.scss'],
})
export class ActionPostPage implements OnInit {

  @Input() data:any;

  post: any = {};

  constructor(
    private postService: PostService,
    public alertsModule: AlertsModule,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {

    if ( this.data != '') {
      this.post = this.data;
    }

  }

  save() {

      if ( this.data == '') {

        this.postService.addPost( this.post )
        .subscribe( item => {
          this.alertsModule.confirmationAlert('', 'Post creado correctamente', '');
          this.modalCtrl.dismiss();
        }, err => {
          this.alertsModule.confirmationAlert('Error', 'Ocurrio un error , intente mas tarde', '');
        });

      } else {

        this.postService.editPost( this.data )
        .subscribe( item => {
          this.alertsModule.confirmationAlert('', 'Post editado correctamente', '');
          this.modalCtrl.dismiss();
        }, err => {
          this.alertsModule.confirmationAlert('Error', 'Ocurrio un error , intente mas tarde', '');
        });

      }

  }

}
