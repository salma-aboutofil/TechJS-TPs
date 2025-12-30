import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private api = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.api);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.api}/${id}`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.api, book);
  }

  update(id: number, book: Book): Observable<Book> {
    const payload = { ...book, id };
    return this.http.put<Book>(`${this.api}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
