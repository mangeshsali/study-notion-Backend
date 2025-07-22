export const HandleServerError = (res: any, error: any) => {
  return res.status(500).json({
    message: "Internal Server Error",
    error: error instanceof Error ? error.message : "Unknown error",
  });
};
