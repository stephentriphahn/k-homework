/**
 * Write a function mergeStrings(a, b) that takes strings, a and b, of varying lengths and merges them into a single string, 
 * appending any remaining characters to the end and returns it. For example you have two strings abc and stuvwx. Alternating 
 * between the two you should return asbtcuvwx.
 */

export function interleave<T>(a: Array<T>, b: Array<T>): Array<T> {
  if(a.length === 0) return b
  if(b.length === 0) return a
  return [a[0], b[0]].concat(interleave(a.slice(1), b.slice(1)))
}

export function mergeStrings(a: string, b: string): string {
  const merged = interleave(a.split(''), b.split(''))
  return merged.join('')
}
