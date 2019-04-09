import { Component, Input } from '@angular/core';
import { CategoryInterface } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent {

  @Input()
  public category: CategoryInterface = {
    name: '',
    active : true
  };
}
