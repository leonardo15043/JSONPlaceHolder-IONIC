import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionPostPage } from '../action-post/action-post.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public modalController: ModalController
  ) {}

  delete( post ) {
    console.log(post);
  }

  async actionPost( data ) {

    const modal = await this.modalController.create({
      component: ActionPostPage,
      id: 'modal_post',
      componentProps: {
        'data': data
      }
    });

    modal.onDidDismiss()  .then(( res ) => {
      
    });

    return await modal.present();

  }

}
