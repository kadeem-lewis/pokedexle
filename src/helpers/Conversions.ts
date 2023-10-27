import { decimeterConversion, hectogramConversion } from "@/constants";

export function decimeterToImperial(height: number) {
  const totalInches = Math.round(height * decimeterConversion);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches.toString().padStart(2, "0")}"`;
}

export function hectogramToImperial(weight: number) {
  const pounds = weight * hectogramConversion;
  return `${pounds.toFixed(1)} lbs`;
}
