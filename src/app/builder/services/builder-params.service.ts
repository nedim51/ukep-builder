import { Injectable } from "@angular/core";
import { FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { Observable, map, of, switchMap } from "rxjs";
import { ClassDataService } from "../../grid/services/grid-class.service";
import { IBuilderParamsForm } from "../interfaces/builder-params-form.interface";
import { ColumnSizeType, ColumnSizeOffsetType } from "../../grid/interfaces/grid-column.type";

@Injectable()
export class BuilderParamsService {

  formChanges$: Observable<IBuilderParamsForm> | undefined;
  sizesChanges$: Observable<IBuilderParamsForm['sizes']> | undefined;
  offsetsChanges$: Observable<IBuilderParamsForm['offsets']> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private classData: ClassDataService) {
  }

  /**
   * Создать форму с параметрами активного элемент
   */
  createForm(source: string[], params: { size: ColumnSizeType, offset: ColumnSizeOffsetType}): Observable<FormGroup> {
    return of(new FormGroup({})).pipe(
      switchMap((group) => this.createSizeForm(source, params.size).pipe(
        map(array => {
          group.addControl('sizes', array);
          return group;
        })
      )),

      switchMap((group) => this.createOffsetForm(source, params.offset).pipe(
        map(array => {
          group.addControl('offsets', array)
          return group;
        })
      ))
    )
  }

  /**
   * Создать FormArray для списка классов с размерами колонок
   */
  createSizeForm(source: string[], size: ColumnSizeType): Observable<FormArray> {
    return this.classData.selectCodesBySize(size).pipe(
      map(sizes => this.formBuilder.array(sizes.map(code => source.includes(code))))
    )
  }

  /**
   * Создать FormArray для списка классов с отступами
   */
  createOffsetForm(source: string[], offset: ColumnSizeOffsetType): Observable<FormArray> {
    return this.classData.selectCodesByOffset(offset).pipe(
      map(offsets => this.formBuilder.array(offsets.map(code => source.includes(code))))
    )
  }
}