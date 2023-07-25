type Primitives = string | number | undefined | null;
type ObjType = Record<string, Primitives | { [key: string]: ObjType } | ObjType[]> | Primitives | Primitives[]

interface Obj {
  [key: string]: ObjType
}

export default function deepCopy<T extends Obj>(elementToClone: T[]): T[] {
    return JSON.parse(JSON.stringify(elementToClone));
}
