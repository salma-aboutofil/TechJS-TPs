import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {
  form!: FormGroup;

  id?: number;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize the form after FormBuilder is available
    this.form = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: [null]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit = true;
      this.bookService.getById(this.id).subscribe({
        next: (b) => this.form.patchValue({ title: b.title, author: b.author, year: b.year ?? null }),
        error: () => alert('Impossible de charger le livre')
      });
    }
  }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.value as Book;

    // Get raw year value and normalize it to a number if provided
    const rawYear = this.form.get('year')?.value;
    if (rawYear !== undefined && rawYear !== null && rawYear !== '') {
      value.year = Number(rawYear);
    } else {
      delete value.year;
    }

    if (this.isEdit && this.id) {
      this.bookService.update(this.id, value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Erreur lors de la mise à jour')
      });
    } else {
      this.bookService.create(value).subscribe({
        next: () => this.router.navigate(['/books']),
        error: () => alert('Erreur lors de la création')
      });
    }
  }

  cancel() {
    this.router.navigate(['/books']);
  }
}
