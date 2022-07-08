const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  const hour = String(date.getUTCHours()).padStart(2, '0');
  const minute = String(date.getUTCMinutes()).padStart(2, '0');

  const strDate = `${day}.${month} ${hour}:${minute}`;
  return strDate;
};

export default formatDateTime;
