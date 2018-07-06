import { AbstractControl } from "@angular/forms";

export function ValidateUrl(control: AbstractControl) {
	if (!control.value.startsWith("https://www.youtube.com")) {
		return { validUrl: true };
	}
	return null;
}

export function ValidateYear(control: AbstractControl) {
	if (
		!parseInt(control.value) ||
		new Date().getFullYear() < parseInt(control.value) ||
		parseInt(control.value) < 0
	) {
		return { validYear: true };
	}

	return null;
}

export function ValidatePair(control: AbstractControl) {
	if (
		!parseInt(control.value) ||
		100 < parseInt(control.value) ||
		parseInt(control.value) < 0
	) {
		return { validPair: true };
	}

	return null;
}

export function ValidateOrgtypes(control: AbstractControl) {
	if (!control.value || control.value == 0) {
		return { validOrgTypes: true };
	}

	return null;
}
