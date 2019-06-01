import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private urldb = environment.url_api;
  posts: string;
  comments: string;

  constructor(
    private http: Http
  ) { }

  getAll() {
    this.posts = `${ this.urldb }/posts`;
    return this.http.get( this.posts )
    .pipe(
      map(res => {
          return res.json();
      })
    );
  }

  addPost( data ) {
    this.posts = `${ this.urldb }/posts`;

    const body: any = {
      'title' : data.title,
      'description' : data.description
    };

    return this.http.post( this.posts , body )
    .pipe(
      map(res => {
          return res.json();
      })
    );
  }

  editPost( data ) {
    this.posts = `${ this.urldb }/posts/${ data.id }`;

    const body: any = {
      'title' : data.title,
      'description' : data.description
    };

    return this.http.put( this.posts , body )
    .pipe(
      map(res => {
          return res.json();
      })
    );
  }

  deletePost( id ) {
    this.posts = `${ this.urldb }/posts/${ id }`;
    return this.http.delete( this.posts )
    .pipe(
      map(res => {
          return res.json();
      })
    );
  }

  getComment( id_post ) {
    this.comments = `${ this.urldb }/posts/${ id_post }/comments`;
    return this.http.get( this.comments )
    .pipe(
      map(res => {
          return res.json();
      })
    );
  }

}
