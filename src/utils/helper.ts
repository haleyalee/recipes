const getPathFromName = (recipeName: string) => {
  return recipeName.toLowerCase().replace(/\s/g, "-");
};

export { getPathFromName };