export const mapValues = <K extends keyof any, V, T>(
    obj: Record<K, V>,
    transform: (val: V) => T
): Record<K, T> =>
    Object.fromEntries(
        Object.entries<V>(obj)
            .map(([key, value]) => [key, transform(value)])
    ) as any