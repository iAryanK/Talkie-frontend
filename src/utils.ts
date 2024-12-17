import { MessageType } from "./pages/home";

export const formattedTime = (date: Date) => {
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return time;
};

export const formattedName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export function addMessageToLocalStorage(key: string, newElement: MessageType) {
  const storedValue = localStorage.getItem(key);
  const currentArray = storedValue ? JSON.parse(storedValue) : [];

  currentArray.push(newElement);

  localStorage.setItem(key, JSON.stringify(currentArray));
}

export function getMessageFromLocalStorage(key: string) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : [];
}
