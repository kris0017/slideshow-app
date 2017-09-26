/**
 * returns random hex color
 * @return {[String]} the hex color
 */
export function randomHexColor() {
  return "#" + Math.random().toString(16).slice(2, 8);
}