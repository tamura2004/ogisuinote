type Form<T> = { [K in keyof T]: T[K] | null};
