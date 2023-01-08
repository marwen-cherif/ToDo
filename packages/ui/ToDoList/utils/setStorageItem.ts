export const setStorageItem = <T = Record<string, any>>({
  key,
  value,
}: {
  key: string;
  value: T;
}): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
