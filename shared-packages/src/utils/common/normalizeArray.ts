type TObjectId = string | number;

interface INormalizeArrayParams<TArrayObject extends object> {
    array: TArrayObject[];
    idLookup?: keyof TArrayObject;
}

interface INormalizeArrayReturn<TArrayObject extends object, TObjId extends TObjectId> {
    ids: TObjId[];
    entities: Record<TObjId, TArrayObject>;
}

export function normalizeArray<TArrayObject extends object, TObjectId extends string | number>({array, idLookup = 'id' as keyof TArrayObject}: INormalizeArrayParams<TArrayObject>): INormalizeArrayReturn<TArrayObject, TObjectId> {
    const uniqueIds = new Set<TObjectId>();
    const initial: INormalizeArrayReturn<TArrayObject, TObjectId> = {
        ids: [],
        entities: {} as Record<TObjectId, TArrayObject>,
    };

    return array.reduce((acc, value) => {
        const id = value[idLookup] as TObjectId;

        if (uniqueIds.has(id)) return acc;
        uniqueIds.add(id);

        acc.ids.push(id);
        acc.entities[id] = value;

        return acc;
    }, initial);
}