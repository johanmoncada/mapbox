import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function decimalValidator(maxDecimals: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const decimalRegex = new RegExp(`^\\d+(\\.\\d{1,${maxDecimals}})?$`);
        if (value && !decimalRegex.test(value)) {
            return { invalidDecimal: true};
        }
        return null;
    }
}