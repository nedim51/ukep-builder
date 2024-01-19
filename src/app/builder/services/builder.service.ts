import { Injectable } from "@angular/core";
import { FormGroup, FormArray } from "@angular/forms";
import { Observable } from "rxjs";
import { ClassDataService } from "../../grid/services/grid-class.service";

@Injectable({
    providedIn: 'root'
})
export class BuilderService {

    sizeCodeList$: Observable<string[]>;
    offsetCodeList$: Observable<string[]>;
    createForm$: Observable<FormGroup>;
    formArraySizes$: Observable<FormArray>;
    formArrayOffsets$: Observable<FormArray>;
    formChanges$: Observable<{ sizes: string[], offsets: string[] }> | undefined;
    sizesChanges$: Observable<string[]> | undefined;
    offsetsChanges$: Observable<string[]> | undefined;

    constructor(private classData: ClassDataService) {
        this.sizeCodeList$ = this.classData.selectSizesCodes();
        this.offsetCodeList$ = this.classData.selectOffsetsCodes();
    }

    createForm(): Observable<FormGroup> {
        
    }


    this.formArraySizes$ = this.sizeCodeList$.pipe(
      map(sizeList => this.fb.array(sizeList.map(code => false)))
    )

    this.formArrayOffsets$ = this.offsetCodeList$.pipe(
      map(offsetList => this.fb.array(offsetList.map(code => false)))
    )

    this.createForm$ = of(new FormGroup({})).pipe(
      switchMap((group) => this.formArraySizes$.pipe(
        map(array => { 
          group.addControl('sizes', array);
          return group;
        })
      )),
      
      switchMap((group) => this.formArrayOffsets$.pipe(
        map(array => {
          group.addControl('offsets', array)
          return group;
        })
      ))
    )
}