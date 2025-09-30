export const sendSuccess = (res: any, data: any, message = 'Success', status = 200) => {
  res.status(status).json({ message, ...data });
};