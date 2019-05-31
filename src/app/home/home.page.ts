import { Component, ViewChild } from '@angular/core';
import { ModalController, IonList } from '@ionic/angular';
import { ActionPostPage } from '../action-post/action-post.page';
import { PostService } from '../services/post.service';
import { AlertsModule } from '../alerts/alerts.module';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('list') list: IonList;

  posts: any = [];

  constructor(
    public modalController: ModalController,
    private postService: PostService,
    public alertsModule: AlertsModule,
  ) {
    this.getAll();
  }

  getAll() {

    this.postService.getAll()
        .subscribe( data => {
          this.posts = data;
        });

  }

  delete( id_post ) {

    this.postService.deletePost( id_post )
    .subscribe( item => {
      this.getAll();
    }, err => {
      this.alertsModule.confirmationAlert('Error', 'Ocurrio un error , intente mas tarde', '');
    });

  }

  async actionPost( data ) {

    const modal = await this.modalController.create({
      component: ActionPostPage,
      id: 'modal_post',
      componentProps: {
        'data': data
      }
    });

    this.list.closeSlidingItems();

    modal.onDidDismiss()  .then(( res ) => {
      this.getAll();
    });

    return await modal.present();

  }

}
