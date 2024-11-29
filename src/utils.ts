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
