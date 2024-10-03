export default function combineClassNames(classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
