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

  // por medio de un decorador capturamos los datos que le mandamos al modal
  @Input() data:any;

  post: any = {};

  constructor(
    private postService: PostService,
    public alertsModule: AlertsModule,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {

    // validamos si estamos creando o editando registros para que me cargue automaticamente los datos en el formulario
    if ( this.data != '') {
      this.post = this.data;
    }

  }

  save() {

    //  validamos si estamos editando o creando

      if ( this.data == '') {
        // le pasamos al metodo addPost del servicio postService los parametros del post para que los agregue al JSON
        this.postService.addPost( this.post )
        .subscribe( item => {
          this.alertsModule.confirmationAlert('', 'Post creado correctamente', '');
          // cerramos el modal
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
