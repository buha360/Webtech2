import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
   selector: 'app-food',
   standalone: true,
   imports: [FormsModule, NgFor, CommonModule],
   templateUrl: './food.component.html',
   styleUrl: './food.component.css',
})
export class FoodComponent implements OnInit {
   food = {
      name: '',
      uploader: '',
      description: '',
   };

   selectedFile: File | null = null;

   handleFileInput(event: Event): void {
      const element = event.target as HTMLInputElement;
      const files = element.files;

      if (files && files.length > 0) {
         this.selectedFile = files[0];
      } else {
         this.selectedFile = null;
      }
   }

   submitFood() {
      const formData: FormData = new FormData();
      formData.append('name', this.food.name);
      formData.append('uploader', this.food.uploader);
      formData.append('description', this.food.description);
      if (this.selectedFile) {
         formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.http.post('http://localhost:3000/foods', formData).subscribe({
         next: (response) => {
            console.log('Étel sikeresen hozzáadva:', response);
            this.loadFoods(); // Újra lekérdezi az ételek listáját
         },
         error: (error) => {
            console.error('Hiba történt az étel hozzáadásakor:', error);
         },
      });
   }

   constructor(private http: HttpClient) {}

   ngOnInit(): void {
      this.loadFoods();
   }

   foods: any[] = []; // Hozzáadva az ételek tárolásához

   loadFoods(): void {
      this.http.get<any>('http://localhost:3000/foods').subscribe({
         next: (data) => {
            console.log(data);
            this.foods = data; // Tárolja az ételek listáját
         },
         error: (error) => {
            console.error('There was an error!', error);
         },
      });
   }

   deleteFood(foodId: string, uploaderName: string): void {
      this.http
         .delete(`http://localhost:3000/${foodId}?uploader=${uploaderName}`)
         .subscribe({
            next: () => {
               console.log('Étel sikeresen törölve');
               this.loadFoods(); // Frissíti az ételek listáját a törlés után
            },
            error: (error) => {
               console.error('Hiba történt az étel törlésekor:', error);
            },
         });
   }
}
