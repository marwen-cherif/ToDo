export const getStorageItem = async <T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue: T;
}): Promise<T> => {
  const value = localStorage.getItem(key);

  if (!value) {
    return defaultValue;
  }

  return JSON.parse(value);
};
