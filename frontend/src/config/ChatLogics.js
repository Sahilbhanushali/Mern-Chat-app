export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) {
    return "Unknown";
  }

  const otherUser = users.find((user) => user._id !== loggedUser._id);

  return otherUser ? otherUser.name : "Unknown";
};
