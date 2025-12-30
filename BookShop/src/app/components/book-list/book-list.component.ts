import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  books$!: Observable<Book[]>;

  constructor(private bookService: BookService) {
    this.refresh();
  }

  refresh() {
    this.books$ = this.bookService.getAll();
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Supprimer ce livre ?')) return;
    this.bookService.delete(id).subscribe({
      next: () => this.refresh(),
      error: (err) => alert('Erreur lors de la suppression')
    });
  }
}
